"use client";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { btn, btnGhost, field } from "../ui";

type Pt = { x: number; y: number };
const FONTS = ["Dancing Script", "Great Vibes", "Allura", "Sacramento"];
const W = 700, H = 240;

function trimAndSave(src: HTMLCanvasElement, name: string) {
  const ctx = src.getContext("2d")!;
  const d = ctx.getImageData(0, 0, src.width, src.height).data;
  let x0 = src.width, y0 = src.height, x1 = 0, y1 = 0;
  for (let y = 0; y < src.height; y++) for (let x = 0; x < src.width; x++) if (d[(y * src.width + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  if (x1 <= x0 || y1 <= y0) return;
  const pad = 12;
  const out = document.createElement("canvas");
  out.width = x1 - x0 + pad * 2; out.height = y1 - y0 + pad * 2;
  out.getContext("2d")!.drawImage(src, x0, y0, x1 - x0 + 1, y1 - y0 + 1, pad, pad, x1 - x0 + 1, y1 - y0 + 1);
  out.toBlob((b) => {
    if (!b) return;
    const url = URL.createObjectURL(b);
    const a = document.createElement("a"); a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }, "image/png");
}

export default function SignatureGenerator() {
  const pad = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Pt[][]>([]);
  const drawing = useRef(false);
  const [tab, setTab] = useState<"draw" | "type">("draw");
  const [color, setColor] = useState("#111827");
  const [thick, setThick] = useState(3);
  const [ink, setInk] = useState(false);
  const [text, setText] = useState("Your Name");
  const [font, setFont] = useState(FONTS[1]);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    const id = "sig-fonts";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Allura&family=Dancing+Script:wght@600&family=Great+Vibes&family=Sacramento&display=swap";
      document.head.appendChild(l);
    }
    Promise.all(FONTS.map((f) => document.fonts.load(`64px "${f}"`))).then(() => setFontsReady(true)).catch(() => setFontsReady(true));
  }, []);

  function redraw(c: HTMLCanvasElement, col: string, th: number) {
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = th; ctx.lineCap = "round"; ctx.lineJoin = "round";
    for (const s of strokes.current) {
      if (s.length === 1) { ctx.beginPath(); ctx.arc(s[0].x, s[0].y, th / 2, 0, Math.PI * 2); ctx.fill(); continue; }
      ctx.beginPath(); ctx.moveTo(s[0].x, s[0].y);
      for (let i = 1; i < s.length - 1; i++) ctx.quadraticCurveTo(s[i].x, s[i].y, (s[i].x + s[i + 1].x) / 2, (s[i].y + s[i + 1].y) / 2);
      ctx.lineTo(s[s.length - 1].x, s[s.length - 1].y); ctx.stroke();
    }
  }

  const pos = (e: PointerEvent<HTMLCanvasElement>): Pt => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) * W) / r.width, y: ((e.clientY - r.top) * H) / r.height };
  };
  const down = (e: PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true; strokes.current.push([pos(e)]); setInk(true);
    redraw(e.currentTarget, color, thick);
  };
  const move = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    strokes.current[strokes.current.length - 1].push(pos(e));
    redraw(e.currentTarget, color, thick);
  };
  const up = () => { drawing.current = false; };

  function undo() { strokes.current.pop(); setInk(strokes.current.length > 0); if (pad.current) redraw(pad.current, color, thick); }
  function clear() { strokes.current = []; setInk(false); if (pad.current) redraw(pad.current, color, thick); }
  function recolor(c: string) { setColor(c); if (pad.current) redraw(pad.current, c, thick); }
  function rethick(t: number) { setThick(t); if (pad.current) redraw(pad.current, color, t); }

  function saveTyped() {
    const c = document.createElement("canvas");
    c.width = 1400; c.height = 400;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = color; ctx.textBaseline = "middle"; ctx.textAlign = "center";
    let size = 220;
    ctx.font = `${size}px "${font}", cursive`;
    while (ctx.measureText(text).width > 1300 && size > 40) { size -= 10; ctx.font = `${size}px "${font}", cursive`; }
    ctx.fillText(text, 700, 200);
    trimAndSave(c, "signature.png");
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className={tab === "draw" ? btn : btnGhost} onClick={() => setTab("draw")}>Draw</button>
        <button className={tab === "type" ? btn : btnGhost} onClick={() => setTab("type")}>Type</button>
      </div>
      <div className="flex flex-wrap items-end gap-x-5 gap-y-3 text-sm text-zinc-700">
        <label className="flex flex-col gap-1">Ink colour<input type="color" value={color} onChange={(e) => recolor(e.target.value)} className="h-9 w-14" /></label>
        {tab === "draw" && <label className="flex flex-col gap-1">Pen thickness {thick}<input type="range" min={1} max={10} value={thick} onChange={(e) => rethick(+e.target.value)} className="w-36" /></label>}
      </div>
      {tab === "draw" ? (
        <>
          <canvas ref={pad} width={W} height={H} aria-label="Signature drawing area" className="w-full touch-none rounded-lg border border-zinc-300 bg-white" style={{ cursor: "crosshair", backgroundImage: "linear-gradient(transparent 80%, #e4e4e7 80%, #e4e4e7 81%, transparent 81%)" }} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} />
          <div className="flex flex-wrap gap-2">
            <button className={btn} disabled={!ink} onClick={() => pad.current && trimAndSave(pad.current, "signature.png")}>Download transparent PNG</button>
            <button className={btnGhost} disabled={!ink} onClick={undo}>Undo</button>
            <button className={btnGhost} disabled={!ink} onClick={clear}>Clear</button>
          </div>
        </>
      ) : (
        <>
          <input className={field} aria-label="Signature text" value={text} maxLength={40} onChange={(e) => setText(e.target.value)} />
          <div className="grid gap-2 sm:grid-cols-2">
            {FONTS.map((f) => (
              <button key={f} onClick={() => setFont(f)} className={`rounded-lg border bg-white px-4 py-3 text-left text-3xl ${font === f ? "border-[#2E5C8A] ring-2 ring-[#69ABF7]/40" : "border-zinc-300"}`} style={{ fontFamily: `"${f}", cursive`, color }}>
                {text || "Your Name"}
              </button>
            ))}
          </div>
          {!fontsReady && <p className="text-xs text-zinc-500">Loading signature fonts...</p>}
          <button className={btn} disabled={!text.trim()} onClick={saveTyped}>Download transparent PNG</button>
        </>
      )}
    </div>
  );
}
