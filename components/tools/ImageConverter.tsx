"use client";
import { useEffect, useState } from "react";
import { DropZone, btn, btnGhost, field, kb, loadBitmap, toCanvasBlob } from "./ui";

const FMT = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" } as const;
type Fmt = keyof typeof FMT;
type Out = { name: string; url?: string; before: number; after: number; error?: string };

export default function ImageConverter({ mode }: { mode: "convert" | "compress" }) {
  const compress = mode === "compress";
  const [files, setFiles] = useState<File[]>([]);
  const [fmt, setFmt] = useState<Fmt>("jpg");
  const [quality, setQuality] = useState(compress ? 70 : 90);
  const [maxW, setMaxW] = useState(0);
  const [out, setOut] = useState<Out[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let dead = false;
    (async () => {
      setBusy(true);
      const res: Out[] = [];
      for (const f of files) {
        try {
          const bmp = await loadBitmap(f);
          const blob = await toCanvasBlob(bmp, FMT[fmt], quality / 100, fmt === "jpg", compress ? maxW : 0);
          res.push({ name: f.name.replace(/\.[^.]+$/, "") + (compress ? "-small." : ".") + fmt, url: URL.createObjectURL(blob), before: f.size, after: blob.size });
        } catch {
          res.push({ name: f.name, before: f.size, after: 0, error: "Could not read this image" });
        }
        if (dead) return;
      }
      setOut(res);
      setBusy(false);
    })();
    return () => { dead = true; };
  }, [files, fmt, quality, maxW, compress]);

  const add = (f: File[]) => setFiles((p) => [...p, ...f.filter((x) => x.type.startsWith("image/"))]);
  const formats = (compress ? ["jpg", "webp"] : ["jpg", "png", "webp"]) as Fmt[];

  return (
    <div className="space-y-4">
      <DropZone accept="image/*" multiple label="Drop images here (JPG, PNG, WebP)" onFiles={add} />
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-700">
        <label className="flex items-center gap-2">
          Output
          <select className={field + " w-auto"} value={fmt} onChange={(e) => setFmt(e.target.value as Fmt)}>
            {formats.map((f) => <option key={f} value={f}>{f.toUpperCase()}</option>)}
          </select>
        </label>
        {fmt !== "png" && (
          <label className="flex items-center gap-2">
            Quality {quality}
            <input type="range" min={30} max={100} value={quality} onChange={(e) => setQuality(+e.target.value)} className="w-40" />
          </label>
        )}
        {compress && (
          <label className="flex items-center gap-2">
            Max width
            <select className={field + " w-auto"} value={maxW} onChange={(e) => setMaxW(+e.target.value)}>
              <option value={0}>Original</option>
              {[2400, 1600, 1200, 800].map((w) => <option key={w} value={w}>{w}px</option>)}
            </select>
          </label>
        )}
        {files.length > 0 && <button className={btnGhost} onClick={() => { setFiles([]); setOut([]); }}>Clear</button>}
      </div>
      {busy && <p className="text-sm text-zinc-500">Working...</p>}
      <ul className="space-y-2">
        {out.map((o, i) => (
          <li key={i} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm">
            <span className="min-w-0 truncate">{o.name}</span>
            {o.error ? <span className="text-red-600">{o.error}</span> : (
              <span className="flex shrink-0 items-center gap-3">
                <span className="text-zinc-500">
                  {kb(o.before)} to {kb(o.after)}
                  {compress && (o.after < o.before ? ` (${Math.round((1 - o.after / o.before) * 100)}% smaller)` : " (no smaller, try lower quality)")}
                </span>
                <a href={o.url} download={o.name} className={btnGhost}>Download</a>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
