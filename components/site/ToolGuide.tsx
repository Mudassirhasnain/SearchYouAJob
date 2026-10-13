import Link from "next/link";
import type { Tool } from "@/lib/tools";

export default function ToolGuide({ tool }: { tool: Tool }) {
  const name = tool.name;
  const lower = name.toLowerCase();
  const localProcessing = ["resume", "cv", "pdf-reader", "text-pdf", "image-pdf", "convert", "compress"].includes(tool.kind);
  const purpose = tool.kind === "resume"
    ? "present relevant experience, skills and achievements in a concise format that is easy for a recruiter to scan"
    : tool.kind === "cv"
    ? "organize a fuller professional or academic history, including the details an employer or institution asks you to provide"
    : tool.kind === "pdf-reader"
    ? "open application documents and review their contents without needing to install a separate desktop application"
    : tool.kind === "text-pdf"
    ? "turn plain text into a portable document that is easier to share or submit to an application portal"
    : tool.kind === "image-pdf"
    ? "combine image files or scans into a single document when an application requests one PDF"
    : tool.kind === "convert"
    ? "change an image into a more suitable file format for a website, application form or document"
    : tool.kind === "compress"
    ? "reduce an image's file size when an upload form has a size limit or a file is slow to send"
    : "remove an image background when a clean subject image is more useful than the original scene";
  const audience = tool.category === "Resume and CV"
    ? "job applicants, graduates, career changers and people updating an existing application document"
    : tool.category === "PDF"
    ? "applicants handling job descriptions, cover letters, certificates, forms and other documents"
    : "people preparing profile pictures, portfolio images and files for online application forms";

  return (
    <section className="mt-12 space-y-10 text-zinc-700 leading-relaxed">
      <section>
        <h2 className="text-2xl font-semibold text-zinc-900">When this {lower} is useful</h2>
        <p className="mt-3">The {name} is designed to {purpose}. It is one focused part of a larger application workflow: identify an opportunity, prepare the requested information, check that your files meet the instructions, and submit the application through the employer or platform. Keeping each step simple can reduce last-minute formatting problems and help you spend more attention on the quality of your application.</p>
        <p className="mt-3">This tool can be useful for {audience}. You do not need to be a designer or technical specialist to get started. Follow the on-screen controls, review the result before saving it, and keep an original copy of any important source material. A tool can make a task easier, but it cannot decide what information an employer needs or verify every detail on your behalf.</p>
        <p className="mt-3">Use the {name} when the file or document you have is close to what you need but requires a practical change. If an employer gives precise requirements for page count, dimensions, file format, naming, or content, follow those requirements first. A general-purpose tool should support the application instructions rather than replace them.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-900">A careful workflow for better results</h2>
        <p className="mt-3">Start by gathering the information or source files you intend to use. For a document, check spelling, dates, contact details and section order. For a PDF or image task, make sure you selected the intended file and that it opens correctly. This small review at the beginning prevents avoidable errors from carrying into the finished result.</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li><strong>Confirm the requirement.</strong> Read the application page or instructions and identify the accepted file type, maximum size and any content requirements.</li>
          <li><strong>Prepare the source.</strong> Remove information that is outdated or irrelevant, and make sure the source file is the correct version.</li>
          <li><strong>Use the controls above.</strong> Enter your information or select the file, then follow the instructions displayed by the {name}.</li>
          <li><strong>Inspect the output.</strong> Check that text is readable, images are oriented correctly, sections have not disappeared and the file opens without an error.</li>
          <li><strong>Save a copy and submit deliberately.</strong> Use a clear filename, keep a backup when the document matters, and upload it only to the intended recipient.</li>
        </ol>
        <p className="mt-3">If the result is not right, return to the source and adjust one thing at a time. For example, if a file is still too large, check the source dimensions and format before repeatedly processing it. If a document looks crowded, shorten low-value content before shrinking text until it becomes difficult to read.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-900">Quality checks before you use the result</h2>
        <p className="mt-3">A file that downloads successfully is not automatically ready for a job application. Open the finished file in a second viewer if possible and compare it with the source. Look for clipped lines, unexpected blank pages, missing symbols, distorted photographs or a filename that could be confused with another version. On a phone, check that the most important content remains legible on a smaller screen.</p>
        <p className="mt-3">For employment documents, consistency matters. Use the same spelling of your name and contact details throughout your materials, keep dates accurate, and do not add qualifications or experience you cannot substantiate. For images, check that the subject is clear and that the output does not remove an important edge or detail. For conversions, remember that changing a file's extension alone is not the same as converting its actual format.</p>
        <p className="mt-3">Keep the original source when you may need to make a different version later. You might need a smaller image for one portal and a higher-quality version for another, or a tailored resume for a different role. A tidy folder with descriptive filenames makes these versions easier to distinguish and reduces the chance of sending the wrong attachment.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-900">How it fits into your job search</h2>
        <p className="mt-3">Preparing files is only one part of an effective job search. Begin with roles that match your skills, location preferences and experience. Read the full listing rather than relying only on its title, then identify the requirements you genuinely meet. Use the document you create here to communicate that fit clearly. Avoid sending the same generic application to every employer when the role calls for a specific emphasis.</p>
        <p className="mt-3">SearchYouAJob also provides a conversational job search experience. You can describe the role you want in ordinary language, including a location or a preference for remote work, and review the listings returned by the service. Job listings and availability can change, so confirm important details on the original listing before applying. The search tool does not guarantee that a vacancy remains open or that an employer will respond.</p>
        <p className="mt-3">After finding a suitable opportunity, return to the {name} if you need to refine the relevant file. You can also explore the <Link href="/tools" className="text-[#2E5C8A] underline">complete collection of job tools</Link> for related tasks. This makes it easier to move from discovery to preparation without assuming that any tool can submit an application or secure an interview for you.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-900">Privacy and handling your files</h2>
        <p className="mt-3">Treat resumes, identification documents, certificates, offer letters and personal images as sensitive material. Only select files you intend to process, and avoid using a shared or public computer for confidential documents unless you can remove local copies afterward. When you finish on a shared device, close the relevant tabs and check the device's downloads folder if you saved a file there.</p>
        <p className="mt-3">{localProcessing ? "The document and file utilities are designed to process the selected content in your browser for their core task. The website also uses hosting, analytics and other services for site operation, and the job-search feature has separate server-side integrations. Read the site's Privacy Policy for the distinction between browser-based tools and other website features." : "This image feature processes the image selected for the task. Because browser capabilities and third-party components can vary, review the site's Privacy Policy and the behavior of the feature before using confidential or regulated material."} Do not assume that using a browser-based tool means every part of the website is offline or that the website never receives any information at all.</p>
        <p className="mt-3">Before sharing a finished file, check for private information that the recipient does not need. For example, a resume generally should not contain account passwords, payment details or identity numbers. Send sensitive documents only through a trusted, appropriate channel and follow the recipient's instructions for secure submission.</p>
        <p className="mt-3">You can read the <Link href="/privacy-policy" className="text-[#2E5C8A] underline">SearchYouAJob Privacy Policy</Link> for more information about the website, its job-search integrations, authentication and analytics. If you have a privacy concern, use the contact details published on the site, where available.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-900">Common mistakes to avoid</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Skipping the final preview and discovering a formatting problem only after submission.</li>
          <li>Using an outdated source file or leaving old contact details in a document.</li>
          <li>Assuming a converted or compressed file will be accepted by every website; always check the portal's rules.</li>
          <li>Removing important information simply to make a document shorter or a file smaller.</li>
          <li>Using a tool output without checking that it accurately represents your source material.</li>
          <li>Sending personal documents to an unknown person or an unverified job listing.</li>
        </ul>
        <p className="mt-3">If a website rejects your output, read its error message carefully. The issue might be file size, file type, dimensions, password protection, a corrupted source file or a requirement unrelated to the file itself. Try a different supported source or viewer before assuming the {name} is broken. For employment-related concerns, contact the employer or portal through its official support channel.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-900">Frequently asked questions about using the tool</h2>
        <div className="mt-3 divide-y divide-zinc-200">
          <details className="py-3">
            <summary className="cursor-pointer font-medium text-zinc-900">Is the {name} suitable for every application?</summary>
            <p className="mt-2">It can help with the task it is designed for, but each employer and application portal may have its own requirements. Review those instructions and inspect the output before submitting it.</p>
          </details>
          <details className="py-3">
            <summary className="cursor-pointer font-medium text-zinc-900">Will the tool guarantee a job or interview?</summary>
            <p className="mt-2">No. The tool supports document or file preparation. Hiring decisions depend on the role, your qualifications, the employer's process and other factors outside this website's control.</p>
          </details>
          <details className="py-3">
            <summary className="cursor-pointer font-medium text-zinc-900">Should I keep my original file?</summary>
            <p className="mt-2">Yes. Keeping a source copy lets you correct mistakes, create alternate versions and recover information if you need a different format later.</p>
          </details>
          <details className="py-3">
            <summary className="cursor-pointer font-medium text-zinc-900">Where can I find other tools?</summary>
            <p className="mt-2">Visit the <Link href="/tools" className="text-[#2E5C8A] underline">Job Tools page</Link> to browse resume, CV, PDF and image utilities, or return to the <Link href="/" className="text-[#2E5C8A] underline">job search</Link> to explore listings.</p>
          </details>
        </div>
      </section>
    </section>
  );
}
