import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/site/JsonLd";
import { CATEGORIES, TOOLS } from "@/lib/tools";
import { SITE_URL as SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About SearchYouAJob: AI Job Search and Free Online Tools",
  description:
    "Meet SearchYouAJob: search real jobs by describing the work you want, then use free private tools for resumes, PDFs, images, calculators and more.",
  keywords: ["about searchyouajob", "ai job search", "how to search for jobs", "free online tools", "remote job search", "private online tools", "no sign up tools"],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About SearchYouAJob: Job Search and Free Tools in One Place",
    description: "Search for jobs by describing what you want, then get your paperwork and everyday tasks done with free tools that run in your browser.",
    url: `${SITE}/about`,
    siteName: "SearchYouAJob",
    type: "website",
  },
  twitter: { card: "summary", title: "About SearchYouAJob", description: "AI job search plus free browser-based tools. No sign-up, no uploads." },
};

const faq = [
  { q: "What is SearchYouAJob?", a: "A job search site where you type what you are looking for in everyday language and get matching listings back, together with a growing set of free tools for resumes, PDFs, images, text, calculations and conversions." },
  { q: "Where do the job listings come from?", a: "Listings are pulled from Adzuna, a large job search engine, so you see real openings with the company, location and pay when the employer lists it. We do not write or edit the listings." },
  { q: "Can I look for remote jobs?", a: "Yes. Say you want remote work in your message and the search takes that into account." },
  { q: "Do I need an account?", a: "No. You can search and use every tool without signing up. Log in only if you want your searches saved." },
  { q: "Are the tools really free, and what is the catch?", a: "They are free to use, with no watermark and no usage limit. The site is supported by being useful and by ordinary traffic. We do not sell your files because we never receive them." },
  { q: "Are my files uploaded when I use a tool?", a: "No. The tools run in your browser. Files and text you enter are processed on your device. The privacy policy lists the few places where data does leave your device, such as the job search chat." },
  { q: "How can I suggest a new tool or report a problem?", a: "Use the contact page. Tell us the tool name, your browser and what went wrong, or describe the tool you wish existed." },
];

const h2 = "mt-12 text-2xl font-semibold";
const h3 = "mt-5 font-medium text-zinc-900";
const p = "mt-2 text-zinc-700 leading-relaxed";
const a = "text-[#2E5C8A] underline";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "AboutPage", name: "About SearchYouAJob", url: `${SITE}/about`, description: "SearchYouAJob helps people search for jobs by describing the work they want, and offers free browser-based tools." },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
            { "@type": "ListItem", position: 2, name: "About", item: `${SITE}/about` } ] },
          { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      }} />

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About SearchYouAJob</h1>
      <p className="mt-4 text-lg text-zinc-600">
        SearchYouAJob helps you search for jobs without fighting a wall of filters, and gives you {TOOLS.length} free tools to deal with the paperwork and small tasks that come with every application. Say what you want, in your own words, and we go and find it.
      </p>

      <h2 className={h2}>Why we built it</h2>
      <p className={p}>Job hunting is a pile of small chores wrapped around one big question. The big question is which job to go for. The chores are everything else: a resume that survives screening software, a certificate scan that fits a 2 MB upload limit, an offer letter you need to read on a borrowed laptop, a salary or loan calculation, a photo with the wrong dimensions.</p>
      <p className={p}>Each chore usually sends you to a different website. Many of them ask for an email address, stamp a watermark on the result or upload your private documents to a server you know nothing about. We wanted one place where the search and the chores sit side by side, where nothing needs an account, and where the tools respect the fact that your documents are yours.</p>
      <p className={p}>That is the whole idea. Search in plain English, then finish the task in the same tab.</p>

      <h2 className={h2}>What SearchYouAJob does</h2>
      <p className={p}>Most job sites start with a form: job title, location, salary range, date posted. If your idea is a bit fuzzy, the form gets in the way. Here you simply write something like “remote junior data analyst roles” and the search works out the role, the place and whether you want remote work.</p>
      <p className={p}>You get real openings back, with the company, the location and the pay when the employer has listed it, plus a short note on why each one might suit you. Then you can keep talking: ask for something closer, better paid or less senior.</p>

      <h2 className={h2}>How a job search works</h2>
      <h3 className={h3}>You describe the job</h3>
      <p className={p}>Type the role, the city or country, and anything else that matters, such as remote, part-time or entry level. Typos and nicknames are fine. “Silicon Valley” and “los angles” both get understood.</p>
      <h3 className={h3}>We turn it into a proper search</h3>
      <p className={p}>Your message is read by an AI model and converted into search terms, a place and a country, then checked against live listings from Adzuna.</p>
      <h3 className={h3}>You get a short, useful list</h3>
      <p className={p}>Instead of pages of near-duplicates, you see a handful of matches and can ask follow-up questions in the same chat. Each result links to the original listing, where you apply with the employer directly.</p>

      <h2 className={h2}>The free tools</h2>
      <p className={p}>The <Link href="/tools" className={a}>tools section</Link> now holds {TOOLS.length} utilities. Each one does a single job, opens instantly and runs inside your browser. Here is what is available.</p>
      {CATEGORIES.map((c) => (
        <div key={c}>
          <h3 className={h3}>{c}</h3>
          <p className={p}>
            {TOOLS.filter((t) => t.category === c).map((t, i, arr) => (
              <span key={t.slug}><Link href={`/tools/${t.slug}`} className={a}>{t.name}</Link>{i < arr.length - 1 ? ", " : "."}</span>
            ))}
          </p>
        </div>
      ))}

      <h2 className={h2}>How the tools are built</h2>
      <p className={p}>Every tool is written to run on your device. When you convert an image, strip photo metadata, hash a file or make a PDF, the work is done by your browser using standard web features such as the Canvas API and the Web Crypto API. Because nothing needs a server, nothing needs an account, and there is no queue.</p>
      <p className={p}>We try to keep the maths and the formats honest. The EMI calculator uses the standard reducing-balance formula. The time zone tools use the zone database built into your browser, so daylight saving is applied for the date you pick. The password generator uses the browser&apos;s cryptographic random source, not a predictable pseudo-random function. Each tool page explains how its result is produced and where its limits are, so you can decide how far to trust it.</p>
      <p className={p}>No tool is a substitute for professional advice. A BMI figure is not a diagnosis, an invoice template is not legal or tax advice, and a loan calculator does not know your lender&apos;s fees. We say so on the pages where it matters.</p>

      <h2 className={h2}>Principles we work to</h2>
      <h3 className={h3}>Private by default</h3>
      <p className={p}>The document, image, text and calculation tools do not send your input to us. The <Link href="/privacy" className={a}>privacy policy</Link> spells out the exceptions, such as the job search chat, which has to pass your message to an AI provider and a job search provider to work.</p>
      <h3 className={h3}>No account wall, no watermark</h3>
      <p className={p}>Search and use the tools straight away. Log in only if you want your searches kept for next time.</p>
      <h3 className={h3}>Plain answers</h3>
      <p className={p}>Every result shows who is hiring, where, and what it pays when that is known. When pay is not listed, we say so instead of guessing. The same goes for tools: if a tool cannot do something, the page says so.</p>
      <h3 className={h3}>Fast and light</h3>
      <p className={p}>Each tool loads only its own code, so pages stay quick on slow connections and older phones.</p>

      <h2 className={h2}>Who SearchYouAJob is for</h2>
      <h3 className={h3}>First-time job seekers</h3>
      <p className={p}>If you do not know the exact job title to search for, describing the work is an easier place to start. The resume maker and CV maker give you a clean document without a design degree.</p>
      <h3 className={h3}>People changing careers</h3>
      <p className={p}>Ask for roles that use the skills you already have and see what comes back.</p>
      <h3 className={h3}>Remote and freelance workers</h3>
      <p className={p}>Say remote, part-time or contract in your message and the search follows. The invoice generator, time zone converter and percentage calculator cover the admin that comes with working for clients.</p>
      <h3 className={h3}>Students, developers and designers</h3>
      <p className={p}>The JSON formatter, hash generator, colour contrast checker, Markdown previewer and unit converter are the small utilities people open ten times a week.</p>
      <h3 className={h3}>Anyone with a deadline tonight</h3>
      <p className={p}>Make the resume, fix the file format and find the next opening without opening ten different sites.</p>

      <h2 className={h2}>Job search habits that work</h2>
      <h3 className={h3}>Change your resume for each role</h3>
      <p className={p}>Reuse the structure, but echo the words from the job post in your summary and skills.</p>
      <h3 className={h3}>Apply while the post is fresh</h3>
      <p className={p}>Newer listings tend to get more attention from recruiters, so check back often.</p>
      <h3 className={h3}>Keep every file as a PDF</h3>
      <p className={p}>A PDF looks the same on every screen, which is why most portals ask for one.</p>
      <h3 className={h3}>Remove hidden data from photos</h3>
      <p className={p}>Phone photos can carry your location. Run images through the <Link href="/tools/exif-remover" className={a}>photo metadata remover</Link> before posting them publicly.</p>

      <h2 className={h2}>What comes next</h2>
      <p className={p}>We add tools based on what people ask for. If a task keeps sending you to a site full of pop-ups, tell us about it through the <Link href="/contact" className={a}>contact page</Link>. We also fix bugs as they are reported and keep the existing tools accurate as browsers change. We do not promise dates for new features, but we do read every message.</p>

      <h2 className={h2}>Frequently asked questions</h2>
      <div className="mt-3">
        {faq.map((f) => (
          <details key={f.q} className="border-b border-zinc-200 py-3">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <p className="mt-2 text-zinc-700">{f.a}</p>
          </details>
        ))}
      </div>

      <h2 className={h2}>Start now</h2>
      <p className={p}>Ready? <Link href="/" className={a}>Search for a job</Link>, <Link href="/tools" className={a}>open the free tools</Link>, read the <Link href="/privacy" className={a}>privacy policy</Link> or <Link href="/contact" className={a}>get in touch</Link>.</p>
    </main>
  );
}
