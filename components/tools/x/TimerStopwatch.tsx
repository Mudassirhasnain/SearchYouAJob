"use client";
import { useEffect, useRef, useState } from "react";
import { btn, btnGhost, field } from "../ui";

const two = (n: number) => String(n).padStart(2, "0");
function clock(ms: number, cs = false) {
  const t = Math.max(0, ms), s = Math.floor(t / 1000), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  return `${h ? two(h) + ":" : ""}${two(m)}:${two(s % 60)}${cs ? "." + two(Math.floor((t % 1000) / 10)) : ""}`;
}

let ctx: AudioContext | null = null;
function prime() { try { ctx = ctx ?? new AudioContext(); void ctx.resume(); } catch { /* no audio */ } }
function beep() {
  if (!ctx) return;
  for (let i = 0; i < 3; i++) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = 880; g.gain.value = 0.15; o.connect(g); g.connect(ctx.destination);
    const t = ctx.currentTime + i * 0.35; o.start(t); o.stop(t + 0.2);
  }
}

function useCountdown(onDone: () => void) {
  const [left, setLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const end = useRef(0);
  const cb = useRef(onDone);
  useEffect(() => { cb.current = onDone; });
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const r = end.current - Date.now();
      if (r <= 0) { setRunning(false); setLeft(0); cb.current(); } else setLeft(r);
    }, 100);
    return () => clearInterval(id);
  }, [running]);
  return {
    left, running,
    start(ms?: number) { const b = ms ?? left; if (b <= 0) return; prime(); end.current = Date.now() + b; setLeft(b); setRunning(true); },
    pause() { setLeft(Math.max(0, end.current - Date.now())); setRunning(false); },
    set(ms: number) { setRunning(false); setLeft(ms); },
  };
}

function useTitle(active: boolean, text: string) {
  useEffect(() => {
    if (!active) return;
    const orig = document.title;
    document.title = text;
    return () => { document.title = orig; };
  }, [active, text]);
}

function useKeys(active: boolean, map: Record<string, () => void>) {
  const ref = useRef(map);
  useEffect(() => { ref.current = map; });
  useEffect(() => {
    if (!active) return;
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (/^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(t.tagName) || e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key === " " ? "space" : e.key.toLowerCase();
      if (ref.current[k]) { e.preventDefault(); ref.current[k](); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active]);
}

function Ring({ frac, label }: { frac: number; label: string }) {
  const r = 90, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 220 220" className="mx-auto h-56 w-56" role="img" aria-label={label}>
      <circle cx="110" cy="110" r={r} fill="none" stroke="#e4e4e7" strokeWidth="10" />
      <circle cx="110" cy="110" r={r} fill="none" stroke="#2E5C8A" strokeWidth="10" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, Math.max(0, frac)))} transform="rotate(-90 110 110)" />
      <text x="110" y="118" textAnchor="middle" fontSize="34" fontFamily="ui-monospace, monospace" fill="#18181b">{label}</text>
    </svg>
  );
}

function Countdown({ active }: { active: boolean }) {
  const [h, setH] = useState(0), [m, setM] = useState(5), [s, setS] = useState(0);
  const [total, setTotal] = useState(300000);
  const [done, setDone] = useState(false);
  const cd = useCountdown(() => { setDone(true); beep(); });
  const typed = ((h * 60 + m) * 60 + s) * 1000;
  const idle = !cd.running && (cd.left === 0 || cd.left === total);
  function begin() { setDone(false); if (cd.left > 0 && cd.left < total) cd.start(); else { setTotal(typed); cd.start(typed); } }
  function preset(min: number) { setH(0); setM(min); setS(0); setTotal(min * 60000); setDone(false); cd.set(min * 60000); }
  function reset() { setDone(false); setTotal(typed); cd.set(typed); }
  useTitle(active && cd.running, `${clock(cd.left)} Timer`);
  useKeys(active, { space: () => (cd.running ? cd.pause() : begin()), r: reset });
  const field2 = (l: string, v: number, set: (n: number) => void, max: number) => <label className="flex flex-col gap-1 text-xs text-zinc-600">{l}<input type="number" min={0} max={max} disabled={cd.running} className={field + " w-20"} value={v} onChange={(e) => { set(Math.min(max, Math.max(0, +e.target.value || 0))); setDone(false); }} /></label>;
  return (
    <div className="space-y-4">
      <Ring frac={cd.left > 0 || cd.running ? cd.left / (total || 1) : 1} label={cd.left > 0 || cd.running ? clock(cd.left) : clock(typed)} />
      {done && <p className="text-center text-lg font-semibold text-[#2E5C8A]">Time is up</p>}
      <div className="flex flex-wrap items-end justify-center gap-3">{field2("Hours", h, (n) => { setH(n); }, 99)}{field2("Minutes", m, setM, 59)}{field2("Seconds", s, setS, 59)}</div>
      <div className="flex flex-wrap justify-center gap-2">{[1, 5, 10, 25].map((n) => <button key={n} className={btnGhost} onClick={() => preset(n)}>{n} min</button>)}</div>
      <div className="flex justify-center gap-2">
        {cd.running ? <button className={btn} onClick={cd.pause}>Pause</button> : <button className={btn} disabled={idle && typed === 0} onClick={begin}>{cd.left > 0 && cd.left < total ? "Resume" : "Start"}</button>}
        <button className={btnGhost} onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

function Stopwatch({ active }: { active: boolean }) {
  const [running, setRunning] = useState(false);
  const [shown, setShown] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const base = useRef(0), startAt = useRef(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setShown(base.current + Date.now() - startAt.current), 50);
    return () => clearInterval(id);
  }, [running]);
  const start = () => { startAt.current = Date.now(); setRunning(true); };
  const stop = () => { base.current += Date.now() - startAt.current; setShown(base.current); setRunning(false); };
  const lap = () => { if (running) setLaps((l) => [...l, base.current + Date.now() - startAt.current]); };
  const reset = () => { base.current = 0; setShown(0); setRunning(false); setLaps([]); };
  useTitle(active && running, `${clock(shown)} Stopwatch`);
  useKeys(active, { space: () => (running ? stop() : start()), l: lap, r: reset });
  return (
    <div className="space-y-4">
      <div className="text-center font-mono text-6xl font-semibold tabular-nums text-zinc-900">{clock(shown, true)}</div>
      <div className="flex justify-center gap-2">
        {running ? <button className={btn} onClick={stop}>Stop</button> : <button className={btn} onClick={start}>{shown > 0 ? "Resume" : "Start"}</button>}
        <button className={btnGhost} disabled={!running} onClick={lap}>Lap</button>
        <button className={btnGhost} onClick={reset}>Reset</button>
      </div>
      {laps.length > 0 && (
        <div className="max-h-56 overflow-auto rounded-lg border border-zinc-200 bg-white">
          <table className="w-full text-left text-sm"><thead className="bg-zinc-50 text-zinc-600"><tr><th className="px-3 py-2">Lap</th><th className="px-3 py-2">Split</th><th className="px-3 py-2">Total</th></tr></thead>
            <tbody>{laps.map((t, i) => <tr key={i} className="border-t border-zinc-100 font-mono"><td className="px-3 py-1">{i + 1}</td><td className="px-3 py-1">{clock(t - (laps[i - 1] ?? 0), true)}</td><td className="px-3 py-1">{clock(t, true)}</td></tr>)}</tbody></table>
        </div>
      )}
    </div>
  );
}

function Pomodoro({ active }: { active: boolean }) {
  const [work, setWork] = useState(25), [short, setShort] = useState(5), [long, setLong] = useState(15);
  const [phase, setPhase] = useState<"work" | "short" | "long">("work");
  const [cycles, setCycles] = useState(0);
  const mins = (p: typeof phase) => (p === "work" ? work : p === "short" ? short : long);
  const next = useRef<() => void>(() => undefined);
  const cd = useCountdown(() => next.current());
  useEffect(() => {
    next.current = () => {
      beep();
      let p: typeof phase = "work", c = cycles;
      if (phase === "work") { c = cycles + 1; setCycles(c); p = c % 4 === 0 ? "long" : "short"; }
      setPhase(p); cd.set(mins(p) * 60000);
    };
  });
  const total = mins(phase) * 60000;
  const shownLeft = cd.running || cd.left > 0 ? cd.left : total;
  useTitle(active && cd.running, `${clock(cd.left)} ${phase === "work" ? "Focus" : "Break"}`);
  const toggle = () => (cd.running ? cd.pause() : cd.start(cd.left > 0 ? cd.left : total));
  useKeys(active, { space: toggle });
  const reset = () => { setCycles(0); setPhase("work"); cd.set(work * 60000); };
  return (
    <div className="space-y-4">
      <p className="text-center text-sm font-medium text-zinc-700">{phase === "work" ? "Focus session" : phase === "short" ? "Short break" : "Long break"} . Completed focus sessions: {cycles}</p>
      <Ring frac={shownLeft / total} label={clock(shownLeft)} />
      <div className="flex justify-center gap-2"><button className={btn} onClick={toggle}>{cd.running ? "Pause" : "Start"}</button><button className={btnGhost} onClick={reset}>Reset</button></div>
      <div className="flex flex-wrap justify-center gap-3 text-xs text-zinc-600">
        {([["Focus (min)", work, setWork], ["Short break", short, setShort], ["Long break", long, setLong]] as const).map(([l, v, set]) => (
          <label key={l} className="flex flex-col gap-1">{l}<input type="number" min={1} max={120} disabled={cd.running} className={field + " w-24"} value={v} onChange={(e) => { set(Math.min(120, Math.max(1, +e.target.value || 1))); if (cd.left === 0) setPhase((p) => p); }} /></label>
        ))}
      </div>
      <p className="text-center text-xs text-zinc-500">A long break follows every fourth focus session.</p>
    </div>
  );
}

export default function TimerStopwatch() {
  const [tab, setTab] = useState<"timer" | "stopwatch" | "pomodoro">("timer");
  const box = useRef<HTMLDivElement>(null);
  async function full() { try { if (document.fullscreenElement) await document.exitFullscreen(); else await box.current?.requestFullscreen(); } catch { /* not allowed */ } }
  const tabs: [typeof tab, string][] = [["timer", "Timer"], ["stopwatch", "Stopwatch"], ["pomodoro", "Pomodoro"]];
  return (
    <div ref={box} className="space-y-4 bg-[#f4f4f2] p-1">
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map(([k, l]) => <button key={k} className={tab === k ? btn : btnGhost} onClick={() => setTab(k)}>{l}</button>)}
        <button className={btnGhost + " ml-auto"} onClick={full}>Full screen</button>
      </div>
      <div hidden={tab !== "timer"}><Countdown active={tab === "timer"} /></div>
      <div hidden={tab !== "stopwatch"}><Stopwatch active={tab === "stopwatch"} /></div>
      <div hidden={tab !== "pomodoro"}><Pomodoro active={tab === "pomodoro"} /></div>
      <p className="text-center text-xs text-zinc-500">Shortcuts: Space start or pause, R reset, L lap. Timers use the clock, so they stay accurate when you switch tabs.</p>
    </div>
  );
}
