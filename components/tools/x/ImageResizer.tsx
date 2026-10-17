"use client";
import { useState } from "react";
import { DropZone, btn, btnGhost, field, kb } from "../ui";

const FMT = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" } as const;
type Fmt = keyof typeof FMT;
type Item = { file: File; w: number; h: number };
type Out = { name: string; url?: string; before: number; after: number; dims: string; error?: string };

function encode(c: HTMLCanvasElement, type: string, q: number) {
  return new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("encode failed"))), type, q));
}

export default function ImageResizer() {
  const [items, setItems] = useState<Item[]>([]);
  const [mode, setMode] = useState<"px" | "pct">("px");
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(800);
  const [lock, setLock] = useState(true);
  const [pct, setPct] = useState(50);
  const [fmt, setFmt] = useState<Fmt>("jpg");
  const [quality, setQuality] = useState(85);
  const [maxKb, setMaxKb] = useState(0);
  const [out, setOut] = useState<Out[]>([]);
  const [busy, setBusy] = useState(false);

  async function add(files: File[]) {
    const imgs = files.filter((f) => f.type.startsWith("image/"));
    const next: Item[] = [];
    for (const file of imgs) {
      try {
        const b = await createImageBitmap(file);
        next.push({ file, w: b.width, h: b.height });
        b.close();
      } catch { /* skip unreadable */ }
    }
    if (!next.length) return;
    if (items.length === 0) { setWidth(next[0].w); setHeight(next[0].h); }
    setItems((p) => [...p, ...next]);
  }

  function changeWidth(v: number) {
    setWidth(v);
    if (lock && items[0]) setHeight(Math.max(1, Math.round((items[0].h * v) / items[0].w)));
  }
  function changeHeight(v: number) {
    setHeight(v);
    if (lock && items[0]) setWidth(Math.max(1, Math.round((items[0].w * v) / items[0].h)));
  }

  async function run() {
    setBusy(true);
    out.forEach((o) => o.url && URL.revokeObjectURL(o.url));
    const res: Out[] = [];
    for (const it of items) {
      try {
        const bmp = await createImageBitmap(it.file);
        let tw: number, th: number;
        if (mode === "pct") { tw = Math.round((bmp.width * pct) / 100); th = Math.round((bmp.height * pct) / 100); }
        else if (lock) { tw = width; th = Math.round((bmp.height * width) / bmp.width); }
        else { tw = width; th = height; }
        tw = Math.min(Math.max(1, tw), 16000); th = Math.min(Math.max(1, th), 16000);
        const c = document.createElement("canvas");
        c.width = tw; c.height = th;
        const ctx = c.getContext("2d")!;
        if (fmt === "jpg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, tw, th); }
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(bmp, 0, 0, tw, th);
        bmp.close();
        let blob = await encode(c, FMT[fmt], quality / 100);
        if (maxKb > 0 && fmt !== "png" && blob.size > maxKb * 1024) {
          let lo = 0.1, hi = quality / 100;
          for (let i = 0; i < 7; i++) {
            const mid = (lo + hi) / 2;
            const b = await encode(c, FMT[fmt], mid);
            if (b.size <= maxKb * 1024) { blob = b; lo = mid; } else hi = mid;
          }
        }
        res.push({ name: it.file.name.replace(/\.[^.]+$/, "") + `-${tw}x${th}.` + fmt, url: URL.createObjectURL(blob), before: it.file.size, after: blob.size, dims: `${tw} x ${th}` });
      } catch {
        res.push({ name: it.file.name, before: it.file.size, after: 0, dims: "", error: "Could not read this image" });
      }
    }
    setOut(res);
    setBusy(false);
  }

  return (
    <div className="space-y-4">
      <DropZone accept="image/*" multiple label="Drop images here (JPG, PNG, WebP)" onFiles={add} />
      {items.length > 0 && <p className="text-sm text-zinc-600">{items.length} image{items.length > 1 ? "s" : ""} added. First image: {items[0].w} x {items[0].h} px.</p>}
      <div className="flex flex-wrap items-end gap-x-5 gap-y-3 text-sm text-zinc-700">
        <label className="flex flex-col gap-1">Resize by
          <select className={field + " w-auto"} value={mode} onChange={(e) => setMode(e.target.value as "px" | "pct")}>
            <option value="px">Pixels</option><option value="pct">Percentage</option>
          </select>
        </label>
        {mode === "px" ? (
          <>
            <label className="flex flex-col gap-1">Width (px)
              <input type="number" min={1} className={field + " w-28"} value={width} onChange={(e) => changeWidth(+e.target.value)} />
            </label>
            <label className="flex flex-col gap-1">Height (px)
              <input type="number" min={1} className={field + " w-28"} value={height} disabled={lock && items.length > 1} onChange={(e) => changeHeight(+e.target.value)} />
            </label>
            <label className="flex items-center gap-2 pb-2"><input type="checkbox" checked={lock} onChange={(e) => setLock(e.target.checked)} /> Keep aspect ratio</label>
          </>
        ) : (
          <label className="flex flex-col gap-1">Scale (%)
            <input type="number" min={1} max={500} className={field + " w-28"} value={pct} onChange={(e) => setPct(+e.target.value)} />
          </label>
        )}
        <label className="flex flex-col gap-1">Format
          <select className={field + " w-auto"} value={fmt} onChange={(e) => setFmt(e.target.value as Fmt)}>
            <option value="jpg">JPG</option><option value="png">PNG</option><option value="webp">WebP</option>
          </select>
        </label>
        {fmt !== "png" && (
          <>
            <label className="flex flex-col gap-1">Quality {quality}
              <input type="range" min={30} max={100} value={quality} onChange={(e) => setQuality(+e.target.value)} className="w-36" />
            </label>
            <label className="flex flex-col gap-1">Max size (KB, optional)
              <input type="number" min={0} className={field + " w-32"} value={maxKb || ""} placeholder="No limit" onChange={(e) => setMaxKb(+e.target.value || 0)} />
            </label>
          </>
        )}
      </div>
      <div className="flex gap-2">
        <button className={btn} disabled={!items.length || busy} onClick={run}>{busy ? "Working..." : "Resize images"}</button>
        {items.length > 0 && <button className={btnGhost} onClick={() => { out.forEach((o) => o.url && URL.revokeObjectURL(o.url)); setItems([]); setOut([]); }}>Clear</button>}
      </div>
      <ul className="space-y-2">
        {out.map((o, i) => (
          <li key={i} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm">
            <span className="min-w-0 truncate">{o.name}</span>
            {o.error ? <span className="text-red-600">{o.error}</span> : (
              <span className="flex shrink-0 items-center gap-3">
                <span className="text-zinc-500">{o.dims} px, {kb(o.before)} to {kb(o.after)}</span>
                <a href={o.url} download={o.name} className={btnGhost}>Download</a>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
