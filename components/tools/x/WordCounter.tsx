"use client";
import { useMemo, useState } from "react";
import { field } from "../ui";

const STOP = new Set("a an and are as at be but by for from has have he her his i in is it its of on or she that the their they this to was we were will with you your not so if do does did can could would should than then there these those which who what when where how about into over our us me my him them".split(" "));
const LIMITS = [
  { label: "X / Twitter post", n: 280 },
  { label: "SEO title", n: 60 },
  { label: "Meta description", n: 160 },
  { label: "SMS (single)", n: 160 },
  { label: "Instagram caption", n: 2200 },
];

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2">
      <div className="text-xl font-semibold text-zinc-900">{value}</div>
      <div className="text-xs text-zinc-500">{label}</div>
    </div>
  );
}

function mins(m: number) {
  if (m < 1 / 60 * 30) return m === 0 ? "0 sec" : "under 1 sec";
  if (m < 1) return Math.round(m * 60) + " sec";
  return Math.floor(m) + " min " + Math.round((m % 1) * 60) + " sec";
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const s = useMemo(() => {
    const ws = text.match(/[^\s]+/g) ?? [];
    const sentences = text.split(/[.!?]+(?:\s|$)/).filter((x) => x.trim()).length;
    const paras = text.split(/\n\s*\n/).filter((x) => x.trim()).length;
    const freq = new Map<string, number>();
    for (const w of ws.map((x) => x.toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9']+$/g, "")).filter((x) => x.length > 2 && !STOP.has(x))) freq.set(w, (freq.get(w) ?? 0) + 1);
    const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    return { words: ws.length, chars: text.length, noSpaces: text.replace(/\s/g, "").length, sentences, paras, top, avg: sentences ? (ws.length / sentences).toFixed(1) : "0" };
  }, [text]);

  return (
    <div className="space-y-4">
      <textarea className={field + " h-60"} aria-label="Text to count" placeholder="Type or paste your text here" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Words" value={s.words} />
        <Stat label="Characters" value={s.chars} />
        <Stat label="No spaces" value={s.noSpaces} />
        <Stat label="Sentences" value={s.sentences} />
        <Stat label="Paragraphs" value={s.paras} />
        <Stat label="Reading time" value={mins(s.words / 225)} />
        <Stat label="Speaking time" value={mins(s.words / 130)} />
        <Stat label="Words per sentence" value={s.avg} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 bg-white p-3">
          <p className="mb-2 text-sm font-medium text-zinc-700">Character limits</p>
          <ul className="space-y-1 text-sm">
            {LIMITS.map((l) => (
              <li key={l.label} className="flex justify-between">
                <span className="text-zinc-600">{l.label}</span>
                <span className={s.chars > l.n ? "font-medium text-red-600" : "text-zinc-800"}>{s.chars} / {l.n}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-3">
          <p className="mb-2 text-sm font-medium text-zinc-700">Top keywords</p>
          {s.top.length === 0 ? <p className="text-sm text-zinc-500">Keywords appear as you type.</p> : (
            <ul className="space-y-1 text-sm">
              {s.top.map(([w, n]) => (
                <li key={w} className="flex justify-between"><span>{w}</span><span className="text-zinc-600">{n} ({((n / Math.max(s.words, 1)) * 100).toFixed(1)}%)</span></li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
