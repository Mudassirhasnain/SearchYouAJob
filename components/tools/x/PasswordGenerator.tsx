"use client";
import { useState } from "react";
import { btn, btnGhost, field } from "../ui";
import { WORDS } from "./wordlist";

function randInt(max: number) {
  const lim = Math.floor(4294967296 / max) * max;
  const a = new Uint32Array(1);
  do { crypto.getRandomValues(a); } while (a[0] >= lim);
  return a[0] % max;
}
const pick = <T,>(arr: readonly T[]) => arr[randInt(arr.length)];

const SETS = { lower: "abcdefghijkmnopqrstuvwxyz", upper: "ABCDEFGHJKLMNPQRSTUVWXYZ", digits: "23456789", symbols: "!@#$%^&*()-_=+[]{};:,.?" };
const FULL = { lower: "abcdefghijklmnopqrstuvwxyz", upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", digits: "0123456789", symbols: SETS.symbols };

type Mode = "password" | "passphrase" | "pin";

function strength(bits: number) {
  if (bits < 40) return ["Weak", "#dc2626"] as const;
  if (bits < 60) return ["Fair", "#ea580c"] as const;
  if (bits < 80) return ["Good", "#ca8a04"] as const;
  if (bits < 110) return ["Strong", "#16a34a"] as const;
  return ["Very strong", "#15803d"] as const;
}

export default function PasswordGenerator() {
  const [mode, setMode] = useState<Mode>("password");
  const [len, setLen] = useState(16);
  const [opt, setOpt] = useState({ lower: true, upper: true, digits: true, symbols: true });
  const [ambig, setAmbig] = useState(true);
  const [words, setWords] = useState(4);
  const [sep, setSep] = useState("-");
  const [capital, setCapital] = useState(true);
  const [pinLen, setPinLen] = useState(6);
  const [count, setCount] = useState(1);
  const [out, setOut] = useState<string[]>([]);
  const [copied, setCopied] = useState(-1);

  const sets = (Object.keys(opt) as (keyof typeof opt)[]).filter((k) => opt[k]).map((k) => (ambig ? SETS[k] : FULL[k]));
  const pool = sets.join("");
  const bits = mode === "password" ? (pool ? Math.log2(pool.length) * len : 0) : mode === "passphrase" ? Math.log2(WORDS.length) * words : Math.log2(10) * pinLen;
  const [label, color] = strength(bits);

  function one() {
    if (mode === "pin") return Array.from({ length: pinLen }, () => randInt(10)).join("");
    if (mode === "passphrase") return Array.from({ length: words }, () => { const w = pick(WORDS); return capital ? w[0].toUpperCase() + w.slice(1) : w; }).join(sep);
    const chars = sets.map((s) => pick([...s]));
    while (chars.length < len) chars.push(pick([...pool]));
    for (let i = chars.length - 1; i > 0; i--) { const j = randInt(i + 1); [chars[i], chars[j]] = [chars[j], chars[i]]; }
    return chars.slice(0, len).join("");
  }
  function generate() { if (mode === "password" && !pool) return; setOut(Array.from({ length: count }, one)); setCopied(-1); }
  async function copy(i: number) { try { await navigator.clipboard.writeText(out[i]); setCopied(i); setTimeout(() => setCopied(-1), 1200); } catch { /* blocked */ } }
  const tog = (k: keyof typeof opt) => <label key={k} className="flex items-center gap-2"><input type="checkbox" checked={opt[k]} onChange={(e) => setOpt({ ...opt, [k]: e.target.checked })} /> {k === "digits" ? "Numbers" : k === "symbols" ? "Symbols" : k === "upper" ? "Uppercase" : "Lowercase"}</label>;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">{(["password", "passphrase", "pin"] as Mode[]).map((m) => <button key={m} className={mode === m ? btn : btnGhost} onClick={() => { setMode(m); setOut([]); }}>{m === "pin" ? "PIN" : m[0].toUpperCase() + m.slice(1)}</button>)}</div>
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3 text-sm text-zinc-700">
        {mode === "password" && (<>
          <label className="flex flex-col gap-1">Length {len}<input type="range" min={8} max={128} value={len} onChange={(e) => setLen(+e.target.value)} className="w-48" /></label>
          {(["lower", "upper", "digits", "symbols"] as const).map(tog)}
          <label className="flex items-center gap-2"><input type="checkbox" checked={ambig} onChange={(e) => setAmbig(e.target.checked)} /> Avoid look-alike characters (1, l, 0, O)</label>
        </>)}
        {mode === "passphrase" && (<>
          <label className="flex flex-col gap-1">Words {words}<input type="range" min={3} max={10} value={words} onChange={(e) => setWords(+e.target.value)} className="w-40" /></label>
          <label className="flex flex-col gap-1">Separator<input className={field + " w-20"} maxLength={3} value={sep} onChange={(e) => setSep(e.target.value)} /></label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={capital} onChange={(e) => setCapital(e.target.checked)} /> Capitalise words</label>
        </>)}
        {mode === "pin" && <label className="flex flex-col gap-1">Digits {pinLen}<input type="range" min={4} max={12} value={pinLen} onChange={(e) => setPinLen(+e.target.value)} className="w-40" /></label>}
        <label className="flex flex-col gap-1">How many<select className={field + " w-auto"} value={count} onChange={(e) => setCount(+e.target.value)}>{[1, 3, 5, 10].map((n) => <option key={n}>{n}</option>)}</select></label>
      </div>
      <div className="flex items-center gap-3">
        <button className={btn} disabled={mode === "password" && !pool} onClick={generate}>Generate</button>
        <span className="text-sm" style={{ color }}>{label}, about {Math.round(bits)} bits of entropy</span>
      </div>
      <ul className="space-y-2">
        {out.map((p, i) => (
          <li key={i} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2">
            <span className="min-w-0 break-all font-mono text-sm">{p}</span>
            <button className={btnGhost + " shrink-0 !px-3 !py-1"} onClick={() => copy(i)}>{copied === i ? "Copied" : "Copy"}</button>
          </li>
        ))}
      </ul>
      {mode === "password" && !pool && <p className="text-sm text-red-600">Choose at least one character type.</p>}
    </div>
  );
}
