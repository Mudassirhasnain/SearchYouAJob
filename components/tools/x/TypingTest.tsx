"use client";
import { useEffect, useRef, useState } from "react";
import { btn, btnGhost } from "../ui";

const PASSAGES = [
  "A good habit is built one small day at a time. Start with a task so small that it feels almost silly, then do it again tomorrow. Soon the habit carries you instead of the other way round.",
  "Before you send an email, read it once as if you were the person receiving it. Cut every sentence that does not help them act, and make the request clear in the first two lines.",
  "The market opens early and the street fills with the smell of fresh bread. Vendors call out their prices while customers weigh fruit in their hands and argue happily about the best deal.",
  "Learning to type quickly is not about moving your fingers faster. It is about looking at the words ahead, keeping a steady rhythm and letting your hands find the keys without thinking.",
  "When the rain finally stopped, the clouds broke apart and the evening light poured over the hills. Everyone on the bus fell quiet and watched the valley turn gold for a few minutes.",
  "A simple budget answers three questions: how much comes in, how much must go out, and what is left over. Write the numbers down once a month and you will notice patterns quickly.",
  "Good code is easy to read the next morning. Pick clear names, keep functions short and leave a note about why a strange decision was made, not just what the line does.",
  "The interview started badly, but she took a breath, smiled and answered the next question slowly. By the end, the panel was asking her about the start date.",
];

type Phase = "idle" | "running" | "done";

export default function TypingTest() {
  const [secs, setSecs] = useState(30);
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [left, setLeft] = useState(30);
  const startRef = useRef(0);
  const errRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const text = PASSAGES[idx];

  useEffect(() => {
    if (phase !== "running") return;
    const t = setInterval(() => {
      const used = Math.min(secs, (Date.now() - startRef.current) / 1000);
      setElapsed(used);
      setLeft(Math.ceil(secs - used));
      if (used >= secs) setPhase("done");
    }, 200);
    return () => clearInterval(t);
  }, [phase, secs]);

  function reset(newSecs = secs) {
    setSecs(newSecs); setLeft(newSecs); setTyped(""); setElapsed(0); setPhase("idle"); errRef.current = 0; setErrors(0);
    setIdx((i) => (i + 1 + Math.floor(Math.random() * (PASSAGES.length - 1))) % PASSAGES.length);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function onChange(v: string) {
    if (phase === "done") return;
    if (phase === "idle" && v.length) { startRef.current = Date.now(); setPhase("running"); }
    if (v.length > typed.length && v[v.length - 1] !== text[v.length - 1]) { errRef.current += 1; setErrors(errRef.current); }
    setTyped(v.slice(0, text.length));
    if (v.length >= text.length) { setElapsed(Math.min(secs, (Date.now() - startRef.current) / 1000)); setPhase("done"); }
  }

  const correct = [...typed].filter((c, i) => c === text[i]).length;
  const minutes = Math.max(elapsed, 1) / 60;
  const gross = Math.round(typed.length / 5 / minutes);
  const net = Math.max(0, Math.round(correct / 5 / minutes));
  const acc = typed.length ? Math.round((correct / typed.length) * 100) : 100;

  return (
    <div className="space-y-4" onClick={() => inputRef.current?.focus()}>
      <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-700">
        {[15, 30, 60].map((s) => (
          <button key={s} className={secs === s ? btn : btnGhost} onClick={() => reset(s)}>{s} sec</button>
        ))}
        <span className="ml-auto text-lg font-semibold tabular-nums text-zinc-900" aria-live="off">{left}s</span>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-4 font-mono text-lg leading-relaxed">
        {[...text].map((c, i) => {
          const state = i < typed.length ? (typed[i] === c ? "text-emerald-700" : "bg-red-100 text-red-700") : i === typed.length ? "bg-[#EAF1FD] text-zinc-900" : "text-zinc-400";
          return <span key={i} className={state}>{c}</span>;
        })}
      </div>
      <input
        ref={inputRef} className="sr-only" aria-label="Type the passage here" value={typed} autoFocus
        onChange={(e) => onChange(e.target.value)} onPaste={(e) => e.preventDefault()} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
      />
      <p className="text-sm text-zinc-500">{phase === "idle" ? "Click the text and start typing. The timer starts on your first key." : phase === "running" ? "Keep going." : "Finished."}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[["Net WPM", net], ["Gross WPM", gross], ["Accuracy", acc + "%"], ["Mistakes", errors]].map(([l, v]) => (
          <div key={l} className="rounded-lg border border-zinc-200 bg-white px-3 py-2"><div className="text-xl font-semibold">{v}</div><div className="text-xs text-zinc-500">{l}</div></div>
        ))}
      </div>
      <button className={btn} onClick={() => reset()}>{phase === "done" ? "Try again" : "New passage"}</button>
    </div>
  );
}
