"use client";
import { useMemo, useState } from "react";
import { btn, btnGhost, field } from "../ui";

type J = string | number | boolean | null | J[] | { [k: string]: J };

function sortKeys(v: J): J {
  if (Array.isArray(v)) return v.map(sortKeys);
  if (v && typeof v === "object") return Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeys(v[k])]));
  return v;
}

function errInfo(src: string, e: unknown) {
  const msg = e instanceof Error ? e.message : "Invalid JSON";
  const pos = /position (\d+)/.exec(msg);
  const lc = /line (\d+) column (\d+)/.exec(msg);
  if (lc) return `${msg}`;
  if (pos) {
    const p = +pos[1];
    const before = src.slice(0, p).split("\n");
    return `${msg} (line ${before.length}, column ${before[before.length - 1].length + 1})`;
  }
  return msg;
}

function Node({ k, v, depth }: { k?: string; v: J; depth: number }) {
  const key = k !== undefined ? <span className="text-[#2E5C8A]">&quot;{k}&quot;: </span> : null;
  if (v === null || typeof v !== "object") {
    const cls = typeof v === "string" ? "text-emerald-700" : typeof v === "number" ? "text-orange-700" : "text-purple-700";
    return <div className="pl-4 font-mono text-xs">{key}<span className={cls}>{typeof v === "string" ? JSON.stringify(v) : String(v)}</span></div>;
  }
  const arr = Array.isArray(v);
  const entries = arr ? v.map((x, i) => [String(i), x] as const) : Object.entries(v);
  return (
    <details open={depth < 2} className="pl-4 font-mono text-xs">
      <summary className="cursor-pointer">{key}<span className="text-zinc-500">{arr ? `[ ${entries.length} items ]` : `{ ${entries.length} keys }`}</span></summary>
      {entries.map(([ek, ev]) => <Node key={ek} k={arr ? undefined : ek} v={ev as J} depth={depth + 1} />)}
    </details>
  );
}

export default function JsonFormatter() {
  const [src, setSrc] = useState('{"name":"SearchYouAJob","tools":38,"free":true,"tags":["resume","pdf","json"],"owner":{"country":"PK","active":null}}');
  const [out, setOut] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [indent, setIndent] = useState("2");
  const [sort, setSort] = useState(false);
  const [note, setNote] = useState("");

  const parsed = useMemo(() => { try { return { v: JSON.parse(src) as J, e: "" }; } catch (e) { return { v: undefined, e: src.trim() ? errInfo(src, e) : "" }; } }, [src]);

  function run(kind: "format" | "minify") {
    setNote("");
    try {
      let v = JSON.parse(src) as J;
      if (sort) v = sortKeys(v);
      setOut(kind === "minify" ? JSON.stringify(v) : JSON.stringify(v, null, indent === "tab" ? "\t" : +indent));
      setMsg({ ok: true, text: "Valid JSON." });
    } catch (e) { setOut(""); setMsg({ ok: false, text: errInfo(src, e) }); }
  }
  function repair() {
    let t = src; const did: string[] = [];
    const noTrail = t.replace(/,(\s*[}\]])/g, "$1");
    if (noTrail !== t) { t = noTrail; did.push("removed trailing commas"); }
    if (!t.includes('"') && t.includes("'")) { t = t.replace(/'/g, '"'); did.push("changed single quotes to double quotes"); }
    setSrc(t);
    setNote(did.length ? "Repair: " + did.join(" and ") + "." : "Nothing this tool can repair automatically. Check brackets, quotes and commas by hand.");
  }
  async function copy() { try { await navigator.clipboard.writeText(out); } catch { /* blocked */ } }
  function download() {
    const url = URL.createObjectURL(new Blob([out], { type: "application/json" }));
    const a = document.createElement("a"); a.href = url; a.download = "data.json"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  const size = (s: string) => new Blob([s]).size.toLocaleString();

  return (
    <div className="space-y-4">
      <textarea className={field + " h-56 font-mono text-xs"} aria-label="JSON input" spellCheck={false} value={src} onChange={(e) => setSrc(e.target.value)} />
      <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-700">
        <button className={btn} onClick={() => run("format")}>Format</button>
        <button className={btnGhost} onClick={() => run("minify")}>Minify</button>
        <button className={btnGhost} onClick={repair}>Try simple repair</button>
        <label className="flex items-center gap-2">Indent<select className={field + " w-auto"} value={indent} onChange={(e) => setIndent(e.target.value)}><option value="2">2 spaces</option><option value="4">4 spaces</option><option value="tab">Tab</option></select></label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={sort} onChange={(e) => setSort(e.target.checked)} /> Sort keys</label>
      </div>
      {parsed.e ? <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">Invalid JSON: {parsed.e}</p> : src.trim() ? <p className="text-sm text-emerald-700">Valid JSON. Input size {size(src)} bytes.</p> : null}
      {msg && !msg.ok && !parsed.e && <p className="text-sm text-red-600">{msg.text}</p>}
      {note && <p className="text-sm text-zinc-600">{note}</p>}
      {out && (
        <div className="space-y-2">
          <textarea readOnly className={field + " h-56 font-mono text-xs"} aria-label="JSON output" value={out} />
          <div className="flex items-center gap-2 text-sm text-zinc-600"><button className={btn} onClick={copy}>Copy</button><button className={btnGhost} onClick={download}>Download .json</button>Output size {size(out)} bytes</div>
        </div>
      )}
      {parsed.v !== undefined && (
        <div className="max-h-80 overflow-auto rounded-lg border border-zinc-200 bg-white p-3">
          <p className="mb-2 text-sm font-medium text-zinc-700">Tree view</p>
          <Node v={sort ? sortKeys(parsed.v) : parsed.v} depth={0} />
        </div>
      )}
    </div>
  );
}
