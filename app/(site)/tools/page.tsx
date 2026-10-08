import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/site/JsonLd";
import { CATEGORIES, TOOLS } from "@/lib/tools";

const SITE = "https://searchyouajob.vercel.app";

export const metadata: Metadata = {
  title: "Free Job Tools: Resume Maker, CV Maker, PDF Tools",
  description:
    "Free tools for job seekers: resume maker, CV maker, PDF reader, PDF maker, image to PDF and image converters. Everything runs in your browser.",
  keywords: ["job tools", "resume maker", "cv maker", "pdf tools for job applications", "free job search tools"],
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free Job Tools | SearchYouAJob",
    description: "Resume maker, CV maker, PDF and image tools for job applications. Free, private, no sign-up.",
    url: `${SITE}/tools`,
    siteName: "SearchYouAJob",
    type: "website",
  },
};

const faq = [
  { q: "Are the job tools really free?", a: "Yes. You do not need an account, and nothing is locked behind a paywall." },
  { q: "Do you keep my documents?", a: "No. Every tool runs inside your browser. Your files and text are not sent to our servers." },
  { q: "Which tool should I start with?", a: "If you have no resume yet, start with the Resume Maker. If a portal wants a PDF and you only have photos, use Image to PDF." },
];

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
            { "@type": "ListItem", position: 2, name: "Job Tools", item: SITE + "/tools" } ] },
          { "@type": "ItemList", itemListElement: TOOLS.map((t, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/tools/${t.slug}`, name: t.name })) },
          { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      }} />
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Free job tools for your applications</h1>
      <p className="mt-3 max-w-2xl text-lg text-zinc-600">
        Make a resume, turn photos into a PDF, read an offer letter, shrink an image for an upload form. Each tool does one job, runs in your browser and needs no account.
      </p>

      {CATEGORIES.map((c) => (
        <section key={c} className="mt-12" aria-labelledby={c.replace(/\s/g, "-")}>
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
        <h2 className="text-xl font-semibold">Why job seekers use these tools</h2>
        <h3 className="mt-5 font-medium">Applications ask for awkward file types</h3>
        <p className="mt-1 text-zinc-600">One portal wants a PDF under 2 MB, another wants a JPG photo, a third rejects the WebP you saved from a website. These tools fix the file so you can get back to applying.</p>
        <h3 className="mt-5 font-medium">Your documents stay with you</h3>
        <p className="mt-1 text-zinc-600">Resumes, ID copies and offer letters are personal. The tools process everything locally, so there is nothing to upload and nothing stored.</p>
        <h3 className="mt-5 font-medium">Built next to a real job search</h3>
        <p className="mt-1 text-zinc-600">When the paperwork is ready, <Link href="/" className="text-[#2E5C8A] underline">search for jobs in plain English</Link> on the same site and apply.</p>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold">Job tools questions</h2>
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
