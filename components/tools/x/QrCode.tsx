"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import qrcode from "qrcode-generator";
import { btn, btnGhost, field } from "../ui";

type Kind = "url" | "text" | "wifi" | "vcard" | "email" | "phone" | "sms";
const wesc = (s: string) => s.replace(/([\;,:"])/g, "\\$1");
const lumOf = (h: string) => { const m = /^#?([0-9a-f]{6})$/i.exec(h); if (!m) return 0; const v = [0, 2, 4].map((i) => { const c = parseInt(m[1].slice(i, i + 2), 16) / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };

export default function QrCode() {
  const cv = useRef<HTMLCanvasElement>(null);
  const [kind, setKind] = useState<Kind>("url");
  const [f, setF] = useState<Record<string, string>>({ url: "https://searchyouajob.vercel.app", text: "Hello", ssid: "", pass: "", enc: "WPA", name: "", org: "", tel: "", mail: "", web: "", to: "", subject: "", body: "", num: "", msg: "" });
  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(4);
  const [ec, setEc] = useState<"L" | "M" | "Q" | "H">("M");
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  const data = (() => {
    switch (kind) {
      case "url": return f.url.trim();
      case "text": return f.text;
      case "wifi": return f.ssid ? `WIFI:T:${f.enc === "nopass" ? "nopass" : f.enc};S:${wesc(f.ssid)};${f.enc === "nopass" ? "" : `P:${wesc(f.pass)};`};;` : "";
      case "vcard": return f.name || f.tel || f.mail ? ["BEGIN:VCARD", "VERSION:3.0", `FN:${f.name}`, f.org && `ORG:${f.org}`, f.tel && `TEL:${f.tel}`, f.mail && `EMAIL:${f.mail}`, f.web && `URL:${f.web}`, "END:VCARD"].filter(Boolean).join("\n") : "";
      case "email": return f.to ? `mailto:${f.to}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(f.body)}` : "";
      case "phone": return f.num ? `tel:${f.num.replace(/\s/g, "")}` : "";
      case "sms": return f.num ? `SMSTO:${f.num.replace(/\s/g, "")}:${f.msg}` : "";
    }
  })();

  const qr = useMemo(() => {
    if (!data) return { err: "", q: null as ReturnType<typeof qrcode> | null };
    try { const q = qrcode(0, ec); q.addData(data); q.make(); return { err: "", q }; } catch { return { err: "That is too much data for a QR code at this error correction level. Shorten it or lower the level.", q: null }; }
  }, [data, ec]);

  useEffect(() => {
    const c = cv.current; const q = qr.q;
    if (!c || !q) return;
    const n = q.getModuleCount(), total = n + margin * 2, px = Math.max(1, Math.floor(size / total));
    c.width = c.height = px * total;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = fg;
    for (let r = 0; r < n; r++) for (let col = 0; col < n; col++) if (q.isDark(r, col)) ctx.fillRect((col + margin) * px, (r + margin) * px, px, px);
  }, [qr, size, margin, fg, bg]);

  function png() { cv.current?.toBlob((b) => { if (!b) return; const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = "qrcode.png"; a.click(); setTimeout(() => URL.revokeObjectURL(u), 2000); }); }
  function svg() {
    const q = qr.q; if (!q) return;
    const n = q.getModuleCount(), t = n + margin * 2; let d = "";
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c + margin} ${r + margin}h1v1h-1z`;
    const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${t}" width="${size}" height="${size}" shape-rendering="crispEdges"><rect width="${t}" height="${t}" fill="${bg}"/><path d="${d}" fill="${fg}"/></svg>`;
    const u = URL.createObjectURL(new Blob([s], { type: "image/svg+xml" })); const a = document.createElement("a"); a.href = u; a.download = "qrcode.svg"; a.click(); setTimeout(() => URL.revokeObjectURL(u), 2000);
  }

  const L = [lumOf(fg), lumOf(bg)].sort((a, b) => b - a); const contrast = (L[0] + 0.05) / (L[1] + 0.05);
  const inp = (k: string, label: string, type = "text") => <label className="flex flex-col gap-1 text-sm text-zinc-700">{label}<input type={type} className={field} value={f[k]} onChange={(e) => set(k, e.target.value)} /></label>;
  const KINDS: [Kind, string][] = [["url", "Website link"], ["text", "Text"], ["wifi", "Wi-Fi"], ["vcard", "Contact"], ["email", "Email"], ["phone", "Phone"], ["sms", "SMS"]];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">{KINDS.map(([k, l]) => <button key={k} className={kind === k ? btn : btnGhost} onClick={() => setKind(k)}>{l}</button>)}</div>
        <div className="grid gap-3 sm:grid-cols-2">
          {kind === "url" && inp("url", "Web address")}
          {kind === "text" && <label className="flex flex-col gap-1 text-sm text-zinc-700 sm:col-span-2">Text<textarea className={field + " h-24"} value={f.text} onChange={(e) => set("text", e.target.value)} /></label>}
          {kind === "wifi" && <>{inp("ssid", "Network name (SSID)")}{inp("pass", "Password")}<label className="flex flex-col gap-1 text-sm text-zinc-700">Security<select className={field} value={f.enc} onChange={(e) => set("enc", e.target.value)}><option value="WPA">WPA/WPA2/WPA3</option><option value="WEP">WEP</option><option value="nopass">None</option></select></label></>}
          {kind === "vcard" && <>{inp("name", "Full name")}{inp("org", "Company")}{inp("tel", "Phone", "tel")}{inp("mail", "Email", "email")}{inp("web", "Website")}</>}
          {kind === "email" && <>{inp("to", "To", "email")}{inp("subject", "Subject")}<label className="flex flex-col gap-1 text-sm text-zinc-700 sm:col-span-2">Message<textarea className={field + " h-20"} value={f.body} onChange={(e) => set("body", e.target.value)} /></label></>}
          {kind === "phone" && inp("num", "Phone number", "tel")}
          {kind === "sms" && <>{inp("num", "Phone number", "tel")}{inp("msg", "Message")}</>}
        </div>
        <div className="flex flex-wrap items-end gap-x-5 gap-y-3 text-sm text-zinc-700">
          <label className="flex flex-col gap-1">Size {size}px<input type="range" min={120} max={1000} step={10} value={size} onChange={(e) => setSize(+e.target.value)} className="w-40" /></label>
          <label className="flex flex-col gap-1">Margin {margin}<input type="range" min={0} max={10} value={margin} onChange={(e) => setMargin(+e.target.value)} className="w-28" /></label>
          <label className="flex flex-col gap-1">Error correction<select className={field + " w-auto"} value={ec} onChange={(e) => setEc(e.target.value as typeof ec)}><option value="L">Low (7%)</option><option value="M">Medium (15%)</option><option value="Q">Quartile (25%)</option><option value="H">High (30%)</option></select></label>
          <label className="flex flex-col gap-1">Dots<input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-9 w-12" /></label>
          <label className="flex flex-col gap-1">Background<input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-9 w-12" /></label>
        </div>
        {contrast < 3 && <p className="text-sm text-orange-700">Low contrast between dots and background. Many scanners will fail. Use a dark colour on a light background.</p>}
        {qr.err && <p className="text-sm text-red-600">{qr.err}</p>}
      </div>
      <div className="space-y-3">
        <div className="flex min-h-[200px] min-w-[200px] items-center justify-center rounded-xl border border-zinc-200 bg-white p-3">
          {qr.q ? <canvas ref={cv} className="h-auto max-w-full" style={{ maxWidth: 320 }} aria-label="QR code preview" /> : <p className="text-sm text-zinc-500">Fill in the details to see your code.</p>}
        </div>
        <div className="flex gap-2"><button className={btn} disabled={!qr.q} onClick={png}>Download PNG</button><button className={btnGhost} disabled={!qr.q} onClick={svg}>Download SVG</button></div>
      </div>
    </div>
  );
}
