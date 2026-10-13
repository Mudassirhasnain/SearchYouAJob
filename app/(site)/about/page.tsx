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
      <p className={p}>Search and use the tools straight away. You can also choose to create an account, but searching does not require sign-up.</p>
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

      <h2 className={h2}>Making sense of search results</h2>
      <p className={p}>A search result is a starting point, not a final recommendation. Read the complete vacancy, confirm the employer's identity, and check the date, location, work arrangement and application method. Job aggregators may display information supplied by external sources, and a listing can change or close after it first appears. If the application link redirects to another website, make sure the destination looks legitimate before sharing personal information.</p>
      <p className={p}>Try changing one part of your request when the first results are too broad. Add a city, a seniority level, a specific skill or the kind of schedule you can work. If there are too few matches, broaden your wording: related roles may use different job titles even when the day-to-day work overlaps. For example, people exploring data work may compare analyst, reporting, business intelligence and junior data roles rather than searching one exact phrase only.</p>
      <p className={p}>It is also worth keeping expectations realistic. Search results are influenced by the information available from listing sources and by how a request is interpreted. A missing salary does not mean a job is unpaid, and a displayed salary range should be checked against the employer's original description. SearchYouAJob does not guarantee that a role is still available, that every suitable vacancy will appear, or that an employer will contact you.</p>

      <h2 className={h2}>Using AI suggestions responsibly</h2>
      <p className={p}>AI can help turn an informal request into search terms and can make results easier to discuss, but it can misunderstand an unusual title, ambiguous location or a preference expressed indirectly. Be specific when something matters. State whether you need fully remote work or would accept hybrid work, whether you are looking for an internship or a permanent role, and which locations you can realistically work in. Review the results rather than treating an AI-generated explanation as proof that a vacancy is right for you.</p>
      <p className={p}>Use your own judgment for important decisions. Never pay an unfamiliar recruiter to secure an interview, and be cautious when a supposed employer asks for sensitive identity or banking information before a legitimate hiring process requires it. Verify companies using official websites and trusted contact details. The service is a discovery and preparation aid, not a background-check provider or a substitute for direct communication with an employer.</p>

      <h2 className={h2}>Accessibility, devices and practical use</h2>
      <p className={p}>You can use the public job tools without creating an account. The pages are designed to work in modern browsers on desktop and mobile devices, although a particular browser may handle a large file or an embedded PDF differently. If a preview does not display correctly, try opening the output in a new tab or using a different up-to-date browser. Keep your browser updated and download important work before closing the page.</p>
      <p className={p}>When preparing an application on a shared computer, protect your privacy. Do not save passwords in a public browser, sign out when finished, and remove downloaded copies if they should not remain on that device. On your own device, keep a private folder for your master resume, tailored versions, certificates and cover letters. Use descriptive filenames so you can quickly identify the version that matches a particular role.</p>

      <h2 className={h2}>What SearchYouAJob does not promise</h2>
      <p className={p}>SearchYouAJob does not guarantee employment, interviews, a particular salary or the completeness of third-party job listings. It does not replace the employer's application process, and its tools cannot guarantee that a document will pass every applicant tracking system or satisfy every portal. A clean layout and careful wording can help a document communicate clearly, but hiring decisions remain with employers.</p>
      <p className={p}>Features may change as the project develops. We aim to make the experience practical and straightforward, but users should check important information at its source and keep their own copies of important documents. If you notice a broken link, an incorrect description or a usability issue, use a contact method published on the website if one is available.</p>

      <h2 className={h2}>More ways to use the platform</h2>
      <p className={p}>The <Link href="/tools" className="text-[#2E5C8A] underline">Job Tools directory</Link> groups utilities by task so you can choose the right one without browsing every page. Use the <Link href="/tools/resume-maker" className="text-[#2E5C8A] underline">Resume Maker</Link> for a concise resume, the <Link href="/tools/cv-maker" className="text-[#2E5C8A] underline">CV Maker</Link> when a fuller history is appropriate, or the <Link href="/tools/pdf-maker" className="text-[#2E5C8A] underline">PDF Maker</Link> to prepare plain text as a PDF. If you have scanned pages, the <Link href="/tools/image-to-pdf" className="text-[#2E5C8A] underline">Image to PDF tool</Link> can combine them into one document.</p>
      <p className={p}>You can also review the <Link href="/privacy-policy" className="text-[#2E5C8A] underline">Privacy Policy</Link> to understand how website features, third-party integrations and analytics are handled. Reading the policy is particularly important before entering personal information into any online service.</p>

      <h2 className={h2}>Frequently asked questions about job searching</h2>
      <h3 className={h3}>How should I describe the job I want?</h3>
      <p className={p}>Start with a role or skill, then add the location, experience level and work arrangement. A specific request such as “entry-level Python developer in Berlin” gives the search more context than “technology job.”</p>
      <h3 className={h3}>What if I get irrelevant results?</h3>
      <p className={p}>Try a more precise title, include a location, or specify the type of work you want. If you get too few results, broaden the wording or consider related roles. Check the original listing to confirm the details.</p>
      <h3 className={h3}>Does SearchYouAJob apply on my behalf?</h3>
      <p className={p}>No. It helps you discover listings and prepare files. You remain responsible for reviewing the vacancy, completing the employer's application and deciding what information to submit.</p>
      <h3 className={h3}>Where can I read about data handling?</h3>
      <p className={p}>Read the <Link href="/privacy-policy" className="text-[#2E5C8A] underline">Privacy Policy</Link> for details about the website's job-search processing, third-party services, analytics and account features.</p>

      <h2 className={h2}>Start your search</h2>
      <p className={p}>Ready? <Link href="/" className="text-[#2E5C8A] underline">Search for a job now</Link> or <Link href="/tools" className="text-[#2E5C8A] underline">open the job tools</Link>.</p>
    </main>
  );
}
