"use client";
import { useEffect, useState } from "react";
import { btnGhost, field } from "../ui";

const pad = (n: number) => String(n).padStart(2, "0");
function rel(ms: number) {
  const diff = Math.round((ms - Date.now()) / 1000);
  const a = Math.abs(diff);
  const u: [number, string][] = [[31536000, "year"], [2592000, "month"], [86400, "day"], [3600, "hour"], [60, "minute"], [1, "second"]];
  for (const [s, n] of u) if (a >= s) { const k = Math.floor(a / s); return diff < 0 ? `${k} ${n}${k > 1 ? "s" : ""} ago` : `in ${k} ${n}${k > 1 ? "s" : ""}`; }
  return "now";
}

function Row({ k, l, v, copied, copy }: { k: string; l: string; v: string; copied: string; copy: (k: string, v: string) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-3 py-2 text-sm last:border-0">
      <span className="text-zinc-500">{l}</span><span className="min-w-0 truncate font-mono">{v}</span>
      <button className={btnGhost + " shrink-0 !px-3 !py-1"} onClick={() => copy(k, v)}>{copied === k ? "Copied" : "Copy"}</button>
    </div>
  );
}

export default function UnixTimestamp() {
  const [now, setNow] = useState(() => Date.now());
  const [ts, setTs] = useState(() => String(Math.floor(Date.now() / 1000)));
  const [unit, setUnit] = useState<"auto" | "s" | "ms">("auto");
  const [dt, setDt] = useState(() => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`; });
  const [utc, setUtc] = useState(false);
  const [copied, setCopied] = useState("");

  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);

  const n = Number(ts);
  const valid = ts.trim() !== "" && Number.isFinite(n);
  const isMs = unit === "ms" || (unit === "auto" && Math.abs(n) >= 1e11);
  const date = valid ? new Date(isMs ? n : n * 1000) : null;
  const ok = date && !isNaN(date.getTime());

  const d2 = dt ? new Date(utc ? dt + "Z" : dt) : null;
  const d2ok = d2 && !isNaN(d2.getTime());

  async function copy(k: string, v: string) { try { await navigator.clipboard.writeText(v); setCopied(k); setTimeout(() => setCopied(""), 1200); } catch { /* blocked */ } }
  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3">
        <div className="text-xs text-zinc-500">Current Unix time</div>
        <div className="font-mono text-2xl font-semibold text-[#2E5C8A]">{Math.floor(now / 1000)}</div>
        <div className="font-mono text-xs text-zinc-500">{now} ms</div>
      </div>
      <div>
        <h3 className="mb-2 font-medium">Timestamp to date</h3>
        <div className="flex flex-wrap items-end gap-3 text-sm text-zinc-700">
          <label className="flex flex-col gap-1">Epoch value<input className={field + " w-56 font-mono"} value={ts} onChange={(e) => setTs(e.target.value)} /></label>
          <label className="flex flex-col gap-1">Unit<select className={field + " w-auto"} value={unit} onChange={(e) => setUnit(e.target.value as typeof unit)}><option value="auto">Auto detect</option><option value="s">Seconds</option><option value="ms">Milliseconds</option></select></label>
        </div>
        {ok ? (
          <div className="mt-3 rounded-lg border border-zinc-200 bg-white">
            <Row k="utc" l="UTC" v={date.toUTCString()} copied={copied} copy={copy} /><Row k="iso" l="ISO 8601" v={date.toISOString()} copied={copied} copy={copy} /><Row k="loc" l="Your local time" v={date.toLocaleString()} copied={copied} copy={copy} /><Row k="rel" l="Relative" v={rel(date.getTime())} copied={copied} copy={copy} />
            <p className="px-3 py-2 text-xs text-zinc-500">Read as {isMs ? "milliseconds" : "seconds"}.</p>
          </div>
        ) : <p className="mt-3 text-sm text-red-600">Enter a valid number.</p>}
      </div>
      <div>
        <h3 className="mb-2 font-medium">Date to timestamp</h3>
        <div className="flex flex-wrap items-end gap-3 text-sm text-zinc-700">
          <label className="flex flex-col gap-1">Date and time<input type="datetime-local" step={1} className={field + " w-60"} value={dt} onChange={(e) => setDt(e.target.value)} /></label>
          <label className="flex items-center gap-2 pb-2"><input type="checkbox" checked={utc} onChange={(e) => setUtc(e.target.checked)} /> Treat as UTC (otherwise your local time)</label>
        </div>
        {d2ok ? <div className="mt-3 rounded-lg border border-zinc-200 bg-white"><Row k="s" l="Seconds" v={String(Math.floor(d2.getTime() / 1000))} copied={copied} copy={copy} /><Row k="ms" l="Milliseconds" v={String(d2.getTime())} copied={copied} copy={copy} /></div> : <p className="mt-3 text-sm text-red-600">Pick a date.</p>}
      </div>
    </div>
  );
}
