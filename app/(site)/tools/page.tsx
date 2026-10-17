import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/site/JsonLd";
import { CATEGORIES, TOOLS } from "@/lib/tools";
import { SITE_URL as SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${TOOLS.length} Free Online Tools: Resume, PDF, Image, Calculators`,
  description:
    "Free online tools that run in your browser: resume maker, PDF tools, image resizer, EMI and BMI calculators, QR codes, JSON formatter and more. No sign-up, no uploads.",
  keywords: ["free online tools", "online tools no sign up", "resume maker", "pdf tools", "image resizer", "emi calculator", "qr code generator", "json formatter", "unit converter"],
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free Online Tools for Work, Study and Everyday Tasks | SearchYouAJob",
    description: "Resume, PDF, image, text, calculator, converter and developer tools. Free, private and processed in your browser.",
    url: `${SITE}/tools`,
    siteName: "SearchYouAJob",
    type: "website",
  },
};

const faq = [
  { q: "Are these online tools really free?", a: "Yes. You do not need an account, nothing sits behind a paywall, and the tools do not add watermarks to your files." },
  { q: "Do you upload or keep my files?", a: "No. The tools run inside your browser, so your documents, photos and text are processed on your own device and are not sent to our servers." },
  { q: "Do the tools work on a phone?", a: "Yes. They are built for small screens too. A few, such as the drawing pad in the signature generator, work best with a finger or stylus." },
  { q: "Which tool should I start with?", a: "If you have no resume yet, start with the Resume Maker. If a portal wants a PDF and you only have photos, use Image to PDF. For a quick sum, try the Percentage Calculator or the Loan EMI Calculator." },
  { q: "Can I ask for a new tool?", a: "Yes. Use the contact page and describe what you need. Requests that come up repeatedly move to the front of the queue." },
];

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", name: "Free online tools", url: `${SITE}/tools`, description: "Free browser-based tools for resumes, PDFs, images, text, calculations, conversions and development." },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
            { "@type": "ListItem", position: 2, name: "Free Tools", item: SITE + "/tools" } ] },
          { "@type": "ItemList", itemListElement: TOOLS.map((t, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/tools/${t.slug}`, name: t.name })) },
          { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      }} />
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{TOOLS.length} free online tools that run in your browser</h1>
      <p className="mt-3 max-w-2xl text-lg text-zinc-600">
        Make a resume, turn photos into a PDF, shrink an image for an upload form, work out a loan repayment, generate a QR code or check a password. Each tool does one job, needs no account and keeps your data on your device.
      </p>

      <nav aria-label="Tool categories" className="mt-6 flex flex-wrap gap-2 text-sm">
        {CATEGORIES.map((c) => (
          <a key={c} href={`#${c.replace(/\s/g, "-")}`} className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-zinc-700 hover:border-[#69ABF7]">{c}</a>
        ))}
      </nav>

      {CATEGORIES.map((c) => (
        <section key={c} className="mt-12 scroll-mt-20" aria-labelledby={c.replace(/\s/g, "-")}>
          <h2 id={c.replace(/\s/g, "-")} className="text-xl font-semibold">{c}</h2>
          <ul className="mt-3 divide-y divide-zinc-200 border-y border-zinc-200">
            {TOOLS.filter((t) => t.category === c).map((t) => (
              <li key={t.slug}>
                <Link href={`/tools/${t.slug}`} className="flex flex-col gap-1 py-4 hover:bg-white sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-3">
                  <h3 className="font-medium text-[#2E5C8A]">{t.name}</h3>
                  <p className="text-sm text-zinc-600 sm:text-right">{t.short}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold">Why people use these tools</h2>
        <h3 className="mt-5 font-medium">Small tasks should not need an account</h3>
        <p className="mt-1 text-zinc-600">Most online utilities ask you to register, add a watermark or upload your file to a server you know nothing about. These do the job in the page you are looking at. Open the tool, use it, close the tab.</p>
        <h3 className="mt-5 font-medium">Your files stay with you</h3>
        <p className="mt-1 text-zinc-600">Resumes, ID copies, invoices and offer letters are personal. The file tools process everything locally, so there is nothing to upload and nothing stored on our side. Read the <Link href="/privacy" className="text-[#2E5C8A] underline">privacy policy</Link> for the details and the few exceptions.</p>
        <h3 className="mt-5 font-medium">Built for real deadlines</h3>
        <p className="mt-1 text-zinc-600">Applications, tax forms, school portals and client work all come with awkward requirements: a PDF under 2 MB, a square photo, a checksum to verify, a due date to count. The tools here are the ones people reach for in those moments.</p>
        <h3 className="mt-5 font-medium">Part of a real job search</h3>
        <p className="mt-1 text-zinc-600">When the paperwork is ready, <Link href="/" className="text-[#2E5C8A] underline">search for jobs in plain English</Link> on the same site. Learn more <Link href="/about" className="text-[#2E5C8A] underline">about SearchYouAJob</Link> or <Link href="/contact" className="text-[#2E5C8A] underline">tell us which tool to build next</Link>.</p>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold">Free tools questions</h2>
        {faq.map((f) => (
          <details key={f.q} className="border-b border-zinc-200 py-3">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <p className="mt-2 text-zinc-600">{f.a}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
