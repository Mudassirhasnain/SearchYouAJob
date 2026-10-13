import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/site/JsonLd";

const SITE = "https://searchyouajob.vercel.app";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read how SearchYouAJob handles information used by its job search, browser-based tools, account features, hosting and analytics.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | SearchYouAJob",
    description: "Information about data handling, job-search integrations, account features and browser-based tools.",
    url: `${SITE}/privacy-policy`,
    siteName: "SearchYouAJob",
    type: "website",
  },
};

const heading = "mt-9 text-xl font-semibold text-zinc-900";
const paragraph = "mt-3 leading-relaxed text-zinc-700";

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Privacy Policy",
        url: `${SITE}/privacy-policy`,
        description: "Privacy information for SearchYouAJob visitors and users.",
      }} />
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:underline">Home</Link> / <span className="text-zinc-700">Privacy Policy</span>
      </nav>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-zinc-500">Last updated: October 13, 2026</p>
      <p className="mt-5 text-lg leading-relaxed text-zinc-600">
        This policy explains how SearchYouAJob handles information when you visit the website, use the conversational job search, create or access an account, or use the available resume, CV, PDF and image utilities. Please read it before submitting personal information. The precise data handled can depend on which feature you choose and on the services needed to operate that feature.
      </p>

      <h2 className={heading}>1. Who this policy covers</h2>
      <p className={paragraph}>This policy applies to the public SearchYouAJob website at searchyouajob.vercel.app and the features provided through its pages. It describes the website's current implementation in general terms, not the separate privacy practices of an employer, job listing provider, AI provider, authentication provider or analytics provider. Those services may have their own terms and policies, which you should review when using them.</p>
      <p className={paragraph}>SearchYouAJob is a developing web project. Features and service providers may change. This page should be reviewed and updated when the implementation changes. It is general information and is not a legal opinion or a promise that the website meets every legal requirement in every country.</p>

      <h2 className={heading}>2. Information you choose to provide</h2>
      <p className={paragraph}>When you use the job search, you may type a message containing job titles, skills, preferred locations, seniority, remote-work preferences or other details about the work you want. Avoid including unnecessary sensitive personal information in a search message. The feature is designed to find work opportunities; it does not need your passwords, banking details, identity-document numbers or private information about other people.</p>
      <p className={paragraph}>If you choose to create an account or log in, the authentication interface asks for an email address and password. Authentication is implemented using Supabase Auth. Your credentials and account-related information are therefore handled by the authentication service as part of providing that feature. Do not reuse a password that protects another important account.</p>
      <p className={paragraph}>Resume and CV tools ask you to enter professional and contact details if you want those details included in a document. Other utilities may process text, PDFs, photographs or image files that you select. You are responsible for ensuring that you have permission to use the information and files you provide.</p>

      <h2 className={heading}>3. How the AI-assisted job search works</h2>
      <p className={paragraph}>When you submit a job-search message, the website's server sends the message to an AI service through Google's Gemini integration to extract search terms and relevant filters. The service then requests job listings from Adzuna using the extracted terms and supported location information. The website makes another AI request to produce a short response based on your request and the returned listings. This means the content you submit to the job search is not processed solely on your device.</p>
      <p className={paragraph}>The chat interface can send recent conversation history along with a follow-up message so the response can take the conversation into account. Do not enter secrets or sensitive information into the chat. The AI service and job-listing provider operate under their own service terms and privacy practices. SearchYouAJob does not control how those independent providers handle data under their policies.</p>
      <p className={paragraph}>Job listings are supplied by an external listing service and may include links to third-party sites. Availability, salary, employer details and application requirements can change. Confirm information at the original listing or employer website before relying on it or sending an application.</p>

      <h2 className={heading}>4. Resume, CV, PDF and image tools</h2>
      <p className={paragraph}>The resume and CV builders and the PDF and image utilities are designed so their core document or file processing takes place in your browser. For these tasks, the content you enter or the file you select is processed by the browser feature to create a preview or output file. Keep in mind that the website as a whole also uses hosting, analytics, account and job-search services; saying that a particular utility runs in the browser does not mean every website feature is offline or that no technical information is processed by the site.</p>
      <p className={paragraph}>Before using a browser-based tool on a shared computer, consider who may have access to the device or downloaded files. When you download a result, it is saved through your browser's download process and may remain in the device's downloads folder until you remove it. SearchYouAJob cannot delete a file that you have saved to your own device. Check the final document before sharing it and remove personal details that are not required by the recipient.</p>

      <h2 className={heading}>5. Cookies, local storage and sessions</h2>
      <p className={paragraph}>The account feature uses Supabase authentication in the browser, which may store session information in browser storage so that a signed-in state can be maintained. Browser storage is controlled through your browser settings. Clearing it may sign you out or affect site behavior. The exact storage behavior can depend on the authentication library and its configuration.</p>
      <p className={paragraph}>The website also loads Vercel Analytics and Vercel Speed Insights to understand general site usage and performance. These services may process technical information about visits, page interactions or device and browser performance according to their own implementation and policies. We do not describe these services as a guarantee of complete anonymity. You can review the privacy information published by Vercel and use browser privacy controls where available.</p>

      <h2 className={heading}>6. Hosting, security logs and technical information</h2>
      <p className={paragraph}>The website is hosted on Vercel. Like most hosted web applications, the service may process technical request information needed to deliver pages, diagnose failures, protect the service and maintain performance. The chat API logs request-processing timings and errors for operational debugging. Do not assume that every infrastructure log is under the direct control of the website owner or that technical logs are retained for a particular period unless the relevant provider documents that period.</p>
      <p className={paragraph}>Reasonable security measures should be used to protect a web service, but no website, network transmission or storage system can be guaranteed completely secure. Keep your account password private, use a trusted device and report suspicious behavior through a verified contact channel if one is published.</p>

      <h2 className={heading}>7. Why information may be processed</h2>
      <p className={paragraph}>Information may be processed to respond to your job-search request, identify relevant listing filters, retrieve job results, generate a conversational explanation, operate account sign-in, provide document tools, keep the website functioning, understand performance, troubleshoot errors and protect the service. Information may also be processed when necessary to respond to a valid legal request or address misuse, security incidents or disputes.</p>
      <p className={paragraph}>The website should not use information for a purpose materially different from the one described here without updating this policy or providing additional information where required. If a feature asks for information that is not needed for its task, consider whether you want to use that feature.</p>

      <h2 className={heading}>8. When information may be shared</h2>
      <p className={paragraph}>Information may be processed by providers needed to run the website, including hosting and performance services, Supabase for authentication, Google's AI service for the job-search workflow, and Adzuna for job listings. These services receive information relevant to the request they handle. The site may also disclose information where required by applicable law or where reasonably necessary to protect users, the website or others from fraud, abuse or security threats.</p>
      <p className={paragraph}>When you follow an external job link, you leave the SearchYouAJob website. The destination website may collect information directly from you under its own privacy policy. Review the destination and its policies before creating an account, uploading a resume or providing contact details. SearchYouAJob is not responsible for the independent practices of external websites.</p>

      <h2 className={heading}>9. Retention and deletion</h2>
      <p className={paragraph}>Retention depends on the type of information and the service involved. A file processed in your browser may remain on your device if you choose to download it. Account information is managed through the authentication service. Technical logs and analytics data may be retained according to hosting and analytics provider settings and policies. This website does not promise a single retention period for all information handled by every provider.</p>
      <p className={paragraph}>If you want to stop using the site, you can stop submitting new requests and sign out of your account. Removing local browser storage may clear the local session but does not necessarily delete account records held by an authentication provider. For account deletion or a data request, use a verified contact method published by the website owner if available and identify the request without sending passwords or other secrets.</p>

      <h2 className={heading}>10. Your choices and privacy rights</h2>
      <p className={paragraph}>Depending on your location and applicable law, you may have rights to request access to, correction of or deletion of certain personal information, or to object to or restrict some processing. The availability and scope of these rights vary. You can choose not to use account features, avoid entering unnecessary personal details in job-search messages, manage browser storage and use your browser's privacy controls. Some features may not work as expected if you block required storage or scripts.</p>
      <p className={paragraph}>If you submit a privacy request, provide enough information for the website owner to understand and route it, but do not include a password or a full copy of an identity document unless a lawful, verified process specifically requires it. The site owner should confirm an appropriate contact address before publishing this page to users.</p>

      <h2 className={heading}>11. Children's privacy</h2>
      <p className={paragraph}>SearchYouAJob is intended for people using job-search and application-preparation tools, not for collecting information from young children. Do not knowingly submit personal information about a child through the service. If you believe a child has provided personal information inappropriately, contact the site owner through a verified contact method, if available, so the concern can be reviewed.</p>

      <h2 className={heading}>12. International use and third-party processing</h2>
      <p className={paragraph}>The website can be accessed from different countries, while its service providers may operate infrastructure in multiple locations. As a result, information may be processed in a location different from yours, subject to the providers' systems and applicable requirements. International visitors should review the relevant provider policies and local privacy rules that apply to them.</p>

      <h2 className={heading}>13. Changes to this policy</h2>
      <p className={paragraph}>This policy may be updated when the website's features, integrations, providers or legal obligations change. The date at the top indicates when this page was last revised. If a change materially affects how information is handled, the website should provide any notice required by applicable law. Review this page periodically if you continue using the service.</p>

      <h2 className={heading}>14. Contact about privacy</h2>
      <p className={paragraph}>For privacy questions, use the official contact method published by the SearchYouAJob website owner, if available. Before this page is treated as final public legal text, the site owner should add and verify a dedicated contact email or other appropriate contact channel. No email address or business identity is invented here because the project files do not establish a verified privacy contact.</p>

      <h2 className={heading}>15. Frequently asked questions</h2>
      <div className="mt-3 divide-y divide-zinc-200">
        <details className="py-3">
          <summary className="cursor-pointer font-medium text-zinc-900">Are my job-search messages processed locally?</summary>
          <p className="mt-2 text-zinc-700">No. The job-search workflow sends messages to the server and uses an AI service and a job-listing provider to process the request. Avoid entering confidential information into the chat.</p>
        </details>
        <details className="py-3">
          <summary className="cursor-pointer font-medium text-zinc-900">Are my files uploaded when I use a document tool?</summary>
          <p className="mt-2 text-zinc-700">The core processing of the resume, CV, PDF and image utilities is designed to happen in the browser. Downloaded files may remain on your device. Other site features have separate data flows, as described above.</p>
        </details>
        <details className="py-3">
          <summary className="cursor-pointer font-medium text-zinc-900">Does the website use analytics?</summary>
          <p className="mt-2 text-zinc-700">Yes. The project integrates Vercel Analytics and Vercel Speed Insights for site usage and performance measurement. Review Vercel's own privacy documentation for further details about its processing.</p>
        </details>
        <details className="py-3">
          <summary className="cursor-pointer font-medium text-zinc-900">Can I delete a file after downloading it?</summary>
          <p className="mt-2 text-zinc-700">You can delete downloaded files using your device's file manager. The website cannot remotely remove a file saved to your personal device.</p>
        </details>
      </div>

    </main>
  );
}
