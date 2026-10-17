"use client";
import { useMemo, useState } from "react";
import { btn, btnGhost, field } from "../ui";

type Sym = "code128" | "ean13" | "upca" | "code39" | "itf";
type Enc = { bars: number[]; text: string } | { error: string };

const C128 = "212222,222122,222221,121223,121322,131222,122213,122312,132212,221213,221312,231212,112232,122132,122231,113222,123122,123221,223211,221132,221231,213212,223112,312131,311222,321122,321221,312212,322112,322211,212123,212321,232121,111323,131123,131321,112313,132113,132311,211313,231113,231311,112133,112331,132131,113123,113321,133121,313121,211331,231131,213113,213311,213131,311123,311321,331121,312113,312311,332111,314111,221411,431111,111224,111422,121124,121421,141122,141221,112214,112412,122114,122411,142112,142211,241211,221114,413111,241112,134111,111242,121142,121241,114212,124112,124211,411212,421112,421211,212141,214121,412121,111143,111341,131141,114113,114311,411113,411311,113141,114131,311141,411131,211412,211214,211232,2331112".split(",");

const digits = (p: string) => [...p].map(Number);

function code128(s: string): Enc {
  if (!s) return { error: "Enter some text." };
  if (/[^\x20-\x7e]/.test(s)) return { error: "Code 128 (set B) supports standard keyboard characters only." };
  const allDigits = /^\d+$/.test(s) && s.length % 2 === 0;
  const codes: number[] = [];
  if (allDigits) { codes.push(105); for (let i = 0; i < s.length; i += 2) codes.push(+s.slice(i, i + 2)); }
  else { codes.push(104); for (const c of s) codes.push(c.charCodeAt(0) - 32); }
  const sum = codes.reduce((a, c, i) => a + c * (i === 0 ? 1 : i), 0);
  codes.push(sum % 103, 106);
  return { bars: codes.flatMap((c) => digits(C128[c])), text: s };
}

const L = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
const G = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
const R = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
const PAR = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];

function bitsToBars(bits: string) {
  const out: number[] = []; let cur = bits[0], n = 0;
  if (cur === "0") out.push(0);
  for (const b of bits) { if (b === cur) n++; else { out.push(n); cur = b; n = 1; } }
  out.push(n);
  return out;
}
function ean13(s: string): Enc {
  if (!/^\d{12,13}$/.test(s)) return { error: "EAN-13 needs 12 digits (the check digit is added) or 13 digits." };
  const d = digits(s.slice(0, 12));
  const chk = (10 - (d.reduce((a, x, i) => a + x * (i % 2 ? 3 : 1), 0) % 10)) % 10;
  if (s.length === 13 && +s[12] !== chk) return { error: `Check digit is wrong. It should be ${chk}.` };
  const full = [...d, chk];
  const par = PAR[full[0]];
  let bits = "101";
  for (let i = 0; i < 6; i++) bits += (par[i] === "L" ? L : G)[full[i + 1]];
  bits += "01010";
  for (let i = 7; i < 13; i++) bits += R[full[i]];
  bits += "101";
  return { bars: bitsToBars(bits), text: full.join("") };
}
function upca(s: string): Enc {
  if (!/^\d{11,12}$/.test(s)) return { error: "UPC-A needs 11 digits (the check digit is added) or 12 digits." };
  const d = digits(s.slice(0, 11));
  const chk = (10 - ((d.reduce((a, x, i) => a + x * (i % 2 ? 1 : 3), 0)) % 10)) % 10;
  if (s.length === 12 && +s[11] !== chk) return { error: `Check digit is wrong. It should be ${chk}.` };
  const r = ean13("0" + d.join("") + chk);
  return "error" in r ? r : { bars: r.bars, text: r.text.slice(1) };
}

const C39: Record<string, string> = { "0": "nnnwwnwnn", "1": "wnnwnnnnw", "2": "nnwwnnnnw", "3": "wnwwnnnnn", "4": "nnnwwnnnw", "5": "wnnwwnnnn", "6": "nnwwwnnnn", "7": "nnnwnnwnw", "8": "wnnwnnwnn", "9": "nnwwnnwnn", A: "wnnnnwnnw", B: "nnwnnwnnw", C: "wnwnnwnnn", D: "nnnnwwnnw", E: "wnnnwwnnn", F: "nnwnwwnnn", G: "nnnnnwwnw", H: "wnnnnwwnn", I: "nnwnnwwnn", J: "nnnnwwwnn", K: "wnnnnnnww", L: "nnwnnnnww", M: "wnwnnnnwn", N: "nnnnwnnww", O: "wnnnwnnwn", P: "nnwnwnnwn", Q: "nnnnnnwww", R: "wnnnnnwwn", S: "nnwnnnwwn", T: "nnnnwnwwn", U: "wwnnnnnnw", V: "nwwnnnnnw", W: "wwwnnnnnn", X: "nwnnwnnnw", Y: "wwnnwnnnn", Z: "nwwnwnnnn", "-": "nwnnnnwnw", ".": "wwnnnnwnn", " ": "nwwnnnwnn", $: "nwnwnwnnn", "/": "nwnwnnnwn", "+": "nwnnnwnwn", "%": "nnnwnwnwn", "*": "nwnnwnwnn" };
function code39(raw: string): Enc {
  const s = raw.toUpperCase();
  if (!s) return { error: "Enter some text." };
  if ([...s].some((c) => !C39[c] || c === "*")) return { error: "Code 39 supports 0 to 9, A to Z, space and - . $ / + %." };
  const bars: number[] = [];
  [..."*" + s + "*"].forEach((c, i, a) => { bars.push(...[...C39[c]].map((x) => (x === "w" ? 3 : 1))); if (i < a.length - 1) bars.push(1); });
  return { bars, text: s };
}

const ITF = ["nnwwn", "wnnnw", "nwnnw", "wwnnn", "nnwnw", "wnwnn", "nwwnn", "nnnww", "wnnwn", "nwnwn"];
function itf(s: string): Enc {
  if (!/^\d+$/.test(s) || s.length % 2) return { error: "ITF needs an even number of digits." };
  const bars = [1, 1, 1, 1];
  for (let i = 0; i < s.length; i += 2) { const a = ITF[+s[i]], b = ITF[+s[i + 1]]; for (let k = 0; k < 5; k++) bars.push(a[k] === "w" ? 3 : 1, b[k] === "w" ? 3 : 1); }
  bars.push(3, 1, 1);
  return { bars, text: s };
}

const ENC: Record<Sym, (s: string) => Enc> = { code128, ean13, upca, code39, itf };
const NAMES: Record<Sym, string> = { code128: "Code 128", ean13: "EAN-13", upca: "UPC-A", code39: "Code 39", itf: "ITF (Interleaved 2 of 5)" };
const SAMPLE: Record<Sym, string> = { code128: "SearchYouAJob-123", ean13: "400638133393", upca: "03600029145", code39: "HELLO-123", itf: "12345670" };

export default function Barcode() {
  const [sym, setSym] = useState<Sym>("code128");
  const [val, setVal] = useState(SAMPLE.code128);
  const [mod, setMod] = useState(2);
  const [height, setHeight] = useState(100);
  const [showText, setShowText] = useState(true);

  const enc = useMemo(() => ENC[sym](val.trim()), [sym, val]);
  const quiet = 10;
  const geo = "bars" in enc ? (() => {
    const w = enc.bars.reduce((a, b) => a + b, 0) + quiet * 2;
    let x = quiet; const rects: string[] = [];
    enc.bars.forEach((b, i) => { if (i % 2 === 0) rects.push(`<rect x="${x * mod}" y="0" width="${b * mod}" height="${height}"/>`); x += b; });
    const textH = showText ? 22 : 0;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w * mod}" height="${height + textH}" viewBox="0 0 ${w * mod} ${height + textH}"><rect width="100%" height="100%" fill="#fff"/><g fill="#000">${rects.join("")}</g>${showText ? `<text x="${(w * mod) / 2}" y="${height + 17}" font-family="monospace" font-size="16" text-anchor="middle">${enc.text.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text>` : ""}</svg>`;
    return { svg, w: w * mod, h: height + textH };
  })() : null;

  function dl(name: string, blob: Blob) { const u = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = u; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(u), 2000); }
  function png() {
    if (!geo) return;
    const img = new Image();
    img.onload = () => { const c = document.createElement("canvas"); c.width = geo.w; c.height = geo.h; c.getContext("2d")!.drawImage(img, 0, 0); c.toBlob((b) => b && dl("barcode.png", b)); };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(geo.svg);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-x-5 gap-y-3 text-sm text-zinc-700">
        <label className="flex flex-col gap-1">Barcode type<select className={field + " w-auto"} value={sym} onChange={(e) => { const s = e.target.value as Sym; setSym(s); setVal(SAMPLE[s]); }}>{(Object.keys(NAMES) as Sym[]).map((s) => <option key={s} value={s}>{NAMES[s]}</option>)}</select></label>
        <label className="flex flex-col gap-1">Value<input className={field + " w-64 font-mono"} value={val} onChange={(e) => setVal(e.target.value)} /></label>
        <label className="flex flex-col gap-1">Bar width {mod}x<input type="range" min={1} max={5} value={mod} onChange={(e) => setMod(+e.target.value)} className="w-28" /></label>
        <label className="flex flex-col gap-1">Height {height}px<input type="range" min={40} max={240} step={10} value={height} onChange={(e) => setHeight(+e.target.value)} className="w-32" /></label>
        <label className="flex items-center gap-2 pb-2"><input type="checkbox" checked={showText} onChange={(e) => setShowText(e.target.checked)} /> Show number</label>
      </div>
      {"error" in enc ? <p className="text-sm text-red-600">{enc.error}</p> : null}
      <div className="overflow-auto rounded-lg border border-zinc-200 bg-white p-4">
        {geo ? <div dangerouslySetInnerHTML={{ __html: geo.svg }} className="mx-auto w-fit max-w-full" /> : <p className="text-sm text-zinc-500">Fix the value to see the barcode.</p>}
      </div>
      <div className="flex gap-2">
        <button className={btn} disabled={!geo} onClick={() => geo && dl("barcode.svg", new Blob([geo.svg], { type: "image/svg+xml" }))}>Download SVG</button>
        <button className={btnGhost} disabled={!geo} onClick={png}>Download PNG</button>
      </div>
      <p className="text-xs text-zinc-500">Test printed barcodes with a real scanner before using them on products. Retail barcodes (EAN and UPC) need numbers assigned by GS1 to be valid in shops.</p>
    </div>
  );
}
