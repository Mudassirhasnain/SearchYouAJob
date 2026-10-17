"use client";
import { useState } from "react";
import { btnGhost, field } from "../ui";

type RGBA = [number, number, number, number];
const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

function parse(s: string): RGBA | null {
  const t = s.trim().toLowerCase();
  let m = /^#?([0-9a-f]{3,8})$/.exec(t);
  if (m && [3, 4, 6, 8].includes(m[1].length)) {
    let h = m[1];
    if (h.length <= 4) h = [...h].map((c) => c + c).join("");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1];
  }
  m = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)$/.exec(t);
  if (m) { const a = m[4] ? (m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4])) : 1; return [clamp(+m[1], 0, 255), clamp(+m[2], 0, 255), clamp(+m[3], 0, 255), clamp(a, 0, 1)]; }
  m = /^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%(?:[\s,/]+([\d.]+%?))?\s*\)$/.exec(t);
  if (m) { const [r, g, b] = hslToRgb(+m[1], +m[2], +m[3]); const a = m[4] ? (m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4])) : 1; return [r, g, b, clamp(a, 0, 1)]; }
  return null;
}
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  let h = 0, s = 0;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  return [h, s * 100, l * 100];
}
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = ((h % 360) + 360) % 360; s = clamp(s, 0, 100) / 100; l = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}
const hex = (c: RGBA) => "#" + [c[0], c[1], c[2]].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("") + (c[3] < 1 ? Math.round(c[3] * 255).toString(16).padStart(2, "0") : "");
const lum = (c: RGBA) => { const f = (v: number) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
const ratio = (a: RGBA, b: RGBA) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

export default function ColorConverter() {
  const [input, setInput] = useState("#2E5C8A");
  const [fg, setFg] = useState("#1f2937");
  const [bg, setBg] = useState("#ffffff");
  const [copied, setCopied] = useState("");
  const c = parse(input);
  const f = parse(fg), b = parse(bg);
  const hsl = c ? rgbToHsl(c[0], c[1], c[2]) : null;
  async function copy(k: string, v: string) { try { await navigator.clipboard.writeText(v); setCopied(k); setTimeout(() => setCopied(""), 1200); } catch { /* blocked */ } }
  const rows = c && hsl ? [
    ["HEX", hex(c).toUpperCase()],
    ["RGB", c[3] < 1 ? `rgba(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}, ${+c[3].toFixed(2)})` : `rgb(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])})`],
    ["HSL", c[3] < 1 ? `hsla(${Math.round(hsl[0])}, ${Math.round(hsl[1])}%, ${Math.round(hsl[2])}%, ${+c[3].toFixed(2)})` : `hsl(${Math.round(hsl[0])}, ${Math.round(hsl[1])}%, ${Math.round(hsl[2])}%)`],
  ] : [];
  const r = f && b ? ratio(f, b) : null;
  const badge = (pass: boolean) => <span className={pass ? "font-medium text-emerald-700" : "font-medium text-red-600"}>{pass ? "Pass" : "Fail"}</span>;

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h3 className="font-medium">Colour converter</h3>
        <div className="flex flex-wrap items-end gap-3 text-sm text-zinc-700">
          <label className="flex flex-col gap-1">Colour (HEX, rgb() or hsl())<input className={field + " w-64 font-mono"} value={input} onChange={(e) => setInput(e.target.value)} /></label>
          <input type="color" aria-label="Pick a colour" className="h-10 w-14" value={c ? hex(c).slice(0, 7) : "#000000"} onChange={(e) => setInput(e.target.value)} />
          <div className="h-10 w-20 rounded border border-zinc-300" style={{ background: c ? `rgba(${c[0]},${c[1]},${c[2]},${c[3]})` : "transparent" }} />
        </div>
        {c ? (
          <div className="rounded-lg border border-zinc-200 bg-white">
            {rows.map(([l, v]) => <div key={l} className="flex items-center justify-between gap-3 border-b border-zinc-100 px-3 py-2 text-sm last:border-0"><span className="w-12 text-zinc-500">{l}</span><span className="min-w-0 flex-1 truncate font-mono">{v}</span><button className={btnGhost + " !px-3 !py-1"} onClick={() => copy(l, v)}>{copied === l ? "Copied" : "Copy"}</button></div>)}
          </div>
        ) : <p className="text-sm text-red-600">Not a valid colour. Try #2e5c8a, rgb(46, 92, 138) or hsl(210, 50%, 36%).</p>}
      </section>
      <section className="space-y-3">
        <h3 className="font-medium">WCAG 2.1 contrast checker</h3>
        <div className="flex flex-wrap items-end gap-4 text-sm text-zinc-700">
          <label className="flex flex-col gap-1">Text colour<span className="flex gap-2"><input className={field + " w-32 font-mono"} value={fg} onChange={(e) => setFg(e.target.value)} /><input type="color" aria-label="Pick text colour" className="h-10 w-12" value={f ? hex(f).slice(0, 7) : "#000000"} onChange={(e) => setFg(e.target.value)} /></span></label>
          <label className="flex flex-col gap-1">Background<span className="flex gap-2"><input className={field + " w-32 font-mono"} value={bg} onChange={(e) => setBg(e.target.value)} /><input type="color" aria-label="Pick background colour" className="h-10 w-12" value={b ? hex(b).slice(0, 7) : "#ffffff"} onChange={(e) => setBg(e.target.value)} /></span></label>
          <button className={btnGhost} onClick={() => { setFg(bg); setBg(fg); }}>Swap</button>
        </div>
        {r !== null && f && b ? (
          <>
            <div className="rounded-lg border border-zinc-200 p-4" style={{ background: `rgb(${b[0]},${b[1]},${b[2]})`, color: `rgb(${f[0]},${f[1]},${f[2]})` }}>
              <p className="text-2xl font-semibold">Large sample text</p><p className="mt-1 text-sm">Normal sample text to check readability at body size.</p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3">
              <div className="text-3xl font-semibold text-[#2E5C8A]">{r.toFixed(2)} : 1</div>
              <table className="mt-2 w-full text-left text-sm"><tbody>
                <tr><td className="py-1 text-zinc-600">Normal text AA (4.5)</td><td>{badge(r >= 4.5)}</td><td className="py-1 text-zinc-600">AAA (7)</td><td>{badge(r >= 7)}</td></tr>
                <tr><td className="py-1 text-zinc-600">Large text AA (3)</td><td>{badge(r >= 3)}</td><td className="py-1 text-zinc-600">AAA (4.5)</td><td>{badge(r >= 4.5)}</td></tr>
                <tr><td className="py-1 text-zinc-600">UI components AA (3)</td><td>{badge(r >= 3)}</td><td /><td /></tr>
              </tbody></table>
            </div>
          </>
        ) : <p className="text-sm text-red-600">Enter two valid colours.</p>}
      </section>
    </div>
  );
}
