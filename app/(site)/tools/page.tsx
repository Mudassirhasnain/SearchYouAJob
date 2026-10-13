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

      <section className="mt-16 max-w-3xl space-y-6 text-zinc-700 leading-relaxed">
        <h2 className="text-2xl font-semibold text-zinc-900">A practical toolkit for the full application process</h2>
        <p>Preparing an application often involves more than writing a resume. You may need to review a job description, produce a tailored CV, convert scanned certificates, resize a profile image or combine supporting pages into a single file. SearchYouAJob brings these small tasks together so you can spend less time switching between unrelated websites and more time checking whether a role is a good fit.</p>
        <p>Each tool has a focused purpose. Start with the requirement from the employer or application portal, choose the matching utility, and inspect the result before submitting it. A conversion cannot correct inaccurate information in a document, and a polished resume cannot make an unsuitable vacancy suitable. The tools are intended to support your work rather than make application decisions for you.</p>
        <h2 className="text-xl font-semibold text-zinc-900">Choose the right tool for the job</h2>
        <p><Link href="/tools/resume-maker" className="text-[#2E5C8A] underline">Resume Maker</Link> helps you assemble a concise professional summary, experience, education and skills. Use it when the employer asks for a resume and you want a clean document that can be scanned quickly. Review the wording carefully and tailor the strongest, most relevant evidence to the vacancy.</p>
        <p><Link href="/tools/cv-maker" className="text-[#2E5C8A] underline">CV Maker</Link> is useful when you need a fuller record of your experience, education, projects, certifications or languages. The meaning of “CV” varies by country and sector, so follow the employer's instructions rather than assuming that every CV should have the same length or format.</p>
        <p><Link href="/tools/pdf-reader" className="text-[#2E5C8A] underline">PDF Reader</Link> lets you open a PDF in the browser, which can help when reviewing a job description, application form or offer letter. Read the complete document and pay attention to eligibility, deadlines, location, working hours and any requested attachments.</p>
        <p><Link href="/tools/pdf-maker" className="text-[#2E5C8A] underline">PDF Maker</Link> turns plain text into a PDF for content such as a simple letter or notes. It is intended for plain text, so if you need advanced formatting, tables or complex typography, prepare the document in a full word processor and export it there.</p>
        <p><Link href="/tools/image-to-pdf" className="text-[#2E5C8A] underline">Image to PDF</Link> can combine photos or scans into one file. Check the order of pages and ensure that every scan is readable. If an application requests a certified document or a particular scanning standard, confirm that your file meets those requirements before uploading.</p>
        <p><Link href="/tools/image-converter" className="text-[#2E5C8A] underline">Image Converter</Link> helps change an image into a supported format, while <Link href="/tools/image-compressor" className="text-[#2E5C8A] underline">Image Compressor</Link> helps reduce file size for upload limits. <Link href="/tools/background-remover" className="text-[#2E5C8A] underline">Background Remover</Link> can help create a cleaner subject image when that is appropriate. None of these image tools can guarantee that a particular portal will accept the result; check its size, dimensions and format requirements.</p>
        <h2 className="text-xl font-semibold text-zinc-900">Make a strong application, not just a neat file</h2>
        <p>Start by reading the vacancy carefully. Identify the core responsibilities, required skills and minimum qualifications. If your experience matches, make the relevant examples easy to find in your application. Use specific, truthful descriptions of what you did, what tools you used and what changed as a result. Numbers can help when they are accurate and meaningful, but never invent performance metrics or responsibilities to make a resume appear stronger.</p>
        <p>Use a consistent name and contact method across your documents. Keep dates in a clear format, proofread for typos and remove outdated information. Avoid unnecessary personal details that the employer has not requested. If you are applying across different countries, check local expectations about CV length, photos, personal information and supporting documents; practices vary and there is no single format that suits every role.</p>
        <p>Before submitting, open the saved file and check it as the recipient might see it. Confirm that the document is not blank, the pages are in the right order and important content has not been cut off. Give the file a professional, descriptive name. Keep a master version in a safe place and create a tailored copy for each role so you do not accidentally overwrite your original.</p>
        <h2 className="text-xl font-semibold text-zinc-900">Privacy and responsible file handling</h2>
        <p>Job applications can contain personal information. Only process the files you need, avoid uploading confidential material to unknown websites and be careful when using shared devices. Some utilities are designed to process content in the browser, while other site features—such as AI-assisted job search, authentication and analytics—use separate services. Read the <Link href="/privacy-policy" className="text-[#2E5C8A] underline">Privacy Policy</Link> for information about those distinctions. Do not assume that every part of a website operates locally just because a specific file tool does.</p>
        <p>SearchYouAJob's job search can help you discover listings, but you should verify vacancies at their original source. Be cautious if a supposed employer asks you to pay for an interview or requests sensitive financial information unusually early. Confirm the company's identity and use official application channels. The tools do not submit applications for you, guarantee interviews or replace your judgment.</p>
        <h2 className="text-xl font-semibold text-zinc-900">Organize a repeatable application routine</h2>
        <p>It helps to use a simple routine for every vacancy. First, save or note the listing and its application deadline. Second, compare the essential requirements with your experience and decide whether the role is worth pursuing. Third, prepare a tailored resume or CV and any requested supporting files. Finally, open each saved document and confirm that it matches the employer's instructions before you submit. This routine is more reliable than rushing through several applications without checking the details.</p>
        <p>Keep a short record of the roles you have applied for, the date you applied, the version of your resume you used and any next steps. Do not store account passwords or unnecessary sensitive information in that record. A basic spreadsheet or personal notes document can be enough. The goal is to remember follow-ups and avoid sending an old version of a file by mistake, not to create extra administrative work.</p>
        <p>When you reuse a resume or letter, review it in context. Remove references to another employer, make sure the position title is correct and choose examples that are relevant to the current role. A concise, accurate application is generally more useful than one that repeats every task you have ever done. If a job asks for a particular format, use that format even if you normally prefer another one.</p>
        <h2 className="text-xl font-semibold text-zinc-900">Understand the limits of file conversion</h2>
        <p>Changing a file format can make it easier to upload or share, but it does not automatically improve the quality of the original content. A compressed image may lose detail; a scanned page may remain difficult to read; and plain text exported to PDF will not gain advanced page design features. If the document must be accessible, searchable or officially certified, confirm the relevant requirements before relying on a conversion.</p>
        <p>Similarly, a clean resume layout cannot guarantee that an applicant tracking system will interpret every document correctly. Systems differ, and employers may configure them in different ways. Use common headings, clear text and consistent dates, then follow any specific instructions in the application portal. Keep a copy of the source document in case you need to revise or export it in another format later.</p>
        <h2 className="text-xl font-semibold text-zinc-900">Continue from tools to job search</h2>
        <p>Once your documents are ready, return to the <Link href="/" className="text-[#2E5C8A] underline">SearchYouAJob homepage</Link> and describe the work you want in everyday language. Mention relevant skills, location, experience level and whether remote work is important. If results are too broad, refine the wording; if there are too few, try related job titles. Always open the original listing to confirm its current status, requirements and application deadline.</p>
        <p>The goal of this toolkit is to make routine application preparation easier, not to promise a shortcut to employment. Clear documents, careful verification and consistent follow-through are still important. Browse the tools above, use only the ones that fit your task, and review every final file before sending it to an employer.</p>
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
