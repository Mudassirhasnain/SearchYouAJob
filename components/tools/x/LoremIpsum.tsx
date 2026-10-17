"use client";
import { useMemo, useState } from "react";
import { btn, field } from "../ui";

const W = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");
const START = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

function rng(seed: number) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

function sentence(r: () => number, first: boolean) {
  const n = 8 + Math.floor(r() * 10);
  const ws: string[] = [];
  for (let i = 0; i < n; i++) ws.push(W[Math.floor(r() * W.length)]);
  let t = ws.join(" ");
  if (first) t = START.toLowerCase() + " " + ws.slice(0, 3).join(" ");
  if (n > 12 && !first) { const k = Math.floor(n / 2); t = ws.slice(0, k).join(" ") + ", " + ws.slice(k).join(" "); }
  return t[0].toUpperCase() + t.slice(1) + ".";
}

export default function LoremIpsum() {
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [classic, setClassic] = useState(true);
  const [html, setHtml] = useState(false);
  const [seed, setSeed] = useState(7);
  const [copied, setCopied] = useState(false);

  const out = useMemo(() => {
    const n = Math.min(Math.max(count || 1, 1), unit === "words" ? 2000 : 200);
    const r = rng(seed);
    if (unit === "words") {
      const ws: string[] = [];
      if (classic) ws.push(...START.toLowerCase().replace(",", "").split(" "));
      while (ws.length < n) ws.push(W[Math.floor(r() * W.length)]);
      const t = ws.slice(0, n).join(" ");
      return t[0].toUpperCase() + t.slice(1) + ".";
    }
    if (unit === "sentences") {
      const s: string[] = [];
      for (let i = 0; i < n; i++) s.push(sentence(r, classic && i === 0));
      return s.join(" ");
    }
    const ps: string[] = [];
    for (let p = 0; p < n; p++) {
      const k = 4 + Math.floor(r() * 4);
      const s: string[] = [];
      for (let i = 0; i < k; i++) s.push(sentence(r, classic && p === 0 && i === 0));
      ps.push(s.join(" "));
    }
    return html ? ps.map((p) => `<p>${p}</p>`).join("\n") : ps.join("\n\n");
  }, [unit, count, classic, html, seed]);

  async function copy() {
    try { await navigator.clipboard.writeText(out); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* blocked */ }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4 text-sm text-zinc-700">
        <label className="flex flex-col gap-1">Amount
          <input type="number" min={1} className={field + " w-28"} value={count} onChange={(e) => setCount(+e.target.value)} />
        </label>
        <label className="flex flex-col gap-1">Unit
          <select className={field + " w-auto"} value={unit} onChange={(e) => setUnit(e.target.value as typeof unit)}>
            <option value="paragraphs">Paragraphs</option><option value="sentences">Sentences</option><option value="words">Words</option>
          </select>
        </label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={classic} onChange={(e) => setClassic(e.target.checked)} /> Start with &quot;Lorem ipsum dolor sit amet&quot;</label>
        {unit === "paragraphs" && <label className="flex items-center gap-2"><input type="checkbox" checked={html} onChange={(e) => setHtml(e.target.checked)} /> Wrap in &lt;p&gt; tags</label>}
      </div>
      <textarea readOnly aria-label="Generated text" className={field + " h-64"} value={out} />
      <div className="flex gap-2">
        <button className={btn} onClick={copy}>{copied ? "Copied" : "Copy text"}</button>
        <button className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50" onClick={() => setSeed((s) => s + 1)}>Generate new text</button>
      </div>
    </div>
  );
}
