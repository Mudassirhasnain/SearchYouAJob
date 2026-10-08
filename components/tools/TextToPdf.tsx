"use client";
import { useState } from "react";
import { textToPdf } from "@/lib/pdf";
import { btn, field } from "./ui";

export default function TextToPdf() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [size, setSize] = useState(11);

  function download() {
    const url = URL.createObjectURL(textToPdf(text, { title, size }));
    const a = document.createElement("a");
    a.href = url;
    a.download = (title.trim().replace(/[^\w\- ]+/g, "") || "document") + ".pdf";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  return (
    <div className="space-y-3">
      <input className={field} placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className={field + " h-72"} placeholder="Type or paste your text here" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-700">
        <label className="flex items-center gap-2">
          Text size
          <select className={field + " w-auto"} value={size} onChange={(e) => setSize(+e.target.value)}>
            {[10, 11, 12, 14].map((s) => <option key={s} value={s}>{s} pt</option>)}
          </select>
        </label>
        <label className="cursor-pointer text-[#2E5C8A] underline">
          Load a .txt file
          <input type="file" accept=".txt,text/plain" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setText(await f.text()); e.target.value = ""; }} />
        </label>
        <button className={btn + " ml-auto"} disabled={!text.trim()} onClick={download}>Download PDF</button>
      </div>
    </div>
  );
}
