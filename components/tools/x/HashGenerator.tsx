"use client";
import { useEffect, useState } from "react";
import { btnGhost, field } from "../ui";
import { md5 } from "./md5";

const ALGOS = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;
const hexOf = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");

async function digestAll(bytes: Uint8Array) {
  const out: Record<string, string> = { MD5: md5(bytes) };
  const copy = new Uint8Array(bytes).buffer as ArrayBuffer;
  for (const a of ALGOS.slice(1)) out[a] = hexOf(await crypto.subtle.digest(a, copy));
  return out;
}

export default function HashGenerator() {
  const [text, setText] = useState("hello world");
  const [file, setFile] = useState<File | null>(null);
  const [res, setRes] = useState<Record<string, string>>({});
  const [upper, setUpper] = useState(false);
  const [cmp, setCmp] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    let dead = false;
    (async () => {
      const bytes = file ? new Uint8Array(await file.arrayBuffer()) : new TextEncoder().encode(text);
      const r = await digestAll(bytes);
      if (!dead) setRes(r);
    })().catch(() => undefined);
    return () => { dead = true; };
  }, [text, file]);

  const fmt = (h: string) => (upper ? h.toUpperCase() : h);
  const c = cmp.trim().toLowerCase().replace(/\s/g, "");
  const match = c ? ALGOS.find((a) => res[a] === c) : undefined;
  async function copy(k: string, v: string) { try { await navigator.clipboard.writeText(v); setCopied(k); setTimeout(() => setCopied(""), 1200); } catch { /* blocked */ } }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="hg-text" className="mb-1 block text-sm font-medium text-zinc-700">Text to hash (UTF-8)</label>
        <textarea id="hg-text" className={field + " h-28 font-mono"} value={text} disabled={!!file} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-700">
        <label className="cursor-pointer text-[#2E5C8A] underline">Or hash a file<input type="file" className="hidden" onChange={(e) => { setFile(e.target.files?.[0] ?? null); e.target.value = ""; }} /></label>
        {file && <span>{file.name} ({file.size.toLocaleString()} bytes) <button className={btnGhost + " !px-3 !py-1"} onClick={() => setFile(null)}>Use text instead</button></span>}
        <label className="ml-auto flex items-center gap-2"><input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} /> Uppercase hex</label>
      </div>
      <div className="rounded-lg border border-zinc-200 bg-white">
        {ALGOS.map((a) => (
          <div key={a} className="flex items-center gap-3 border-b border-zinc-100 px-3 py-2 text-sm last:border-0">
            <span className="w-16 shrink-0 font-medium text-zinc-600">{a}</span>
            <span className="min-w-0 flex-1 break-all font-mono text-xs">{res[a] ? fmt(res[a]) : "..."}</span>
            <button className={btnGhost + " shrink-0 !px-3 !py-1"} onClick={() => copy(a, fmt(res[a] ?? ""))}>{copied === a ? "Copied" : "Copy"}</button>
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="hg-cmp" className="mb-1 block text-sm font-medium text-zinc-700">Compare with a published checksum</label>
        <input id="hg-cmp" className={field + " font-mono"} placeholder="Paste the expected hash here" value={cmp} onChange={(e) => setCmp(e.target.value)} />
        {c && <p className={"mt-2 text-sm font-medium " + (match ? "text-emerald-700" : "text-red-600")}>{match ? `Match: equals the ${match} hash.` : "No match with any hash above."}</p>}
      </div>
      <p className="text-xs text-zinc-500">MD5 and SHA-1 are fine for spotting accidental file corruption but are not secure against deliberate tampering. Hashing is one way and is not encryption.</p>
    </div>
  );
}
