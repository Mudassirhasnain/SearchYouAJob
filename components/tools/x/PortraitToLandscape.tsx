"use client";
import { useEffect, useRef, useState } from "react";
import { DropZone, btn, btnGhost, field } from "../ui";

type Mode = "blur" | "solid" | "crop" | "rotate";
const RATIOS: Record<string, [number, number]> = { "16:9": [16, 9], "4:3": [4, 3], "3:2": [3, 2], "1.91:1": [191, 100] };

function cover(sw: number, sh: number, dw: number, dh: number) {
  const k = Math.max(dw / sw, dh / sh);
  return { w: sw * k, h: sh * k, x: (dw - sw * k) / 2, y: (dh - sh * k) / 2 };
}
function contain(sw: number, sh: number, dw: number, dh: number) {
  const k = Math.min(dw / sw, dh / sh);
  return { w: sw * k, h: sh * k, x: (dw - sw * k) / 2, y: (dh - sh * k) / 2 };
}

export default function PortraitToLandscape() {
  const cv = useRef<HTMLCanvasElement>(null);
  const [bmp, setBmp] = useState<ImageBitmap | null>(null);
  const [name, setName] = useState("image");
  const [mode, setMode] = useState<Mode>("blur");
  const [ratio, setRatio] = useState("16:9");
  const [outW, setOutW] = useState(1600);
  const [color, setColor] = useState("#ffffff");

  async function open(files: File[]) {
    const f = files.find((x) => x.type.startsWith("image/"));
    if (!f) return;
    setBmp(await createImageBitmap(f, { imageOrientation: "from-image" }));
    setName(f.name.replace(/\.[^.]+$/, ""));
  }

  useEffect(() => {
    const c = cv.current;
    if (!c || !bmp) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingQuality = "high";
    if (mode === "rotate") {
      c.width = bmp.height; c.height = bmp.width;
      ctx.save(); ctx.translate(c.width, 0); ctx.rotate(Math.PI / 2); ctx.drawImage(bmp, 0, 0); ctx.restore();
      return;
    }
    const [rw, rh] = RATIOS[ratio];
    const W = Math.min(Math.max(200, outW), 6000), H = Math.round((W * rh) / rw);
    c.width = W; c.height = H;
    if (mode === "crop") { const r = cover(bmp.width, bmp.height, W, H); ctx.drawImage(bmp, r.x, r.y, r.w, r.h); return; }
    if (mode === "solid") { ctx.fillStyle = color; ctx.fillRect(0, 0, W, H); }
    else {
      const s = document.createElement("canvas");
      s.width = Math.max(8, Math.round(W / 24)); s.height = Math.max(8, Math.round(H / 24));
      const sctx = s.getContext("2d")!;
      const r = cover(bmp.width, bmp.height, s.width, s.height);
      sctx.drawImage(bmp, r.x, r.y, r.w, r.h);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(s, 0, 0, W, H);
      ctx.fillStyle = "rgba(0,0,0,0.12)"; ctx.fillRect(0, 0, W, H);
    }
    const r = contain(bmp.width, bmp.height, W, H);
    ctx.drawImage(bmp, r.x, r.y, r.w, r.h);
  }, [bmp, mode, ratio, outW, color]);

  function save(type: string, ext: string) {
    cv.current?.toBlob((b) => {
      if (!b) return;
      const url = URL.createObjectURL(b);
      const a = document.createElement("a"); a.href = url; a.download = `${name}-landscape.${ext}`; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }, type, 0.92);
  }

  return (
    <div className="space-y-4">
      <DropZone accept="image/*" label="Drop a portrait photo here" onFiles={open} />
      <div className="flex flex-wrap items-end gap-x-5 gap-y-3 text-sm text-zinc-700">
        <label className="flex flex-col gap-1">Method
          <select className={field + " w-auto"} value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="blur">Blurred background</option><option value="solid">Solid colour</option><option value="crop">Crop to fill</option><option value="rotate">Rotate 90 degrees</option>
          </select>
        </label>
        {mode !== "rotate" && (
          <>
            <label className="flex flex-col gap-1">Shape
              <select className={field + " w-auto"} value={ratio} onChange={(e) => setRatio(e.target.value)}>{Object.keys(RATIOS).map((r) => <option key={r}>{r}</option>)}</select>
            </label>
            <label className="flex flex-col gap-1">Width (px)
              <input type="number" min={200} max={6000} className={field + " w-28"} value={outW} onChange={(e) => setOutW(+e.target.value)} />
            </label>
          </>
        )}
        {mode === "solid" && <label className="flex flex-col gap-1">Colour<input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-9 w-14" /></label>}
      </div>
      <div className="overflow-auto rounded-lg border border-zinc-200 bg-white p-2">
        {bmp ? <canvas ref={cv} className="mx-auto h-auto max-h-96 max-w-full" /> : <p className="p-8 text-center text-sm text-zinc-500">Your landscape image will appear here.</p>}
      </div>
      <div className="flex gap-2">
        <button className={btn} disabled={!bmp} onClick={() => save("image/png", "png")}>Download PNG</button>
        <button className={btnGhost} disabled={!bmp} onClick={() => save("image/jpeg", "jpg")}>Download JPG</button>
      </div>
    </div>
  );
}
