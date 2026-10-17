import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/site/JsonLd";
import ContactForm from "@/components/site/ContactForm";
import { CONTACT_EMAIL, SITE_URL as SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact SearchYouAJob: Support, Feedback, Tool Requests",
  description:
    "Contact SearchYouAJob to report a bug, suggest a free tool, give job search feedback, report a listing or ask about privacy. See what to include for a fast reply.",
  keywords: ["contact searchyouajob", "report a bug online tool", "suggest a new online tool", "job listing report", "searchyouajob support", "privacy request"],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact SearchYouAJob",
    description: "Report a problem, suggest a tool, share feedback or ask a privacy question. Here is how to reach us and what to include.",
    url: `${SITE}/contact`,
    siteName: "SearchYouAJob",
    type: "website",
  },
};

const faq = [
  { q: "How quickly will you reply?", a: "This site is run by an independent developer, so replies are not instant. We read every message and try to answer within a few working days. Bug reports with clear steps usually get the fastest answer." },
  { q: "Can you recover a file or text I lost in a tool?", a: "No. The tools run in your browser and we never receive your files or text, so we have no copy to give back. The resume and CV makers keep a draft in your browser, so try the same browser and device first." },
  { q: "Can you remove a job listing?", a: "Listings come from Adzuna and belong to the employers. We cannot edit them, but we can pass on a report and stop showing a listing if it is clearly wrong or unsafe. Tell us the job title, company and what is wrong." },
  { q: "Will you add the tool I suggested?", a: "We cannot promise any tool. Requests that come up often, that can run privately in a browser and that are useful to many people move up the list." },
  { q: "Can you give career, legal or medical advice?", a: "No. We can help with how the site works. The calculators and tools give general information only and are not professional advice." },
  { q: "How do I delete my account?", a: "Email us from the address you used to sign up, with the subject Privacy or data request, and we will remove your account and saved conversations." },
  { q: "Do you offer advertising or sponsored listings?", a: "We are open to relevant partnerships that respect user privacy. Tell us about your product and the audience you want to reach." },
];

const h2 = "mt-12 text-2xl font-semibold";
const p = "mt-3 leading-relaxed text-zinc-700";
const link = "text-[#2E5C8A] underline";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "ContactPage", name: "Contact SearchYouAJob", url: `${SITE}/contact`, description: "How to contact SearchYouAJob for support, feedback, tool requests and privacy questions." },
          { "@type": "Organization", name: "SearchYouAJob", url: SITE + "/", contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: CONTACT_EMAIL, availableLanguage: "English" } },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
            { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE}/contact` } ] },
          { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      }} />

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Contact SearchYouAJob</h1>
      <p className="mt-4 text-lg text-zinc-600">
        Found a bug, want a tool we do not have, or have a question about your data? Here is how to reach us, and what to include so that we can help quickly.
      </p>

      <h2 className={h2}>How to reach us</h2>
      <p className={p}>The best way to contact us is by email at <a className={link} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. You can also use the form below, which prepares an email for you in your own email app. We do not run a phone line or a live chat, because the site is maintained by a small independent project and email lets us give each message proper attention.</p>
      <p className={p}>Before you write, check whether the answer is already on the site. The <Link href="/about" className={link}>about page</Link> explains how the job search works, each tool page has a questions section at the bottom and the <Link href="/privacy" className={link}>privacy policy</Link> explains how your data is handled.</p>

      <ContactForm />

      <h2 className={h2}>Reporting a bug or a tool that does not work</h2>
      <p className={p}>Most problems are easy to fix once we can see them happen. The more precisely you describe what you did, the faster we can find the cause. A good report answers these questions:</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-zinc-700">
        <li>Which tool or page had the problem, ideally with its web address.</li>
        <li>What you expected to happen and what happened instead, including any error message.</li>
        <li>Your browser and its version, for example Chrome 130 or Safari on iPhone, and your device and operating system.</li>
        <li>The steps that led to the problem, and whether it happens every time or only sometimes.</li>
        <li>For file tools, the type and approximate size of the file, such as a 6 MB JPG or a 2 page PDF.</li>
      </ul>
      <p className={p}>Please do not attach sensitive documents such as identity cards, bank statements or signed contracts. Describe the problem or send a harmless sample file instead. Because the tools run in your browser, we can usually reproduce a problem without your real file. A screenshot with personal details hidden is welcome.</p>

      <h2 className={h2}>Suggesting a new tool</h2>
      <p className={p}>The <Link href="/tools" className={link}>free tools</Link> grew from requests like yours, and we keep a list of ideas. A good suggestion tells us what you are trying to do, not just the name of a tool. For example, I need to shrink a photo to under 100 KB for a government form is more useful than I need a compressor, because it shows the real goal and the limits that matter.</p>
      <p className={p}>When we decide what to build next, we look at how many people ask for something, whether it can run privately in the browser without uploading files, and whether we can make it accurate and simple. Tools that need heavy servers, paid data or legal certification are less likely to happen. We cannot promise any tool, but we read every idea.</p>

      <h2 className={h2}>Feedback on job search results</h2>
      <p className={p}>The job search chat turns your description into a search, then shows real listings. If the results missed what you wanted, tell us what you typed, what you expected and what you got. Include the country and city or remote preference if relevant. This helps us improve how requests are understood, for example when a job title has several names or when a location is ambiguous.</p>
      <p className={p}>Please avoid pasting personal information into feedback, such as your phone number, address or identity numbers. The job search is for finding openings, and we cannot make hiring decisions or promise that an employer will respond to your application.</p>

      <h2 className={h2}>Reporting or removing a job listing</h2>
      <p className={p}>Job listings shown in the chat come from Adzuna, a job search engine, and link to the employer or job board that posted them. We do not write or edit the listings. If you see a listing that looks like a scam, asks you to pay to apply, has expired or contains wrong information, email us with the job title, the company name and the link, and explain what is wrong.</p>
      <p className={p}>We can stop showing a listing that is clearly misleading and pass your report on to the provider. If you are an employer who wants a listing changed or taken down, the fastest route is the website where you originally posted it, because that is the source of the listing.</p>
      <p className={p}>A reminder for job seekers: a real employer does not ask you to pay for an application, training or equipment before you start. Be careful with offers that come through messaging apps, and never share bank details or identity documents until you have confirmed the employer is genuine.</p>

      <h2 className={h2}>Privacy and data requests</h2>
      <p className={p}>If you want a copy of your data, want an account and saved conversations deleted, or have a privacy concern, email us with the subject Privacy or data request. Write from the address you used to sign up so that we can match the request to your account. We may ask a question to confirm that you are the account holder before we act.</p>
      <p className={p}>Remember that for the free tools we hold no data about your files or text, because they never leave your browser. The <Link href="/privacy" className={link}>privacy policy</Link> lists the few places where information is shared, such as the job search chat, and how to remove data stored in your own browser.</p>

      <h2 className={h2}>Business, partnerships and press</h2>
      <p className={p}>We are open to conversations with people who build tools, job platforms, education programmes and communities that serve job seekers. If you would like to propose a partnership, a link exchange, a guest article or sponsored content, tell us about your product, your audience and what you have in mind. We only work with offers that are relevant to our visitors and that respect their privacy.</p>
      <p className={p}>Journalists and bloggers writing about job search technology or online tools can use the same address. Mention your publication and your deadline, and we will reply as quickly as we can. Facts about the site, such as the number of tools and how they work, are on the <Link href="/about" className={link}>about page</Link>.</p>

      <h2 className={h2}>What we cannot help with</h2>
      <p className={p}>To save you time, here are the requests we cannot handle. We cannot recover files or text from the tools, because we never receive them. We cannot give career, legal, medical or financial advice, and the calculators are for general information only. We cannot contact employers on your behalf, speed up a hiring process or guarantee an interview. We cannot access your accounts on other websites, such as job boards or email providers.</p>
      <p className={p}>If you need help of that kind, a careers adviser, a lawyer, a doctor or an accountant is the right person to ask. For problems with a particular employer or job board, contact them directly.</p>

      <h2 className={h2}>Tips for a quick, useful reply</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-zinc-700">
        <li>Use a clear subject line that names the tool or the topic.</li>
        <li>Send one problem per email so that each can be tracked and answered.</li>
        <li>Write in full sentences and include the details above, so we do not need to ask basic questions.</li>
        <li>Check your spam folder if you are expecting a reply, since replies from new addresses sometimes land there.</li>
        <li>Be patient and polite. We are a small independent project and we always read what you send.</li>
      </ul>

      <h2 className={h2}>Frequently asked questions</h2>
      <div className="mt-3">
        {faq.map((f) => (
          <details key={f.q} className="border-b border-zinc-200 py-3">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <p className="mt-2 leading-relaxed text-zinc-700">{f.a}</p>
          </details>
        ))}
      </div>

      <h2 className={h2}>Useful links</h2>
      <p className={p}>While you wait for a reply, you may find the answer in one of these places: the <Link href="/tools" className={link}>free tools directory</Link>, the <Link href="/about" className={link}>about page</Link>, the <Link href="/privacy" className={link}>privacy policy</Link> or the <Link href="/" className={link}>job search chat</Link>. Thank you for taking the time to write to us. Every message helps make the site better.</p>
    </main>
  );
}
