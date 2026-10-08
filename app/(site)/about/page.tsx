import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/site/JsonLd";

const SITE = "https://searchyouajob.vercel.app";

export const metadata: Metadata = {
  title: "About SearchYouAJob: Find Jobs in Plain English",
  description:
    "SearchYouAJob helps you search for jobs in the market by describing the work you want. Real listings, remote options and free job tools in one place.",
  keywords: ["about searchyouajob", "how to search for jobs", "ai job search", "find jobs online", "remote job search"],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About SearchYouAJob",
    description: "Search for jobs by describing what you want, then use free tools to get your paperwork ready.",
    url: `${SITE}/about`,
    siteName: "SearchYouAJob",
    type: "website",
  },
};

const faq = [
  { q: "What is SearchYouAJob?", a: "A job search site where you type what you are looking for in everyday language and get matching listings back, along with free tools for resumes, PDFs and images." },
  { q: "Where do the job listings come from?", a: "Listings are pulled from Adzuna, a large job search engine, so you see real openings with the company, location and pay when the employer lists it." },
  { q: "Can I look for remote jobs?", a: "Yes. Say you want remote work in your message and the search takes that into account." },
  { q: "Do I need an account?", a: "No. You can search and use every tool without signing up. Log in only if you want your searches saved." },
  { q: "Are the job tools free?", a: "Yes, and they run in your browser, so your documents are not uploaded." },
];

const h2 = "mt-12 text-2xl font-semibold";
const h3 = "mt-5 font-medium text-zinc-900";
const p = "mt-2 text-zinc-700 leading-relaxed";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "AboutPage", name: "About SearchYouAJob", url: `${SITE}/about`, description: "SearchYouAJob helps people search for jobs in the market by describing the work they want." },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
            { "@type": "ListItem", position: 2, name: "About", item: `${SITE}/about` } ] },
          { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      }} />

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About SearchYouAJob</h1>
      <p className="mt-4 text-lg text-zinc-600">
        SearchYouAJob helps you search for jobs in the market without fighting a wall of filters. Say what you want, in your own words, and we go and find it.
      </p>

      <h2 className={h2}>What SearchYouAJob does</h2>
      <p className={p}>Most job sites start with a form: job title, location, salary range, date posted. If your idea is a bit fuzzy, the form gets in the way. Here you simply write something like “remote junior data analyst roles” and the search works out the role, the place and whether you want remote work.</p>
      <p className={p}>You get real openings back, with the company, the location and the pay when the employer has listed it, plus a short note on why each one might suit you. Then you can keep talking: ask for something closer, better paid or less senior.</p>

      <h2 className={h2}>How a job search works</h2>
      <h3 className={h3}>You describe the job</h3>
      <p className={p}>Type the role, the city or country, and anything else that matters, such as remote, part-time or entry level.</p>
      <h3 className={h3}>We turn it into a proper search</h3>
      <p className={p}>Your message is read and converted into search terms, a place and a country, then checked against live listings.</p>
      <h3 className={h3}>You get a short, useful list</h3>
      <p className={p}>Instead of pages of near-duplicates, you see a handful of matches and can ask follow-up questions in the same chat.</p>

      <h2 className={h2}>How we are better than a typical job board</h2>
      <h3 className={h3}>You talk, you do not tick boxes</h3>
      <p className={p}>Describing a job takes ten seconds. Setting up six filters takes longer, and still misses the point if the right title is worded differently.</p>
      <h3 className={h3}>Straight answers about each result</h3>
      <p className={p}>Every result shows who is hiring, where, and what it pays when that is known. When pay is not listed, we say so instead of guessing.</p>
      <h3 className={h3}>Your paperwork gets sorted in the same place</h3>
      <p className={p}>Job boards stop at the listing. We also give you a resume maker, a CV maker and PDF and image tools, so you are not hunting for a converter at midnight before a deadline.</p>
      <h3 className={h3}>No account wall</h3>
      <p className={p}>Search and use the tools straight away. Log in only if you want your searches kept for next time.</p>
      <h3 className={h3}>Private by design</h3>
      <p className={p}>The document tools work inside your browser. Your resume, ID scans and offer letters are not uploaded to us.</p>

      <h2 className={h2}>Job tools that run in your browser</h2>
      <p className={p}>Applications come with small, annoying requirements. These <Link href="/tools" className="text-[#2E5C8A] underline">free job tools</Link> cover the usual ones:</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700">
        <li><Link href="/tools/resume-maker" className="text-[#2E5C8A] underline">Resume Maker</Link> and <Link href="/tools/cv-maker" className="text-[#2E5C8A] underline">CV Maker</Link> for a clean, readable document</li>
        <li><Link href="/tools/pdf-reader" className="text-[#2E5C8A] underline">PDF Reader</Link> and <Link href="/tools/pdf-maker" className="text-[#2E5C8A] underline">PDF Maker</Link> for offer letters and cover letters</li>
        <li><Link href="/tools/image-to-pdf" className="text-[#2E5C8A] underline">Image to PDF</Link> for scanned certificates and ID copies</li>
        <li><Link href="/tools/image-converter" className="text-[#2E5C8A] underline">Image Converter</Link>, <Link href="/tools/image-compressor" className="text-[#2E5C8A] underline">Image Compressor</Link> and <Link href="/tools/background-remover" className="text-[#2E5C8A] underline">Background Remover</Link> for upload forms that are picky about photos</li>
      </ul>

      <h2 className={h2}>Who SearchYouAJob is for</h2>
      <h3 className={h3}>First-time job seekers</h3>
      <p className={p}>If you do not know the exact job title to search for, describing the work is an easier place to start.</p>
      <h3 className={h3}>People changing careers</h3>
      <p className={p}>Ask for roles that use the skills you already have and see what comes back.</p>
      <h3 className={h3}>Remote and freelance hunters</h3>
      <p className={p}>Say remote, part-time or contract in your message and the search follows.</p>
      <h3 className={h3}>Anyone with an application due tonight</h3>
      <p className={p}>Make the resume, fix the file format and find the next opening without opening ten different sites.</p>

      <h2 className={h2}>Job search habits that work</h2>
      <h3 className={h3}>Change your resume for each role</h3>
      <p className={p}>Reuse the structure, but echo the words from the job post in your summary and skills.</p>
      <h3 className={h3}>Apply while the post is fresh</h3>
      <p className={p}>Newer listings tend to get more attention from recruiters, so check back often.</p>
      <h3 className={h3}>Keep every file as a PDF</h3>
      <p className={p}>A PDF looks the same on every screen, which is why most portals ask for one.</p>

      <h2 className={h2}>Frequently asked questions</h2>
      <div className="mt-3">
        {faq.map((f) => (
          <details key={f.q} className="border-b border-zinc-200 py-3">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <p className="mt-2 text-zinc-700">{f.a}</p>
          </details>
        ))}
      </div>

      <h2 className={h2}>Start your search</h2>
      <p className={p}>Ready? <Link href="/" className="text-[#2E5C8A] underline">Search for a job now</Link> or <Link href="/tools" className="text-[#2E5C8A] underline">open the job tools</Link>.</p>
    </main>
  );
}
