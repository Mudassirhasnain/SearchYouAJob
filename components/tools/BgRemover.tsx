"use client";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { guessBackground, removeBackground, type RGB } from "@/lib/bgremove";
import { DropZone, btn, btnGhost, field, loadBitmap } from "./ui";

const MAX = 1600;

export default function BgRemover() {
  const src = useRef<ImageData | null>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("");
  const [bg, setBg] = useState<RGB>([255, 255, 255]);
  const [tol, setTol] = useState(40);
  const [soft, setSoft] = useState(25);
  const [fill, setFill] = useState<"none" | "white" | "custom">("none");
  const [color, setColor] = useState("#2e5c8a");
  const [ready, setReady] = useState(false);

  async function open(files: File[]) {
    const f = files.find((x) => x.type.startsWith("image/"));
    if (!f) return;
    const bmp = await loadBitmap(f);
    const k = Math.min(1, MAX / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    const ctx = c.getContext("2d")!;
    ctx.drawImage(bmp, 0, 0, c.width, c.height);
    src.current = ctx.getImageData(0, 0, c.width, c.height);
    setBg(guessBackground(src.current.data, c.width, c.height));
    setName(f.name.replace(/\.[^.]+$/, ""));
    setReady(true);
  }

  useEffect(() => {
    const s = src.current, out = cv.current;
    if (!ready || !s || !out) return;
    const data = removeBackground(s.data, s.width, s.height, bg, tol, soft);
    const tmp = document.createElement("canvas");
    tmp.width = s.width; tmp.height = s.height;
    tmp.getContext("2d")!.putImageData(new ImageData(data, s.width, s.height), 0, 0);
    out.width = s.width; out.height = s.height;
    const ctx = out.getContext("2d")!;
    ctx.clearRect(0, 0, out.width, out.height);
    if (fill !== "none") { ctx.fillStyle = fill === "white" ? "#ffffff" : color; ctx.fillRect(0, 0, out.width, out.height); }
    ctx.drawImage(tmp, 0, 0);
  }, [ready, bg, tol, soft, fill, color]);

  function pick(e: MouseEvent<HTMLCanvasElement>) {
    const s = src.current, c = cv.current;
    if (!s || !c) return;
    const r = c.getBoundingClientRect();
    const x = Math.min(s.width - 1, Math.max(0, Math.floor(((e.clientX - r.left) * s.width) / r.width)));
    const y = Math.min(s.height - 1, Math.max(0, Math.floor(((e.clientY - r.top) * s.height) / r.height)));
    const i = (y * s.width + x) * 4;
    setBg([s.data[i], s.data[i + 1], s.data[i + 2]]);
  }

  function download() {
    cv.current?.toBlob((b) => {
      if (!b) return;
      const url = URL.createObjectURL(b);
      const a = document.createElement("a");
      a.href = url; a.download = `${name || "image"}-no-background.png`; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }, "image/png");
  }

  if (!ready) return <DropZone accept="image/*" label="Drop a photo or logo with a plain background" onFiles={open} />;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-700">
        <label className="flex items-center gap-2">Strength {tol}
          <input type="range" min={5} max={120} value={tol} onChange={(e) => setTol(+e.target.value)} className="w-36" /></label>
        <label className="flex items-center gap-2">Edge softness {soft}
          <input type="range" min={1} max={60} value={soft} onChange={(e) => setSoft(+e.target.value)} className="w-36" /></label>
        <label className="flex items-center gap-2">Background
          <select className={field + " w-auto"} value={fill} onChange={(e) => setFill(e.target.value as "none" | "white" | "custom")}>
            <option value="none">Transparent</option><option value="white">White</option><option value="custom">Colour</option>
          </select></label>
        {fill === "custom" && <input type="color" value={color} onChange={(e) => setColor(e.target.value)} aria-label="Background colour" />}
        <span className="flex items-center gap-2">Removing
          <span className="inline-block h-5 w-5 rounded border border-zinc-300" style={{ background: `rgb(${bg.join(",")})` }} /></span>
      </div>
      <p className="text-xs text-zinc-500">Click the image to pick the background colour to remove. Works best on plain backgrounds.</p>
      <div className="overflow-auto rounded-lg border border-zinc-200" style={{ backgroundImage: "linear-gradient(45deg,#e5e7eb 25%,transparent 25%,transparent 75%,#e5e7eb 75%),linear-gradient(45deg,#e5e7eb 25%,#fff 25%,#fff 75%,#e5e7eb 75%)", backgroundSize: "16px 16px", backgroundPosition: "0 0,8px 8px" }}>
        <canvas ref={cv} onClick={pick} className="mx-auto block max-h-[70vh] max-w-full cursor-crosshair" />
      </div>
      <div className="flex gap-3">
        <button className={btn} onClick={download}>Download PNG</button>
        <button className={btnGhost} onClick={() => setReady(false)}>Use another image</button>
      </div>
    </div>
  );
}
