"use client";
import { useRef, useState } from "react";

export const btn =
  "inline-flex items-center justify-center rounded-full bg-[#2E5C8A] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#244a70] disabled:opacity-50";
export const btnGhost =
  "inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50";
export const field =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-[#69ABF7] focus:ring-2 focus:ring-[#69ABF7]/30";

export function kb(n: number) {
  return n > 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(n / 1024)) + " KB";
}

export function DropZone({ accept, multiple, label, onFiles }: { accept: string; multiple?: boolean; label: string; onFiles: (f: File[]) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); onFiles(Array.from(e.dataTransfer.files)); }}
      className={`rounded-xl border-2 border-dashed px-4 py-10 text-center ${over ? "border-[#69ABF7] bg-[#EAF1FD]" : "border-zinc-300 bg-white"}`}
    >
      <p className="mb-3 text-sm text-zinc-600">{label}</p>
      <button type="button" className={btn} onClick={() => ref.current?.click()}>Choose {multiple ? "files" : "a file"}</button>
      <input
        ref={ref} type="file" accept={accept} multiple={multiple} className="hidden"
        onChange={(e) => { onFiles(Array.from(e.target.files ?? [])); e.target.value = ""; }}
      />
    </div>
  );
}

export function loadBitmap(file: File) {
  return createImageBitmap(file);
}

export function toCanvasBlob(bmp: ImageBitmap, type: string, q: number, white: boolean, maxW = 0) {
  const k = maxW && bmp.width > maxW ? maxW / bmp.width : 1;
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  const ctx = c.getContext("2d")!;
  if (white) { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height); }
  ctx.drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("Conversion failed"))), type, q));
}
