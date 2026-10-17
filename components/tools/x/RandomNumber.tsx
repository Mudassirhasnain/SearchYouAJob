"use client";
import { useState } from "react";
import { btn, btnGhost, field } from "../ui";

function u32() { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0]; }
function randInt(min: number, max: number) {
  const range = max - min + 1;
  const lim = Math.floor(4294967296 / range) * range;
  let x: number;
  do { x = u32(); } while (x >= lim);
  return min + (x % range);
}
function randFloat() { return ((u32() >>> 5) * 67108864 + (u32() >>> 6)) / 9007199254740992; }

const PRESETS: [string, { min: number; max: number; count: number; unique: boolean; dec: boolean }][] = [
  ["Roll a d6", { min: 1, max: 6, count: 1, unique: false, dec: false }],
  ["Roll a d20", { min: 1, max: 20, count: 1, unique: false, dec: false }],
  ["Flip a coin (1 = heads, 2 = tails)", { min: 1, max: 2, count: 1, unique: false, dec: false }],
  ["Lottery 6 of 49", { min: 1, max: 49, count: 6, unique: true, dec: false }],
  ["1 to 100", { min: 1, max: 100, count: 1, unique: false, dec: false }],
];

export default function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(5);
  const [dec, setDec] = useState(false);
  const [places, setPlaces] = useState(2);
  const [unique, setUnique] = useState(false);
  const [sort, setSort] = useState(false);
  const [out, setOut] = useState<number[]>([]);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  function gen(o?: { min: number; max: number; count: number; unique: boolean; dec: boolean }) {
    const mn = o?.min ?? min, mx = o?.max ?? max, n = o?.count ?? count, un = o?.unique ?? unique, dc = o?.dec ?? dec;
    if (o) { setMin(mn); setMax(mx); setCount(n); setUnique(un); setDec(dc); }
    if (![mn, mx, n].every(Number.isFinite) || mn > mx) return setErr("The minimum must be less than or equal to the maximum.");
    if (n < 1 || n > 1000) return setErr("Choose between 1 and 1000 numbers.");
    if (!dc) {
      if (!Number.isInteger(mn) || !Number.isInteger(mx)) return setErr("Whole number mode needs whole number limits.");
      if (mx - mn + 1 > 4294967295) return setErr("The range is too large. Keep it under 4.29 billion values.");
      if (un && mx - mn + 1 < n) return setErr(`Only ${mx - mn + 1} different numbers exist in that range, so ${n} unique picks are impossible.`);
    }
    setErr("");
    const res: number[] = [];
    if (dc) { const f = Math.pow(10, places); for (let i = 0; i < n; i++) res.push(Math.round((mn + randFloat() * (mx - mn)) * f) / f); }
    else if (un) { const seen = new Set<number>(); while (seen.size < n) seen.add(randInt(mn, mx)); res.push(...seen); }
    else for (let i = 0; i < n; i++) res.push(randInt(mn, mx));
    setOut(sort ? res.sort((a, b) => a - b) : res);
  }
  async function copy() { try { await navigator.clipboard.writeText(out.join(", ")); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch { /* blocked */ } }
  const num = (l: string, v: number, s: (n: number) => void) => <label className="flex flex-col gap-1">{l}<input type="number" className={field + " w-28"} value={v} onChange={(e) => s(+e.target.value)} /></label>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-x-4 gap-y-3 text-sm text-zinc-700">
        {num("Minimum", min, setMin)}{num("Maximum", max, setMax)}{num("How many", count, setCount)}
        <label className="flex items-center gap-2 pb-2"><input type="checkbox" checked={dec} onChange={(e) => setDec(e.target.checked)} /> Decimals</label>
        {dec && num("Decimal places", places, (n) => setPlaces(Math.min(10, Math.max(0, Math.round(n)))))}
        <label className="flex items-center gap-2 pb-2"><input type="checkbox" checked={unique} disabled={dec} onChange={(e) => setUnique(e.target.checked)} /> No repeats</label>
        <label className="flex items-center gap-2 pb-2"><input type="checkbox" checked={sort} onChange={(e) => setSort(e.target.checked)} /> Sort results</label>
      </div>
      <div className="flex flex-wrap gap-2">{PRESETS.map(([l, o]) => <button key={l} className={btnGhost} onClick={() => gen(o)}>{l}</button>)}</div>
      <div className="flex gap-2"><button className={btn} onClick={() => gen()}>Generate</button>{out.length > 0 && <button className={btnGhost} onClick={copy}>{copied ? "Copied" : "Copy results"}</button>}</div>
      {err && <p className="text-sm text-red-600">{err}</p>}
      {out.length > 0 && !err && (
        <div className="rounded-lg border border-zinc-200 bg-white px-4 py-4">
          <div className="flex flex-wrap gap-2">{out.map((n, i) => <span key={i} className={out.length === 1 ? "text-5xl font-semibold text-[#2E5C8A]" : "rounded-full bg-[#EAF1FD] px-3 py-1 font-mono text-sm text-[#2E5C8A]"}>{n}</span>)}</div>
          {out.length > 1 && <p className="mt-3 text-xs text-zinc-500">Sum {+out.reduce((a, b) => a + b, 0).toFixed(6)}, average {+(out.reduce((a, b) => a + b, 0) / out.length).toFixed(6)}</p>}
        </div>
      )}
    </div>
  );
}
