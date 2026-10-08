"use client";
import { useState } from "react";
import { imagesToPdf } from "@/lib/pdf";
import { DropZone, btn, btnGhost, kb, loadBitmap, toCanvasBlob } from "./ui";

export default function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const add = (f: File[]) => { setFiles((p) => [...p, ...f.filter((x) => x.type.startsWith("image/"))]); setUrl(null); };
  const move = (i: number, d: number) =>
    setFiles((p) => { const n = [...p]; const j = i + d; if (j < 0 || j >= n.length) return p; [n[i], n[j]] = [n[j], n[i]]; return n; });

  async function make() {
    setBusy(true); setErr("");
    try {
      const pages = [];
      for (const f of files) {
        const bmp = await loadBitmap(f);
        const blob = await toCanvasBlob(bmp, "image/jpeg", 0.92, true);
        pages.push({ data: new Uint8Array(await blob.arrayBuffer()), w: bmp.width, h: bmp.height });
      }
      setUrl(URL.createObjectURL(imagesToPdf(pages)));
    } catch {
      setErr("One of the images could not be read. Remove it and try again.");
    }
    setBusy(false);
  }

  return (
    <div className="space-y-4">
      <DropZone accept="image/png,image/jpeg,image/webp" multiple label="Drop JPG, PNG or WebP images here" onFiles={add} />
      <ol className="space-y-2">
        {files.map((f, i) => (
          <li key={i} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm">
            <span className="min-w-0 truncate">Page {i + 1}: {f.name} <span className="text-zinc-500">({kb(f.size)})</span></span>
            <span className="flex shrink-0 gap-2">
              <button className={btnGhost} onClick={() => move(i, -1)} aria-label="Move up">Up</button>
              <button className={btnGhost} onClick={() => move(i, 1)} aria-label="Move down">Down</button>
              <button className={btnGhost} onClick={() => { setFiles((p) => p.filter((_, k) => k !== i)); setUrl(null); }}>Remove</button>
            </span>
          </li>
        ))}
      </ol>
      {err && <p className="text-sm text-red-600">{err}</p>}
      <div className="flex flex-wrap items-center gap-3">
        <button className={btn} disabled={!files.length || busy} onClick={make}>{busy ? "Creating..." : "Create PDF"}</button>
        {url && <a href={url} download="images.pdf" className={btn}>Download PDF</a>}
      </div>
    </div>
  );
}
