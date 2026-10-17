"use client";
import { useMemo, useState } from "react";
import { btnGhost, field } from "../ui";

type U = { id: string; name: string; f: number };
const CATS: Record<string, { label: string; units: U[] }> = {
  length: { label: "Length", units: [
    { id: "mm", name: "Millimetre (mm)", f: 0.001 }, { id: "cm", name: "Centimetre (cm)", f: 0.01 }, { id: "m", name: "Metre (m)", f: 1 }, { id: "km", name: "Kilometre (km)", f: 1000 },
    { id: "in", name: "Inch (in)", f: 0.0254 }, { id: "ft", name: "Foot (ft)", f: 0.3048 }, { id: "yd", name: "Yard (yd)", f: 0.9144 }, { id: "mi", name: "Mile (mi)", f: 1609.344 }, { id: "nmi", name: "Nautical mile", f: 1852 },
  ] },
  mass: { label: "Mass and weight", units: [
    { id: "mg", name: "Milligram (mg)", f: 1e-6 }, { id: "g", name: "Gram (g)", f: 0.001 }, { id: "kg", name: "Kilogram (kg)", f: 1 }, { id: "t", name: "Tonne (t)", f: 1000 },
    { id: "oz", name: "Ounce (oz)", f: 0.028349523125 }, { id: "lb", name: "Pound (lb)", f: 0.45359237 }, { id: "st", name: "Stone (st)", f: 6.35029318 },
  ] },
  temperature: { label: "Temperature", units: [{ id: "c", name: "Celsius (C)", f: 1 }, { id: "f", name: "Fahrenheit (F)", f: 1 }, { id: "k", name: "Kelvin (K)", f: 1 }] },
  area: { label: "Area", units: [
    { id: "mm2", name: "Square millimetre", f: 1e-6 }, { id: "cm2", name: "Square centimetre", f: 1e-4 }, { id: "m2", name: "Square metre", f: 1 }, { id: "ha", name: "Hectare (ha)", f: 10000 }, { id: "km2", name: "Square kilometre", f: 1e6 },
    { id: "in2", name: "Square inch", f: 0.00064516 }, { id: "ft2", name: "Square foot", f: 0.09290304 }, { id: "yd2", name: "Square yard", f: 0.83612736 }, { id: "ac", name: "Acre", f: 4046.8564224 }, { id: "mi2", name: "Square mile", f: 2589988.110336 },
    { id: "marla", name: "Marla (272.25 sq ft)", f: 25.2928526 }, { id: "kanal", name: "Kanal (20 marla)", f: 505.857052 },
  ] },
  volume: { label: "Volume", units: [
    { id: "ml", name: "Millilitre (mL)", f: 0.001 }, { id: "l", name: "Litre (L)", f: 1 }, { id: "m3", name: "Cubic metre", f: 1000 },
    { id: "tsp", name: "Teaspoon (US)", f: 0.00492892159375 }, { id: "tbsp", name: "Tablespoon (US)", f: 0.01478676478125 }, { id: "floz", name: "Fluid ounce (US)", f: 0.0295735295625 },
    { id: "cup", name: "Cup (US)", f: 0.2365882365 }, { id: "pt", name: "Pint (US)", f: 0.473176473 }, { id: "qt", name: "Quart (US)", f: 0.946352946 }, { id: "gal", name: "Gallon (US)", f: 3.785411784 }, { id: "galuk", name: "Gallon (UK)", f: 4.54609 },
  ] },
  digital: { label: "Digital storage", units: [
    { id: "bit", name: "Bit", f: 0.125 }, { id: "B", name: "Byte (B)", f: 1 }, { id: "KB", name: "Kilobyte (KB, 1000 B)", f: 1e3 }, { id: "MB", name: "Megabyte (MB, 1000 KB)", f: 1e6 }, { id: "GB", name: "Gigabyte (GB)", f: 1e9 }, { id: "TB", name: "Terabyte (TB)", f: 1e12 },
    { id: "KiB", name: "Kibibyte (KiB, 1024 B)", f: 1024 }, { id: "MiB", name: "Mebibyte (MiB)", f: 1048576 }, { id: "GiB", name: "Gibibyte (GiB)", f: 1073741824 }, { id: "TiB", name: "Tebibyte (TiB)", f: 1099511627776 },
  ] },
};

function toBase(cat: string, id: string, v: number) {
  if (cat === "temperature") return id === "c" ? v : id === "f" ? ((v - 32) * 5) / 9 : v - 273.15;
  return v * CATS[cat].units.find((u) => u.id === id)!.f;
}
function fromBase(cat: string, id: string, b: number) {
  if (cat === "temperature") return id === "c" ? b : id === "f" ? (b * 9) / 5 + 32 : b + 273.15;
  return b / CATS[cat].units.find((u) => u.id === id)!.f;
}
function show(x: number) {
  if (!Number.isFinite(x)) return "-";
  if (x === 0) return "0";
  const a = Math.abs(x);
  if (a >= 1e15 || a < 1e-7) return x.toExponential(6);
  return String(+x.toPrecision(10));
}

export default function UnitConverter() {
  const [cat, setCat] = useState("length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const [val, setVal] = useState("1");

  function pick(c: string) { setCat(c); setFrom(CATS[c].units[0].id); setTo(CATS[c].units[Math.min(1, CATS[c].units.length - 1)].id); }
  const v = Number(val);
  const valid = val.trim() !== "" && Number.isFinite(v);
  const base = valid ? toBase(cat, from, v) : NaN;
  const all = useMemo(() => CATS[cat].units.map((u) => ({ u, r: valid ? fromBase(cat, u.id, base) : NaN })), [cat, valid, base]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">{Object.entries(CATS).map(([k, c]) => <button key={k} className={cat === k ? "inline-flex rounded-full bg-[#2E5C8A] px-4 py-2 text-sm font-medium text-white" : btnGhost} onClick={() => pick(k)}>{c.label}</button>)}</div>
      <div className="flex flex-wrap items-end gap-3 text-sm text-zinc-700">
        <label className="flex flex-col gap-1">Value<input type="number" step="any" className={field + " w-40"} value={val} onChange={(e) => setVal(e.target.value)} /></label>
        <label className="flex flex-col gap-1">From<select className={field + " w-auto"} value={from} onChange={(e) => setFrom(e.target.value)}>{CATS[cat].units.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}</select></label>
        <button className={btnGhost} aria-label="Swap units" onClick={() => { setFrom(to); setTo(from); }}>Swap</button>
        <label className="flex flex-col gap-1">To<select className={field + " w-auto"} value={to} onChange={(e) => setTo(e.target.value)}>{CATS[cat].units.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}</select></label>
      </div>
      <div className="rounded-lg border border-zinc-200 bg-white px-4 py-4">
        <div className="text-3xl font-semibold text-[#2E5C8A]">{valid ? show(fromBase(cat, to, base)) : "-"} <span className="text-lg text-zinc-600">{CATS[cat].units.find((u) => u.id === to)?.name}</span></div>
        <p className="mt-1 text-sm text-zinc-600">{valid ? `${val} ${CATS[cat].units.find((u) => u.id === from)?.name} equals the value above.` : "Enter a number."}</p>
      </div>
      <div className="overflow-auto rounded-lg border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm"><tbody>{all.map(({ u, r }) => <tr key={u.id} className="border-b border-zinc-100 last:border-0"><td className="px-3 py-1.5 text-zinc-600">{u.name}</td><td className="px-3 py-1.5 text-right font-mono">{valid ? show(r) : "-"}</td></tr>)}</tbody></table>
      </div>
      {cat === "digital" && <p className="text-xs text-zinc-500">KB, MB and GB use 1000 bytes steps. KiB, MiB and GiB use 1024 byte steps. Operating systems often label 1024 based sizes as KB or MB.</p>}
      {cat === "area" && <p className="text-xs text-zinc-500">Marla and kanal use the common Punjab definition: 1 marla is 272.25 square feet and 1 kanal is 20 marla. Local definitions vary.</p>}
    </div>
  );
}
