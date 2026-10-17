"use client";
import { useState } from "react";
import { btnGhost, field } from "../ui";
import { dayKey, fmtZone, nowLocalInput, offsetMinutes, parseLocal, zonedToUtc } from "./tz";

const ET = "America/New_York", PT = "America/Los_Angeles";

export default function EstToPst() {
  const [dir, setDir] = useState<"e2p" | "p2e">("e2p");
  const [dt, setDt] = useState(() => nowLocalInput(ET));
  const src = dir === "e2p" ? ET : PT, dst = dir === "e2p" ? PT : ET;
  const p = parseLocal(dt);
  const utc = p ? zonedToUtc(p.y, p.mo, p.d, p.h, p.mi, src) : null;
  const diffH = utc !== null ? (offsetMinutes(src, utc) - offsetMinutes(dst, utc)) / 60 : 0;
  const short = (ts: number, z: string) => fmtZone(ts, z, { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
  const rows = p ? Array.from({ length: 24 }, (_, h) => { const u = zonedToUtc(p.y, p.mo, p.d, h, 0, src); const k = dayKey(u, dst) === dayKey(u, src) ? "" : dayKey(u, dst) > dayKey(u, src) ? " (next day)" : " (previous day)"; return { h, a: short(u, src), b: short(u, dst) + k }; }) : [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3 text-sm text-zinc-700">
        <div className="flex gap-2"><button className={dir === "e2p" ? "rounded-full bg-[#2E5C8A] px-4 py-2 text-sm font-medium text-white" : btnGhost} onClick={() => setDir("e2p")}>EST to PST</button><button className={dir === "p2e" ? "rounded-full bg-[#2E5C8A] px-4 py-2 text-sm font-medium text-white" : btnGhost} onClick={() => setDir("p2e")}>PST to EST</button></div>
        <label className="flex flex-col gap-1">{dir === "e2p" ? "Eastern" : "Pacific"} date and time<input type="datetime-local" className={field + " w-60"} value={dt} onChange={(e) => setDt(e.target.value)} /></label>
      </div>
      {utc === null ? <p className="text-sm text-red-600">Pick a date and time.</p> : (
        <>
          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-4">
            <div className="text-sm text-zinc-500">{fmtZone(utc, src)}</div>
            <div className="mt-1 text-2xl font-semibold text-[#2E5C8A]">{fmtZone(utc, dst)}</div>
            <p className="mt-2 text-sm text-zinc-700">{dir === "e2p" ? "Pacific" : "Eastern"} time is {Math.abs(diffH)} hours {dir === "e2p" ? "behind" : "ahead of"} {dir === "e2p" ? "Eastern" : "Pacific"} on this date.{dayKey(utc, dst) !== dayKey(utc, src) ? " The result falls on a different day." : ""}</p>
          </div>
          <div className="max-h-96 overflow-auto rounded-lg border border-zinc-200 bg-white">
            <table className="w-full text-left text-sm"><thead className="sticky top-0 bg-zinc-50 text-zinc-600"><tr><th className="px-3 py-2">{dir === "e2p" ? "Eastern" : "Pacific"}</th><th className="px-3 py-2">{dir === "e2p" ? "Pacific" : "Eastern"}</th></tr></thead>
              <tbody>{rows.map((r) => <tr key={r.h} className="border-t border-zinc-100"><td className="px-3 py-1">{r.a}</td><td className="px-3 py-1">{r.b}</td></tr>)}</tbody></table>
          </div>
        </>
      )}
    </div>
  );
}
