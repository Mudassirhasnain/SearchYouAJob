"use client";
import { useState } from "react";
import { DropZone, btn, btnGhost, kb } from "../ui";

type Info = { exif: boolean; gps: boolean; camera: string };
type Row = { name: string; before: number; after: number; url: string; info: Info | null };

function readAscii(v: DataView, off: number, len: number) {
  let s = "";
  for (let i = 0; i < len && off + i < v.byteLength; i++) { const c = v.getUint8(off + i); if (!c) break; s += String.fromCharCode(c); }
  return s.trim();
}

// Minimal JPEG EXIF reader: finds the APP1 Exif block, then looks at IFD0 for Make, Model and the GPS pointer.
function inspect(buf: ArrayBuffer): Info {
  const v = new DataView(buf);
  const none: Info = { exif: false, gps: false, camera: "" };
  if (v.byteLength < 4 || v.getUint16(0) !== 0xffd8) return none;
  let p = 2;
  while (p + 4 < v.byteLength) {
    if (v.getUint8(p) !== 0xff) break;
    const marker = v.getUint8(p + 1);
    const len = v.getUint16(p + 2);
    if (marker === 0xe1 && readAscii(v, p + 4, 4) === "Exif") {
      const t = p + 10;
      const le = v.getUint16(t) === 0x4949;
      const g16 = (o: number) => v.getUint16(o, le);
      const g32 = (o: number) => v.getUint32(o, le);
      try {
        const ifd = t + g32(t + 4);
        const n = g16(ifd);
        let make = "", model = "", gps = false;
        for (let i = 0; i < n; i++) {
          const e = ifd + 2 + i * 12;
          const tag = g16(e);
          const count = g32(e + 4);
          const valOff = count > 4 ? t + g32(e + 8) : e + 8;
          if (tag === 0x010f) make = readAscii(v, valOff, count);
          if (tag === 0x0110) model = readAscii(v, valOff, count);
          if (tag === 0x8825) gps = true;
        }
        return { exif: true, gps, camera: [make, model].filter(Boolean).join(" ") };
      } catch { return { exif: true, gps: false, camera: "" }; }
    }
    if (marker === 0xda) break;
    p += 2 + len;
  }
  return none;
}

export default function ExifRemover() {
  const [rows, setRows] = useState<Row[]>([]);
  const [busy, setBusy] = useState(false);

  async function add(files: File[]) {
    setBusy(true);
    const next: Row[] = [];
    for (const f of files.filter((x) => x.type.startsWith("image/"))) {
      try {
        const info = f.type === "image/jpeg" ? inspect(await f.arrayBuffer()) : null;
        const bmp = await createImageBitmap(f, { imageOrientation: "from-image" });
        const c = document.createElement("canvas");
        c.width = bmp.width; c.height = bmp.height;
        const ctx = c.getContext("2d")!;
        const type = f.type === "image/png" ? "image/png" : f.type === "image/webp" ? "image/webp" : "image/jpeg";
        if (type === "image/jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height); }
        ctx.drawImage(bmp, 0, 0);
        bmp.close();
        const blob = await new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("fail"))), type, 0.95));
        const ext = type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
        next.push({ name: f.name.replace(/\.[^.]+$/, "") + "-clean." + ext, before: f.size, after: blob.size, url: URL.createObjectURL(blob), info });
      } catch { /* skip unreadable file */ }
    }
    setRows((p) => [...p, ...next]);
    setBusy(false);
  }

  return (
    <div className="space-y-4">
      <DropZone accept="image/*" multiple label="Drop photos here to strip location and camera data" onFiles={add} />
      {busy && <p className="text-sm text-zinc-500">Working...</p>}
      <ul className="space-y-2">
        {rows.map((r, i) => (
          <li key={i} className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="min-w-0 truncate font-medium">{r.name}</span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="text-zinc-500">{kb(r.before)} to {kb(r.after)}</span>
                <a href={r.url} download={r.name} className={btn}>Download</a>
              </span>
            </div>
            <p className="mt-1 text-zinc-600">
              {r.info === null ? "Metadata removed. This format was not scanned before cleaning." :
                r.info.exif ? `Original had EXIF data${r.info.gps ? " including GPS location" : " (no GPS found)"}${r.info.camera ? `, camera: ${r.info.camera}` : ""}. The cleaned copy has none.` :
                "No EXIF block was found in the original. The cleaned copy has none."}
            </p>
          </li>
        ))}
      </ul>
      {rows.length > 0 && <button className={btnGhost} onClick={() => { rows.forEach((r) => URL.revokeObjectURL(r.url)); setRows([]); }}>Clear all</button>}
    </div>
  );
}
