"use client";
import { useState } from "react";
import { btnGhost, field } from "../ui";

const MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const utc = (y: number, m: number, d: number) => Date.UTC(y, m, d);
const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

function isoWeek(y: number, m: number, d: number) {
  const t = new Date(utc(y, m, d));
  t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 6) % 7) + 3);
  const wy = t.getUTCFullYear();
  const jan4 = new Date(utc(wy, 0, 4));
  const week = 1 + Math.round(((t.getTime() - jan4.getTime()) / 86400000 - 3 + ((jan4.getUTCDay() + 6) % 7)) / 7);
  return { week, wy };
}

export default function WeeksIntoYear() {
  const [value, setValue] = useState(() => iso(new Date()));
  const [y, m, d] = value.split("-").map(Number);
  const valid = !!y && !!m && !!d;
  const doy = valid ? Math.round((utc(y, m - 1, d) - utc(y, 0, 1)) / 86400000) + 1 : 0;
  const len = valid ? (isLeap(y) ? 366 : 365) : 365;
  const w = valid ? isoWeek(y, m - 1, d) : { week: 0, wy: 0 };
  const simple = Math.ceil(doy / 7);
  const left = len - doy;
  const todayIso = iso(new Date());

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3 text-sm text-zinc-700">
        <label className="flex flex-col gap-1">Date<input type="date" className={field + " w-44"} value={value} onChange={(e) => setValue(e.target.value)} /></label>
        <button className={btnGhost} onClick={() => setValue(todayIso)}>Today</button>
      </div>
      {!valid ? <p className="text-sm text-red-600">Pick a date.</p> : (
        <>
          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-4">
            <div className="text-3xl font-semibold text-[#2E5C8A]">ISO week {w.week}{w.wy !== y ? ` of ${w.wy}` : ""}</div>
            <p className="mt-1 text-sm text-zinc-600">{new Date(utc(y, m - 1, d)).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[["Simple week count", `Week ${simple}`], ["Day of the year", `${doy} of ${len}`], ["Weeks remaining", `${Math.floor(left / 7)} weeks ${left % 7} days`], ["Year elapsed", `${((doy / len) * 100).toFixed(1)}%`]].map(([l, v]) => (
              <div key={l} className="rounded-lg border border-zinc-200 bg-white px-3 py-2"><div className="font-semibold">{v}</div><div className="text-xs text-zinc-500">{l}</div></div>
            ))}
          </div>
          <div className="overflow-auto rounded-lg border border-zinc-200 bg-white">
            <table className="w-full text-left text-sm"><thead className="bg-zinc-50 text-zinc-600"><tr><th className="px-3 py-2">Month</th><th className="px-3 py-2">ISO week of the 1st</th><th className="px-3 py-2">ISO week of the last day</th></tr></thead>
              <tbody>{MON.map((n, i) => { const last = new Date(utc(y, i + 1, 0)).getUTCDate(); return <tr key={n} className="border-t border-zinc-100"><td className="px-3 py-1.5">{n} {y}</td><td className="px-3 py-1.5">{isoWeek(y, i, 1).week}</td><td className="px-3 py-1.5">{isoWeek(y, i, last).week}</td></tr>; })}</tbody></table>
          </div>
          <p className="text-xs text-zinc-500">ISO 8601 weeks start on Monday, and week 1 is the week that contains the first Thursday of the year. Early January days can belong to the last week of the previous year.</p>
        </>
      )}
    </div>
  );
}
