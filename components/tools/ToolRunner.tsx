"use client";
import ImageConverter from "./ImageConverter";
import BgRemover from "./BgRemover";
import ImageToPdf from "./ImageToPdf";
import PdfReader from "./PdfReader";
import ResumeBuilder from "./ResumeBuilder";
import TextToPdf from "./TextToPdf";
import type { Tool } from "@/lib/tools";

export default function ToolRunner({ tool }: { tool: Tool }) {
  switch (tool.kind) {
    case "resume": return <ResumeBuilder cv={false} />;
    case "cv": return <ResumeBuilder cv />;
    case "pdf-reader": return <PdfReader />;
    case "text-pdf": return <TextToPdf />;
    case "image-pdf": return <ImageToPdf />;
    case "convert": return <ImageConverter mode="convert" />;
    case "compress": return <ImageConverter mode="compress" />;
    case "bg-remove": return <BgRemover />;
  }
}
