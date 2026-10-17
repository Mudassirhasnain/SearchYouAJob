"use client";
import { useEffect, useRef, useState } from "react";
import { btn, btnGhost, field } from "../ui";
import { ZONES } from "./tz";

const ROMAN = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
const STYLES = {
  light: { face: "#ffffff", rim: "#27272a", tick: "#27272a", hand: "#18181b", sec: "#dc2626", text: "#18181b" },
  dark: { face: "#18181b", rim: "#a1a1aa", tick: "#d4d4d8", hand: "#fafafa", sec: "#f87171", text: "#fafafa" },
  minimal: { face: "#f4f4f5", rim: "#d4d4d8", tick: "#71717a", hand: "#3f3f46", sec: "#2E5C8A", text: "#3f3f46" },
} as const;
type StyleKey = keyof typeof STYLES;

function zoneTime(date: Date, zone: string) {
  const p = new Intl.DateTimeFormat("en-US", { timeZone: zone, hourCycle: "h23", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(date);
  const g = (t: string) => Number(p.find((x) => x.type === t)?.value ?? 0);
  return { h: g("hour") % 24, m: g("minute"), s: g("second") };
}

function Face({ h, m, s, style, numerals, seconds }: { h: number; m: number; s: number; style: StyleKey; numerals: "arabic" | "roman" | "none"; seconds: boolean }) {
  const c = STYLES[style];
  const hourAngle = ((h % 12) + m / 60) * 30, minAngle = (m + s / 60) * 6, secAngle = s * 6;
  return (
    <svg viewBox="0 0 200 200" className="mx-auto w-full max-w-sm" role="img" aria-label={`Analogue clock showing ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`}>
      <circle cx="100" cy="100" r="96" fill={c.face} stroke={c.rim} strokeWidth="4" />
      {Array.from({ length: 60 }, (_, i) => { const big = i % 5 === 0; return <line key={i} x1="100" y1={big ? 10 : 12} x2="100" y2={big ? 20 : 16} stroke={c.tick} strokeWidth={big ? 2.5 : 1} transform={`rotate(${i * 6} 100 100)`} />; })}
      {numerals !== "none" && Array.from({ length: 12 }, (_, i) => { const a = (i * 30 * Math.PI) / 180; return <text key={i} x={100 + 72 * Math.sin(a)} y={100 - 72 * Math.cos(a) + 5} textAnchor="middle" fontSize={numerals === "roman" ? 12 : 15} fontFamily="Georgia, serif" fill={c.text}>{numerals === "roman" ? ROMAN[i] : i === 0 ? 12 : i}</text>; })}
      <line x1="100" y1="100" x2="100" y2="56" stroke={c.hand} strokeWidth="5" strokeLinecap="round" transform={`rotate(${hourAngle} 100 100)`} />
      <line x1="100" y1="100" x2="100" y2="28" stroke={c.hand} strokeWidth="3.5" strokeLinecap="round" transform={`rotate(${minAngle} 100 100)`} />
      {seconds && <line x1="100" y1="112" x2="100" y2="22" stroke={c.sec} strokeWidth="1.5" strokeLinecap="round" transform={`rotate(${secAngle} 100 100)`} />}
      <circle cx="100" cy="100" r="4.5" fill={seconds ? c.sec : c.hand} />
    </svg>
  );
}

export default function AnalogueClock() {
  const browser = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zones = ZONES.some((z) => z.id === browser) ? ZONES : [{ id: browser, label: browser + " (your time zone)" }, ...ZONES];
  const [now, setNow] = useState(() => new Date());
  const [zone, setZone] = useState(browser);
  const [style, setStyle] = useState<StyleKey>("light");
  const [numerals, setNumerals] = useState<"arabic" | "roman" | "none">("arabic");
  const [digital, setDigital] = useState(true);
  const [seconds, setSeconds] = useState(true);
  const [practice, setPractice] = useState(false);
  const [q, setQ] = useState({ h: 3, m: 45 });
  const [answer, setAnswer] = useState("");
  const [fb, setFb] = useState<{ ok: boolean; text: string } | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => { const id = setInterval(() => setNow(new Date()), 250); return () => clearInterval(id); }, []);

  const t = zoneTime(now, zone);
  const two = (n: number) => String(n).padStart(2, "0");

  function newQ() { setQ({ h: 1 + Math.floor(Math.random() * 12), m: 5 * Math.floor(Math.random() * 12) }); setAnswer(""); setFb(null); }
  function check() {
    const mm = /^(\d{1,2})[:.]?(\d{2})$/.exec(answer.trim());
    if (!mm) { setFb({ ok: false, text: "Type the time like 3:45." }); return; }
    const ok = +mm[1] === q.h && +mm[2] === q.m;
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1 }));
    setFb({ ok, text: ok ? "Correct!" : `Not quite. The clock shows ${q.h}:${two(q.m)}.` });
  }
  async function full() { try { if (document.fullscreenElement) await document.exitFullscreen(); else await box.current?.requestFullscreen(); } catch { /* not allowed */ } }

  const sel = "flex flex-col gap-1 text-sm text-zinc-700";
  return (
    <div ref={box} className="space-y-4 bg-[#f4f4f2] p-1">
      <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
        <div className="flex gap-2"><button className={!practice ? btn : btnGhost} onClick={() => setPractice(false)}>Clock</button><button className={practice ? btn : btnGhost} onClick={() => { setPractice(true); newQ(); }}>Practice reading time</button></div>
        <button className={btnGhost + " ml-auto"} onClick={full}>Full screen</button>
      </div>
      {!practice && (
        <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
          <label className={sel}>Time zone<select className={field + " w-auto"} value={zone} onChange={(e) => setZone(e.target.value)}>{zones.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}</select></label>
          <label className={sel}>Style<select className={field + " w-auto"} value={style} onChange={(e) => setStyle(e.target.value as StyleKey)}><option value="light">Light</option><option value="dark">Dark</option><option value="minimal">Minimal</option></select></label>
          <label className={sel}>Numerals<select className={field + " w-auto"} value={numerals} onChange={(e) => setNumerals(e.target.value as typeof numerals)}><option value="arabic">1 2 3</option><option value="roman">I II III</option><option value="none">None</option></select></label>
          <label className="flex items-center gap-2 pb-2 text-sm text-zinc-700"><input type="checkbox" checked={seconds} onChange={(e) => setSeconds(e.target.checked)} /> Seconds hand</label>
          <label className="flex items-center gap-2 pb-2 text-sm text-zinc-700"><input type="checkbox" checked={digital} onChange={(e) => setDigital(e.target.checked)} /> Digital time</label>
        </div>
      )}
      {practice ? (
        <>
          <Face h={q.h} m={q.m} s={0} style={style} numerals={numerals === "none" ? "arabic" : numerals} seconds={false} />
          <div className="flex flex-wrap items-end justify-center gap-2">
            <label className={sel}>What time is it?<input className={field + " w-32"} placeholder="e.g. 3:45" value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") check(); }} /></label>
            <button className={btn} onClick={check}>Check</button><button className={btnGhost} onClick={newQ}>New time</button>
          </div>
          {fb && <p className={"text-center text-sm font-medium " + (fb.ok ? "text-emerald-700" : "text-red-600")}>{fb.text}</p>}
          <p className="text-center text-sm text-zinc-600">Score: {score.right} of {score.total}</p>
        </>
      ) : (
        <>
          <Face h={t.h} m={t.m} s={t.s} style={style} numerals={numerals} seconds={seconds} />
          {digital && <p className="text-center font-mono text-3xl font-semibold text-zinc-900">{two(t.h)}:{two(t.m)}{seconds ? ":" + two(t.s) : ""}</p>}
          <p className="text-center text-sm text-zinc-600">{zones.find((z) => z.id === zone)?.label ?? zone}</p>
        </>
      )}
    </div>
  );
}
