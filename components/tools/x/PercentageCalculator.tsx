"use client";
import { useState } from "react";
import { btn, btnGhost, field } from "../ui";

const TABS = [
  ["of", "X% of Y"], ["what", "X is what % of Y"], ["change", "Percentage change"], ["discount", "Discount and tax"], ["markup", "Markup and margin"],
] as const;
type Tab = (typeof TABS)[number][0];

const n = (v: string) => (v.trim() === "" ? NaN : Number(v));
const f = (x: number, d = 4) => (Number.isFinite(x) ? String(+x.toFixed(d)) : "-");

function Num({ label, v, set }: { label: string; v: string; set: (s: string) => void }) {
  return <label className="flex flex-col gap-1 text-sm text-zinc-700">{label}<input type="number" step="any" className={field + " w-40"} value={v} onChange={(e) => set(e.target.value)} /></label>;
}
function Result({ main, formula }: { main: string; formula: string }) {
  return <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3"><div className="text-2xl font-semibold text-[#2E5C8A]">{main}</div><div className="mt-1 text-xs text-zinc-500">{formula}</div></div>;
}

export default function PercentageCalculator() {
  const [tab, setTab] = useState<Tab>("of");
  const [a, setA] = useState("15"); const [b, setB] = useState("200");
  const [price, setPrice] = useState("5000"); const [d1, setD1] = useState("20"); const [d2, setD2] = useState("0"); const [tax, setTax] = useState("0");
  const [cost, setCost] = useState("80"); const [sell, setSell] = useState("100");

  const A = n(a), B = n(b);
  let body: React.ReactNode = null;
  if (tab === "of") body = <><div className="flex flex-wrap gap-3"><Num label="Percentage (X)" v={a} set={setA} /><Num label="Of number (Y)" v={b} set={setB} /></div><Result main={f((A / 100) * B)} formula={`${f(A)} / 100 x ${f(B)}`} /></>;
  if (tab === "what") body = <><div className="flex flex-wrap gap-3"><Num label="Number (X)" v={a} set={setA} /><Num label="Total (Y)" v={b} set={setB} /></div><Result main={B === 0 ? "-" : f((A / B) * 100) + "%"} formula={`${f(A)} / ${f(B)} x 100`} /></>;
  if (tab === "change") {
    const ch = ((B - A) / Math.abs(A)) * 100;
    body = <><div className="flex flex-wrap gap-3"><Num label="Old value" v={a} set={setA} /><Num label="New value" v={b} set={setB} /></div><Result main={A === 0 ? "-" : `${ch > 0 ? "+" : ""}${f(ch)}%`} formula={`(${f(B)} - ${f(A)}) / ${f(Math.abs(A))} x 100. Difference: ${f(B - A)}`} /></>;
  }
  if (tab === "discount") {
    const P = n(price), x = n(d1) || 0, y = n(d2) || 0, t = n(tax) || 0;
    const after = P * (1 - x / 100) * (1 - y / 100);
    const final = after * (1 + t / 100);
    body = <><div className="flex flex-wrap gap-3"><Num label="Original price" v={price} set={setPrice} /><Num label="Discount (%)" v={d1} set={setD1} /><Num label="Extra coupon (%)" v={d2} set={setD2} /><Num label="Tax (%)" v={tax} set={setTax} /></div>
      <Result main={f(final, 2)} formula={`${f(P, 2)} x (1 - ${f(x)}%) x (1 - ${f(y)}%) x (1 + ${f(t)}%). You save ${f(P - after, 2)} before tax.`} /></>;
  }
  if (tab === "markup") {
    const C = n(cost), S = n(sell);
    body = <><div className="flex flex-wrap gap-3"><Num label="Cost" v={cost} set={setCost} /><Num label="Selling price" v={sell} set={setSell} /></div>
      <div className="grid gap-2 sm:grid-cols-3"><Result main={f(S - C, 2)} formula="Profit = selling price - cost" /><Result main={C === 0 ? "-" : f(((S - C) / C) * 100, 2) + "%"} formula="Markup = profit / cost x 100" /><Result main={S === 0 ? "-" : f(((S - C) / S) * 100, 2) + "%"} formula="Margin = profit / selling price x 100" /></div></>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">{TABS.map(([id, l]) => <button key={id} className={tab === id ? btn : btnGhost} onClick={() => setTab(id)}>{l}</button>)}</div>
      <div className="space-y-4">{body}</div>
    </div>
  );
}
