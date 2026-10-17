"use client";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// Maps tool.kind (equal to the slug for the newer tools) to its lazily loaded component.
export const REGISTRY: Record<string, ComponentType> = {
  "text-case-converter": dynamic(() => import("./x/TextTools"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "lorem-ipsum-generator": dynamic(() => import("./x/LoremIpsum"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "markdown-previewer": dynamic(() => import("./x/MarkdownPreviewer"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "word-counter": dynamic(() => import("./x/WordCounter"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "typing-speed-test": dynamic(() => import("./x/TypingTest"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "image-resizer": dynamic(() => import("./x/ImageResizer"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "exif-remover": dynamic(() => import("./x/ExifRemover"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "base64-image-converter": dynamic(() => import("./x/Base64Image"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "portrait-to-landscape-image": dynamic(() => import("./x/PortraitToLandscape"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "signature-generator": dynamic(() => import("./x/SignatureGenerator"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "loan-emi-calculator": dynamic(() => import("./x/EmiCalculator"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "percentage-calculator": dynamic(() => import("./x/PercentageCalculator"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "age-calculator": dynamic(() => import("./x/AgeCalculator"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "bmi-calculator": dynamic(() => import("./x/BmiCalculator"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "days-between-dates": dynamic(() => import("./x/DaysBetweenDates"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "unit-converter": dynamic(() => import("./x/UnitConverter"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "unix-timestamp-converter": dynamic(() => import("./x/UnixTimestamp"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "color-converter": dynamic(() => import("./x/ColorConverter"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "time-zone-converter": dynamic(() => import("./x/TimeDifference"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "est-to-pst-converter": dynamic(() => import("./x/EstToPst"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "json-formatter": dynamic(() => import("./x/JsonFormatter"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "qr-code-generator": dynamic(() => import("./x/QrCode"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "barcode-generator": dynamic(() => import("./x/Barcode"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "password-generator": dynamic(() => import("./x/PasswordGenerator"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "hash-generator": dynamic(() => import("./x/HashGenerator"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "weeks-into-the-year": dynamic(() => import("./x/WeeksIntoYear"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "random-number-generator": dynamic(() => import("./x/RandomNumber"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "online-timer-stopwatch": dynamic(() => import("./x/TimerStopwatch"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "analogue-clock": dynamic(() => import("./x/AnalogueClock"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
  "invoice-generator": dynamic(() => import("./x/InvoiceGenerator"), { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading tool...</p> }),
};
