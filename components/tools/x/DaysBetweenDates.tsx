"use client";
import { useState } from "react";
import { btn, btnGhost, field } from "../ui";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const parse = (s: string) => { const [y, m, d] = s.split("-").map(Number); return Date.UTC(y, m - 1, d); };
const dim = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
const label = (ms: number) => { const d = new Date(ms); return `${DAYS[d.getUTCDay()]}, ${d.getUTCDate()} ${MON[d.getUTCMonth()]} ${d.getUTCFullYear()}`; };

function addMonths(ms: number, k: number) {
  const d = new Date(ms);
  const t = d.getUTCFullYear() * 12 + d.getUTCMonth() + k;
  const y = Math.floor(t / 12), m = ((t % 12) + 12) % 12;
  return Date.UTC(y, m, Math.min(d.getUTCDate(), dim(y, m)));
}

export default function DaysBetweenDates() {
  const [mode, setMode] = useState<"diff" | "add">("diff");
  const [a, setA] = useState("2026-01-01"); const [b, setB] = useState("2026-12-31");
  const [inc, setInc] = useState(false);
  const [base, setBase] = useState("2026-10-13");
  const [sign, setSign] = useState<1 | -1>(1);
  const [yrs, setYrs] = useState(0); const [mos, setMos] = useState(0); const [wks, setWks] = useState(0); const [dys, setDys] = useState(30);

  let body: React.ReactNode = null;
  if (mode === "diff") {
    if (!a || !b) body = <p className="text-sm text-zinc-600">Pick both dates.</p>;
    else {
      let s = parse(a), e = parse(b);
      const swapped = s > e; if (swapped) [s, e] = [e, s];
      const days = Math.round((e - s) / 86400000) + (inc ? 1 : 0);
      const sd = new Date(s), ed = new Date(e);
      let y = ed.getUTCFullYear() - sd.getUTCFullYear(), m = ed.getUTCMonth() - sd.getUTCMonth(), d = ed.getUTCDate() - sd.getUTCDate();
      if (d < 0) { m--; d += dim(ed.getUTCFullYear(), ed.getUTCMonth() - 1); }
      if (m < 0) { y--; m += 12; }
      const span = Math.round((e - s) / 86400000) + (inc ? 1 : 0);
      let work = 0;
      const full = Math.floor(span / 7); work = full * 5;
      for (let i = 0; i < span % 7; i++) { const wd = new Date(s + (full * 7 + i) * 86400000).getUTCDay(); if (wd !== 0 && wd !== 6) work++; }
      const rows: [string, string][] = [["Days", days.toLocaleString()], ["Weeks and days", `${Math.floor(days / 7)} weeks, ${days % 7} days`], ["Years, months, days", `${y}y ${m}m ${d}d`], ["Hours", (days * 24).toLocaleString()], ["Working days (Mon to Fri)", work.toLocaleString()]];
      body = (
        <>
          {swapped && <p className="text-xs text-zinc-500">The dates were in reverse order, so they were swapped.</p>}
          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-4"><div className="text-3xl font-semibold text-[#2E5C8A]">{days.toLocaleString()} days</div><p className="mt-1 text-sm text-zinc-600">{label(s)} to {label(e)}</p></div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{rows.slice(1).map(([l, v]) => <div key={l} className="rounded-lg border border-zinc-200 bg-white px-3 py-2"><div className="font-semibold">{v}</div><div className="text-xs text-zinc-500">{l}</div></div>)}</div>
        </>
      );
    }
  } else if (!base) body = <p className="text-sm text-zinc-600">Pick a start date.</p>;
  else {
    let r = addMonths(parse(base), sign * (yrs * 12 + mos));
    r += sign * (wks * 7 + dys) * 86400000;
    body = <div className="rounded-lg border border-zinc-200 bg-white px-4 py-4"><div className="text-2xl font-semibold text-[#2E5C8A]">{label(r)}</div><p className="mt-1 text-sm text-zinc-600">{sign === 1 ? "Adding" : "Subtracting"} {yrs}y {mos}m {wks}w {dys}d {sign === 1 ? "to" : "from"} {label(parse(base))}.</p></div>;
  }

  const num = (v: number, set: (n: number) => void, l: string) => <label className="flex flex-col gap-1">{l}<input type="number" min={0} className={field + " w-24"} value={v} onChange={(e) => set(Math.max(0, +e.target.value || 0))} /></label>;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className={mode === "diff" ? btn : btnGhost} onClick={() => setMode("diff")}>Days between two dates</button>
        <button className={mode === "add" ? btn : btnGhost} onClick={() => setMode("add")}>Add or subtract time</button>
      </div>
      <div className="flex flex-wrap items-end gap-4 text-sm text-zinc-700">
        {mode === "diff" ? (
          <>
            <label className="flex flex-col gap-1">Start date<input type="date" className={field + " w-44"} value={a} onChange={(e) => setA(e.target.value)} /></label>
            <label className="flex flex-col gap-1">End date<input type="date" className={field + " w-44"} value={b} onChange={(e) => setB(e.target.value)} /></label>
            <label className="flex items-center gap-2 pb-2"><input type="checkbox" checked={inc} onChange={(e) => setInc(e.target.checked)} /> Include the end date</label>
          </>
        ) : (
          <>
            <label className="flex flex-col gap-1">Start date<input type="date" className={field + " w-44"} value={base} onChange={(e) => setBase(e.target.value)} /></label>
            <label className="flex flex-col gap-1">Action<select className={field + " w-auto"} value={sign} onChange={(e) => setSign(+e.target.value as 1 | -1)}><option value={1}>Add</option><option value={-1}>Subtract</option></select></label>
            {num(yrs, setYrs, "Years")}{num(mos, setMos, "Months")}{num(wks, setWks, "Weeks")}{num(dys, setDys, "Days")}
          </>
        )}
      </div>
      {body}
    </div>
  );
}
