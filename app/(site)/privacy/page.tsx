import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/site/JsonLd";
import { CONTACT_EMAIL, LAST_UPDATED, SITE_URL as SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy: How We Handle Your Data and Files",
  description:
    "Read how SearchYouAJob handles data: free tools process files in your browser, what the job search chat shares with providers, accounts, analytics, cookies and your rights.",
  keywords: ["searchyouajob privacy policy", "online tools privacy", "browser based tools no upload", "job search chat privacy", "data protection"],
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy | SearchYouAJob",
    description: "Plain-English privacy policy: tools run in your browser, and the few places data leaves your device are listed.",
    url: `${SITE}/privacy`,
    siteName: "SearchYouAJob",
    type: "website",
  },
};

type Section = { id: string; h: string; paras?: string[]; list?: string[]; after?: string[] };

const sections: Section[] = [
  {
    id: "summary",
    h: "The short version",
    paras: [
      "SearchYouAJob has two parts: a collection of free tools and an AI job search chat. The tools, such as the resume maker, PDF tools, image tools, calculators and converters, run inside your web browser. The files you open and the text you type into them are processed on your own device and are not sent to our servers.",
      "The job search chat is different, because finding jobs needs a server. Your messages are sent to our server, then on to an AI model provider and a job listings provider to produce results. If you choose to create an account, your saved conversations are stored with our database provider. The sections below explain each case in detail.",
    ],
  },
  {
    id: "who",
    h: "Who we are",
    paras: [
      "SearchYouAJob is operated by an independent developer and published at " + SITE + ". In this policy, we, us and our mean the operator of SearchYouAJob. If you have a question about this policy or about your data, write to us at " + CONTACT_EMAIL + " or use the contact page.",
      "This policy applies to the SearchYouAJob website, its tools and its job search chat. It does not apply to other websites that we link to, including the employer and job board pages that open when you select a job listing.",
    ],
  },
  {
    id: "tools",
    h: "What happens when you use the free tools",
    paras: [
      "Every tool on the site is built to work locally. When you drop an image into the converter, paste text into the word counter, enter numbers into a calculator or build a resume, the work is done by code running in your browser. We do not receive the image, the text, the numbers or the finished file, and we cannot see them.",
      "Some tools remember your work on your device so that you do not lose it. The resume and CV makers save a draft of the text you enter in your browser's local storage, without your photo, so it is there when you return. This draft stays on your device. You can remove it by clearing your browser's site data for this website.",
      "A few tools make a request to a third party because they need a resource that is not on our site. The signature generator loads handwriting fonts from Google Fonts so that typed signatures can be drawn in script styles. Your signature itself is never sent anywhere.",
    ],
  },
  {
    id: "chat",
    h: "What happens when you use the job search chat",
    paras: [
      "When you send a message in the job search chat, your message and the recent conversation are sent to our server. The server first asks an AI model, provided by Google through its Gemini API, to turn your message into search filters such as the job title, location and whether you want remote work. It then sends those filters to the Adzuna job search service to retrieve matching listings. Finally, it sends your message, the listings and the earlier conversation to the AI model again to write a short reply.",
      "Because your messages are processed by these providers, please do not include sensitive personal information in the chat, such as identity numbers, financial details, health information or passwords. Describe the job you want instead. Our server records technical information about requests, such as how long each step took and any error messages, in the hosting provider's logs. We do not use the chat to build advertising profiles.",
      "Job listings come from Adzuna and link to the employer's or job board's own website. We do not control those websites. When you click a listing you leave SearchYouAJob, and the privacy policy of that website applies.",
    ],
  },
  {
    id: "accounts",
    h: "Accounts and saved conversations",
    paras: [
      "You do not need an account to search for jobs or to use any tool. If you choose to sign up, you give us an email address and a password. Account sign-in is handled by Supabase, our authentication and database provider. We do not store your password ourselves, and it is handled by Supabase's authentication service.",
      "When you are signed in, your conversations are saved so that you can come back to them. We store the title of each conversation, the messages you and the assistant exchanged and the job listings that were shown, linked to your account. If you used the chat before signing in, the conversations from that visit are saved to your account when you sign in.",
      "If you want your account or saved conversations deleted, write to us at the address in the contact section and we will remove them. We may ask you to confirm that the request comes from the account holder.",
    ],
  },
  {
    id: "analytics",
    h: "Analytics and performance measurement",
    paras: [
      "We use Vercel Web Analytics and Vercel Speed Insights, provided by our hosting company, to understand how many people visit, which pages are popular and how quickly pages load. These services collect information such as the page visited, the referring site, the country, the type of browser and device and performance timings. They are designed to measure visits without using advertising cookies and without building a profile of you across other websites.",
      "We use this information to find broken pages, to make the site faster and to decide which tools to improve or add. We do not use it to identify individual people, and we do not combine it with the content of your tool use, which we never receive.",
    ],
  },
  {
    id: "cookies",
    h: "Cookies and local storage",
    paras: [
      "We do not use advertising or marketing cookies. The site stores a small number of items in your browser's local storage, which is similar to a cookie but stays on your device and is not sent to our server with every request.",
    ],
    list: [
      "Theme: your light or dark mode choice, stored under the name theme.",
      "Resume and CV drafts: the text you enter into the resume or CV maker, stored so you can continue later. Photos are not saved.",
      "Sign-in session: if you create an account, the authentication service keeps a session token in your browser so that you stay signed in.",
    ],
    after: [
      "You can delete all of these at any time through your browser's settings. Doing so signs you out and removes saved drafts from that device. If your browser blocks local storage, the site still works, but drafts and preferences are not remembered.",
    ],
  },
  {
    id: "third-parties",
    h: "Service providers and third parties",
    paras: [
      "We use a small number of providers to run the site. Each has its own privacy policy that explains what it does with the data it receives, and we ask you to read them if you want detail.",
    ],
    list: [
      "Vercel hosts the website and provides analytics and performance measurement. See vercel.com/legal/privacy-policy.",
      "Supabase provides sign-in and the database that stores accounts and saved conversations. See supabase.com/privacy.",
      "Google provides the Gemini AI model that reads and writes chat messages, and Google Fonts, which supplies typefaces used by the site. See policies.google.com/privacy.",
      "Adzuna provides the job listings. Search terms, location and country derived from your message are sent to Adzuna to find matches.",
    ],
    after: [
      "We do not sell your personal information. We do not share it with advertisers. We share it with the providers above only to the extent needed to run the features you use, and if we are legally required to do so.",
    ],
  },
  {
    id: "basis",
    h: "Why we process data and on what basis",
    paras: [
      "Where data protection laws such as the GDPR and the UK GDPR apply, we rely on the following reasons. To provide the job search and your account, we process data because it is necessary to deliver the service you asked for. To keep the site secure, fix errors and measure performance, we rely on our legitimate interest in running a reliable website, balanced against your rights. Where we ask for your consent, you can withdraw it at any time.",
      "The tools themselves do not involve us processing your content, because it stays in your browser.",
    ],
  },
  {
    id: "rights",
    h: "Your rights",
    paras: [
      "Depending on where you live, you may have the right to know what personal data we hold about you, to receive a copy, to have inaccurate data corrected, to have your data deleted, to restrict or object to certain processing and to move your data to another service. Residents of some regions, including California, have similar rights, including the right to know and to delete, and the right not to be discriminated against for using them.",
      "You can use most of these rights by writing to us. We will respond within the time that the law requires and may need to verify your identity first. If you are unhappy with how we handle your request, you can complain to your local data protection authority. We would appreciate the chance to fix the problem first.",
    ],
  },
  {
    id: "retention",
    h: "How long we keep data",
    paras: [
      "Data that stays in your browser stays until you delete it. Account data and saved conversations are kept while your account exists, and deleted when you ask us to remove it. Server logs and analytics data are kept for the period set by our hosting provider and are used only for operating and improving the site.",
      "We do not keep a copy of the files or text you process with the tools, because we never receive them.",
    ],
  },
  {
    id: "security",
    h: "How we protect data",
    paras: [
      "The site is served over HTTPS, so data between your browser and our servers is encrypted in transit. Sign-in and the database are handled by a specialised provider, and secret keys for the AI and job services are kept on the server and are not sent to your browser. Keeping tool processing in your browser also limits what could ever be exposed.",
      "No system is perfectly secure, and we cannot promise absolute security. Use a strong, unique password for your account, keep your devices up to date and tell us at once if you suspect that your account has been misused.",
    ],
  },
  {
    id: "children",
    h: "Children",
    paras: [
      "SearchYouAJob is intended for people who are old enough to look for work and is not directed at children. We do not knowingly collect personal information from children under 13, or under 16 where the law sets that age. If you believe that a child has given us personal information, contact us and we will delete it.",
    ],
  },
  {
    id: "transfers",
    h: "International transfers",
    paras: [
      "Our providers operate data centres in several countries, so information from the job search chat and from accounts may be processed outside the country where you live, including in the United States. Where the law requires safeguards for such transfers, we rely on the arrangements our providers offer, such as standard contractual clauses. The tools do not transfer your content anywhere, because they run on your device.",
    ],
  },
  {
    id: "changes",
    h: "Changes to this policy",
    paras: [
      "We may update this policy when the site changes, for example when we add a feature that handles data differently, or when the law changes. The date at the top shows when it was last updated. If we make a significant change, we will make it visible on the site. Please check back from time to time.",
    ],
  },
  {
    id: "contact",
    h: "Contact us about privacy",
    paras: [
      "For questions about this policy, to use your rights or to report a privacy concern, email " + CONTACT_EMAIL + ". Please say that your message is about privacy and tell us which part of the site you used so that we can find the right information. You can also use the contact page for general questions and bug reports, but please do not send sensitive documents by email.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", name: "Privacy Policy", url: `${SITE}/privacy`, description: "How SearchYouAJob handles data, files, accounts, analytics and cookies.", dateModified: "2026-10-13" },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
            { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE}/privacy` } ] },
        ],
      }} />

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-zinc-500">Last updated: {LAST_UPDATED}</p>
      <p className="mt-4 text-lg text-zinc-600">
        This policy explains what SearchYouAJob does and does not do with your information, in plain language. The short answer for the free tools is that your files stay on your device.
      </p>

      <nav aria-label="Contents" className="mt-8 rounded-xl border border-zinc-200 bg-white p-4">
        <p className="font-medium">Contents</p>
        <ol className="mt-2 grid list-decimal gap-x-8 gap-y-1 pl-5 text-sm sm:grid-cols-2">
          {sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="text-[#2E5C8A] underline">{s.h}</a></li>)}
        </ol>
      </nav>

      {sections.map((s) => (
        <section key={s.id} id={s.id} className="mt-10 scroll-mt-20">
          <h2 className="text-2xl font-semibold">{s.h}</h2>
          {s.paras?.map((t, i) => <p key={i} className="mt-3 leading-relaxed text-zinc-700">{t}</p>)}
          {s.list && <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-zinc-700">{s.list.map((t, i) => <li key={i}>{t}</li>)}</ul>}
          {s.after?.map((t, i) => <p key={i} className="mt-3 leading-relaxed text-zinc-700">{t}</p>)}
        </section>
      ))}

      <p className="mt-12 text-zinc-700">
        Related pages: <Link href="/contact" className="text-[#2E5C8A] underline">Contact</Link>, <Link href="/about" className="text-[#2E5C8A] underline">About SearchYouAJob</Link> and the <Link href="/tools" className="text-[#2E5C8A] underline">free tools</Link>.
      </p>
    </main>
  );
}
