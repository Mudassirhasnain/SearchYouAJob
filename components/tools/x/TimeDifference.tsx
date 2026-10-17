"use client";
import { useState } from "react";
import { btnGhost, field } from "../ui";
import { ZONES, dayKey, fmtZone, nowLocalInput, offsetLabel, offsetMinutes, parseLocal, zonedToUtc } from "./tz";

const WORLD = ["America/Los_Angeles", "America/New_York", "America/Sao_Paulo", "Europe/London", "Europe/Paris", "Asia/Dubai", "Asia/Karachi", "Asia/Kolkata", "Asia/Tokyo", "Australia/Sydney"];

export default function TimeDifference() {
  const browser = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";
  const [from, setFrom] = useState(ZONES.some((z) => z.id === browser) ? browser : "UTC");
  const [to, setTo] = useState("America/New_York");
  const [dt, setDt] = useState(() => nowLocalInput(ZONES.some((z) => z.id === browser) ? browser : "UTC"));

  const p = parseLocal(dt);
  const utc = p ? zonedToUtc(p.y, p.mo, p.d, p.h, p.mi, from) : null;
  const diff = utc !== null ? offsetMinutes(to, utc) - offsetMinutes(from, utc) : 0;
  const shift = utc !== null ? (dayKey(utc, to) > dayKey(utc, from) ? "next day" : dayKey(utc, to) < dayKey(utc, from) ? "previous day" : "same day") : "";
  const opts = (
    <>{ZONES.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}{!ZONES.some((z) => z.id === browser) && <option value={browser}>{browser}</option>}</>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3 text-sm text-zinc-700">
        <label className="flex flex-col gap-1">From time zone<select className={field + " w-auto"} value={from} onChange={(e) => setFrom(e.target.value)}>{opts}</select></label>
        <button className={btnGhost} onClick={() => { setFrom(to); setTo(from); }}>Swap</button>
        <label className="flex flex-col gap-1">To time zone<select className={field + " w-auto"} value={to} onChange={(e) => setTo(e.target.value)}>{opts}</select></label>
        <label className="flex flex-col gap-1">Date and time in {ZONES.find((z) => z.id === from)?.label ?? from}<input type="datetime-local" className={field + " w-60"} value={dt} onChange={(e) => setDt(e.target.value)} /></label>
      </div>
      {utc === null ? <p className="text-sm text-red-600">Pick a date and time.</p> : (
        <>
          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-4">
            <div className="text-sm text-zinc-500">{fmtZone(utc, from)}</div>
            <div className="mt-1 text-2xl font-semibold text-[#2E5C8A]">{fmtZone(utc, to)}</div>
            <p className="mt-2 text-sm text-zinc-700">{ZONES.find((z) => z.id === to)?.label ?? to} is <strong>{diff === 0 ? "the same time" : `${offsetLabel(diff)} ${diff > 0 ? "ahead of" : "behind"}`}</strong> {diff === 0 ? "" : (ZONES.find((z) => z.id === from)?.label ?? from)} on this date. It is the <strong>{shift}</strong> there.</p>
          </div>
          <div className="overflow-auto rounded-lg border border-zinc-200 bg-white">
            <table className="w-full text-left text-sm"><thead className="bg-zinc-50 text-zinc-600"><tr><th className="px-3 py-2">City</th><th className="px-3 py-2">Local time at that moment</th></tr></thead>
              <tbody>{WORLD.map((z) => <tr key={z} className="border-t border-zinc-100"><td className="px-3 py-1.5">{ZONES.find((x) => x.id === z)?.label}</td><td className="px-3 py-1.5">{fmtZone(utc, z)}</td></tr>)}</tbody></table>
          </div>
        </>
      )}
    </div>
  );
}
