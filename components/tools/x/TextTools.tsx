"use client";
import { useMemo, useState } from "react";
import { btn, btnGhost, field } from "../ui";

const words = (s: string) => s.match(/[A-Za-z0-9À-ɏ']+/g) ?? [];
const cap = (w: string) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w);

const CASES: { id: string; label: string; fn: (s: string) => string }[] = [
  { id: "upper", label: "UPPERCASE", fn: (s) => s.toUpperCase() },
  { id: "lower", label: "lowercase", fn: (s) => s.toLowerCase() },
  { id: "title", label: "Title Case", fn: (s) => s.toLowerCase().replace(/(^|[\s\-(["'])([a-zà-ÿ])/g, (_, a: string, b: string) => a + b.toUpperCase()) },
  { id: "sentence", label: "Sentence case", fn: (s) => s.toLowerCase().replace(/(^\s*|[.!?]\s+|\n\s*)([a-zà-ÿ])/g, (_, a: string, b: string) => a + b.toUpperCase()) },
  { id: "camel", label: "camelCase", fn: (s) => words(s).map((w, i) => (i ? cap(w) : w.toLowerCase())).join("") },
  { id: "pascal", label: "PascalCase", fn: (s) => words(s).map(cap).join("") },
  { id: "snake", label: "snake_case", fn: (s) => words(s).map((w) => w.toLowerCase()).join("_") },
  { id: "kebab", label: "kebab-case", fn: (s) => words(s).map((w) => w.toLowerCase()).join("-") },
  { id: "constant", label: "CONSTANT_CASE", fn: (s) => words(s).map((w) => w.toUpperCase()).join("_") },
  { id: "alt", label: "aLtErNaTiNg", fn: (s) => [...s].map((c, i) => (i % 2 ? c.toUpperCase() : c.toLowerCase())).join("") },
];

const LINES: { id: string; label: string; fn: (s: string) => string }[] = [
  { id: "az", label: "Sort A to Z", fn: (s) => s.split("\n").sort((a, b) => a.localeCompare(b)).join("\n") },
  { id: "za", label: "Sort Z to A", fn: (s) => s.split("\n").sort((a, b) => b.localeCompare(a)).join("\n") },
  { id: "dedupe", label: "Remove duplicate lines", fn: (s) => [...new Set(s.split("\n"))].join("\n") },
  { id: "empty", label: "Remove empty lines", fn: (s) => s.split("\n").filter((l) => l.trim()).join("\n") },
  { id: "trim", label: "Trim each line", fn: (s) => s.split("\n").map((l) => l.trim()).join("\n") },
  { id: "spaces", label: "Collapse extra spaces", fn: (s) => s.replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").trim() },
  { id: "reverse", label: "Reverse line order", fn: (s) => s.split("\n").reverse().join("\n") },
  { id: "number", label: "Number lines", fn: (s) => s.split("\n").map((l, i) => `${i + 1}. ${l}`).join("\n") },
];

export default function TextTools() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.\nthe quick brown fox jumps over the lazy dog.\nBanana\napple\nCherry");
  const [copied, setCopied] = useState(false);
  const stats = useMemo(() => ({ chars: text.length, words: (text.match(/\S+/g) ?? []).length, lines: text ? text.split("\n").length : 0 }), [text]);

  async function copy() {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard blocked */ }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-zinc-700" htmlFor="tt-text">Your text</label>
      <textarea id="tt-text" className={field + " h-56 font-mono"} value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste text here" />
      <p className="text-sm text-zinc-600">{stats.chars} characters, {stats.words} words, {stats.lines} lines</p>
      <div>
        <p className="mb-2 text-sm font-medium text-zinc-700">Change case</p>
        <div className="flex flex-wrap gap-2">
          {CASES.map((c) => <button key={c.id} className={btnGhost} onClick={() => setText(c.fn(text))}>{c.label}</button>)}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-zinc-700">Clean up lines</p>
        <div className="flex flex-wrap gap-2">
          {LINES.map((c) => <button key={c.id} className={btnGhost} onClick={() => setText(c.fn(text))}>{c.label}</button>)}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className={btn} onClick={copy} disabled={!text}>{copied ? "Copied" : "Copy text"}</button>
        <button className={btnGhost} onClick={() => setText("")} disabled={!text}>Clear</button>
      </div>
    </div>
  );
}
