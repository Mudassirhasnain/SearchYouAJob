"use client";
import { useState } from "react";
import { DropZone, btnGhost } from "./ui";

export default function PdfReader() {
  const [file, setFile] = useState<{ name: string; url: string } | null>(null);
  const open = (f: File[]) => {
    const pdf = f.find((x) => x.type === "application/pdf" || /\.pdf$/i.test(x.name));
    if (pdf) setFile({ name: pdf.name, url: URL.createObjectURL(pdf) });
  };
  if (!file) return <DropZone accept="application/pdf,.pdf" label="Drop a PDF here to read it" onFiles={open} />;
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="truncate font-medium text-zinc-800">{file.name}</span>
        <span className="flex gap-2">
          <a href={file.url} target="_blank" rel="noreferrer" className={btnGhost}>Open in new tab</a>
          <button className={btnGhost} onClick={() => setFile(null)}>Open another PDF</button>
        </span>
      </div>
      <iframe src={file.url} title={file.name} className="h-[75vh] w-full rounded-lg border border-zinc-200 bg-white" />
    </div>
  );
}
