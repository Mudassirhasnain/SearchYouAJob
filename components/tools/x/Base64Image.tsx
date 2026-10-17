"use client";
import { useState } from "react";
import { DropZone, btn, btnGhost, field } from "../ui";

function sniff(b64: string) {
  try {
    const bin = atob(b64.slice(0, 24));
    const h = [...bin].map((c) => c.charCodeAt(0));
    if (h[0] === 0x89 && h[1] === 0x50) return "image/png";
    if (h[0] === 0xff && h[1] === 0xd8) return "image/jpeg";
    if (h[0] === 0x47 && h[1] === 0x49) return "image/gif";
    if (h[0] === 0x52 && h[1] === 0x49 && h[8] === 0x57) return "image/webp";
  } catch { /* not base64 */ }
  return "";
}

function useCopy() {
  const [k, setK] = useState("");
  return { k, copy: async (key: string, text: string) => { try { await navigator.clipboard.writeText(text); setK(key); setTimeout(() => setK(""), 1500); } catch { /* blocked */ } } };
}

export default function Base64Image() {
  const [tab, setTab] = useState<"enc" | "dec">("enc");
  const [uri, setUri] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState(0);
  const [input, setInput] = useState("");
  const { k, copy } = useCopy();

  function load(files: File[]) {
    const f = files.find((x) => x.type.startsWith("image/"));
    if (!f) return;
    const r = new FileReader();
    r.onload = () => { setUri(String(r.result)); setName(f.name); setSize(f.size); };
    r.readAsDataURL(f);
  }

  const raw = uri.split(",")[1] ?? "";
  let decoded = "";
  let ext = "png";
  let err = "";
  const t = input.trim();
  if (t) {
    if (/^data:image\//i.test(t)) { decoded = t; ext = (/^data:image\/(\w+)/i.exec(t)?.[1] ?? "png").replace("jpeg", "jpg"); }
    else {
      const clean = t.replace(/\s/g, "");
      const mime = sniff(clean);
      if (mime) { decoded = `data:${mime};base64,${clean}`; ext = mime.split("/")[1].replace("jpeg", "jpg"); }
      else err = "This does not look like a Base64 image. Paste a data URI or raw Base64 of a PNG, JPG, GIF or WebP.";
    }
  }

  const items = uri ? [
    ["Data URI", uri],
    ["Raw Base64", raw],
    ["CSS background", `background-image: url("${uri}");`],
    ["HTML img tag", `<img src="${uri}" alt="${name.replace(/"/g, "")}" />`],
  ] : [];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className={tab === "enc" ? btn : btnGhost} onClick={() => setTab("enc")}>Image to Base64</button>
        <button className={tab === "dec" ? btn : btnGhost} onClick={() => setTab("dec")}>Base64 to image</button>
      </div>
      {tab === "enc" ? (
        <>
          <DropZone accept="image/*" label="Drop an image to convert it to Base64" onFiles={load} />
          {uri && (
            <div className="space-y-3">
              <p className="text-sm text-zinc-600">{name}: {size.toLocaleString()} bytes, Base64 text is {uri.length.toLocaleString()} characters (about 33% larger than the file).</p>
              {items.map(([label, val]) => (
                <div key={label}>
                  <div className="mb-1 flex items-center justify-between text-sm font-medium text-zinc-700">
                    {label}<button className={btnGhost} onClick={() => copy(label, val)}>{k === label ? "Copied" : "Copy"}</button>
                  </div>
                  <textarea readOnly className={field + " h-20 font-mono text-xs"} value={val.length > 20000 ? val.slice(0, 20000) + "... (preview cut, use Copy for the full text)" : val} />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <textarea className={field + " h-40 font-mono text-xs"} aria-label="Base64 text" placeholder="Paste a data URI (data:image/png;base64,...) or raw Base64 here" value={input} onChange={(e) => setInput(e.target.value)} />
          {err && <p className="text-sm text-red-600">{err}</p>}
          {decoded && (
            <div className="space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={decoded} alt="Decoded preview" className="max-h-72 rounded-lg border border-zinc-200 bg-white" />
              <a href={decoded} download={`image.${ext}`} className={btn}>Download image</a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
