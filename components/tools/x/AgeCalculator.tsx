"use client";
import { useEffect, useState } from "react";
import { field } from "../ui";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const pad = (x: number) => String(x).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const dim = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();

export default function AgeCalculator() {
  const [dob, setDob] = useState("1998-05-14");
  const [asOf, setAsOf] = useState("");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const t0 = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => { clearTimeout(t0); clearInterval(id); };
  }, []);

  if (!now) return <p className="text-sm text-zinc-500">Loading...</p>;

  const end = asOf ? new Date(asOf + "T" + (asOf === iso(now) ? now.toTimeString().slice(0, 8) : "00:00:00")) : now;
  const start = dob ? new Date(dob + "T00:00:00") : null;
  let body: React.ReactNode;
  if (!start || isNaN(start.getTime())) body = <p className="text-sm text-zinc-600">Pick a date of birth.</p>;
  else if (start > end) body = <p className="text-sm text-red-600">The date of birth is after the comparison date. Check the dates.</p>;
  else {
    let y = end.getFullYear() - start.getFullYear();
    let m = end.getMonth() - start.getMonth();
    let d = end.getDate() - start.getDate();
    if (d < 0) { m--; d += dim(end.getFullYear(), end.getMonth() - 1); }
    if (m < 0) { y--; m += 12; }
    const ms = end.getTime() - start.getTime();
    const totalDays = Math.floor(ms / 86400000);
    let next = new Date(end.getFullYear(), start.getMonth(), start.getDate());
    if (next < new Date(end.getFullYear(), end.getMonth(), end.getDate())) next = new Date(end.getFullYear() + 1, start.getMonth(), start.getDate());
    const daysToGo = Math.round((next.getTime() - new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()) / 86400000);
    const stats: [string, string][] = [
      ["Total months", String(y * 12 + m)], ["Total weeks", Math.floor(totalDays / 7).toLocaleString()], ["Total days", totalDays.toLocaleString()],
      ["Total hours", Math.floor(ms / 3600000).toLocaleString()], ["Total minutes", Math.floor(ms / 60000).toLocaleString()],
    ];
    body = (
      <>
        <div className="rounded-lg border border-zinc-200 bg-white px-4 py-4">
          <div className="text-3xl font-semibold text-[#2E5C8A]">{y} years, {m} months, {d} days</div>
          <p className="mt-1 text-sm text-zinc-600">Born on a {DAYS[start.getDay()]}.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {stats.map(([l, v]) => <div key={l} className="rounded-lg border border-zinc-200 bg-white px-3 py-2"><div className="font-semibold">{v}</div><div className="text-xs text-zinc-500">{l}</div></div>)}
        </div>
        <p className="text-sm text-zinc-700">Next birthday: <strong>{next.toDateString()}</strong>, {daysToGo === 0 ? "today. Happy birthday!" : `in ${daysToGo} day${daysToGo === 1 ? "" : "s"}.`}</p>
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 text-sm text-zinc-700">
        <label className="flex flex-col gap-1">Date of birth<input type="date" className={field + " w-44"} value={dob} max={iso(now)} onChange={(e) => setDob(e.target.value)} /></label>
        <label className="flex flex-col gap-1">Age at date (optional, default today)<input type="date" className={field + " w-44"} value={asOf} onChange={(e) => setAsOf(e.target.value)} /></label>
      </div>
      {body}
    </div>
  );
}
