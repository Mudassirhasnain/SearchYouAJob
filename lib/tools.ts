export type ToolKind = "resume" | "cv" | "pdf-reader" | "text-pdf" | "image-pdf" | "convert" | "compress" | "bg-remove";

export type Tool = {
  slug: string;
  name: string;
  short: string;
  category: "Resume and CV" | "PDF" | "Images";
  kind: ToolKind;
  title: string;
  description: string;
  keywords: string[];
  intro: string[];
  steps: string[];
  points: { h: string; p: string }[];
  faq: { q: string; a: string }[];
};

const privacy = {
  h: "Your files stay on your device",
  p: "The work happens inside your browser. Nothing is uploaded to our servers, so private documents stay private.",
};
const free = { q: "Is it free?", a: "Yes. No account, no watermark, no limit on how many times you use it." };

export const TOOLS: Tool[] = [
  {
    slug: "resume-maker",
    name: "Resume Maker",
    short: "Fill in a form, get a clean one-page resume as PDF or Word.",
    category: "Resume and CV",
    kind: "resume",
    title: "Free Resume Maker for Job Applications",
    description:
      "Build a clean, ATS-friendly resume in your browser. Fill in the form, check the live preview, then save it as a PDF or Word file. No sign-up.",
    keywords: ["resume maker", "free resume builder", "ATS friendly resume", "resume template", "make a resume online"],
    intro: [
      "Plenty of good candidates lose out because their resume is hard to read, either for a recruiter skimming it in thirty seconds or for the software that sorts applications first. This resume maker uses a plain single-column layout with real, selectable text, so both can read every line.",
      "You type on the left, the finished page updates on the right. When it looks right, save it as a PDF or download a Word copy to keep editing.",
    ],
    steps: [
      "Add your name, contact details and a two-line summary of what you do.",
      "List your jobs newest first. Start each bullet with what you did, and add numbers where you have them.",
      "Press Save as PDF and choose Save as PDF as the destination, or download the Word version.",
    ],
    points: [
      { h: "A layout that software can read", p: "No tables, icons or text boxes. Headings are real headings and the text can be selected, which is what applicant tracking systems look for." },
      { h: "Built to fit one page", p: "Tight spacing and short bullets keep most early and mid-career resumes on a single A4 page." },
      privacy,
    ],
    faq: [
      { q: "Will this resume pass applicant tracking systems?", a: "The layout is built for it: one column, standard section names, text you can select. No tool can promise a pass, because that also depends on the job description and how you word your experience." },
      { q: "Should I use a resume or a CV?", a: "In the US and Canada employers usually ask for a resume. Elsewhere the two words are often used loosely. If the job post says CV and asks for more detail, try our CV maker." },
      free,
    ],
  },
  {
    slug: "cv-maker",
    name: "CV Maker",
    short: "A longer curriculum vitae with projects, languages and references.",
    category: "Resume and CV",
    kind: "cv",
    title: "Free CV Maker, Curriculum Vitae Builder",
    description:
      "Create a professional CV online with sections for projects, certifications, languages and references. Live preview, PDF and Word download, no sign-up.",
    keywords: ["cv maker", "curriculum vitae builder", "free cv maker", "cv template", "make a cv online"],
    intro: [
      "A CV has more room than a resume. It is the right document for jobs outside North America, graduate study, research roles and any application that asks for your full history rather than a one-page pitch.",
      "This builder adds the sections those applications expect: projects and publications, certifications, languages, personal details and references. Choose a Modern layout with a colour header, skill tags and an optional photo, or the Classic layout if the employer uses screening software. Leave a section empty and it disappears from the page.",
    ],
    steps: [
      "Enter your details and a short professional profile.",
      "Add experience, education and any projects, certifications or languages that support the role.",
      "Check the preview, then save it as a PDF or download the Word version.",
    ],
    points: [
      { h: "Two templates, your colour", p: "Modern for a polished look, Classic for plain text that any screening system can read. Pick the accent colour that suits you." },
      { h: "Extra sections for longer histories", p: "Projects, certifications, languages and references sit alongside the usual experience and education." },
      privacy,
    ],
    faq: [
      { q: "How long should a CV be?", a: "Two pages is common for most roles. Research and academic CVs can run longer. Cut anything that does not help with this particular job." },
      { q: "Do I need a photo on my CV?", a: "Not unless the country or employer expects one. This template leaves it out, which also keeps it simple for screening software." },
      free,
    ],
  },
  {
    slug: "pdf-reader",
    name: "PDF Reader",
    short: "Open and read a PDF in your browser, nothing uploaded.",
    category: "PDF",
    kind: "pdf-reader",
    title: "Free Online PDF Reader, No Upload Needed",
    description:
      "Open and read PDF files in your browser. Job descriptions, offer letters and application forms open privately on your device. Nothing is uploaded.",
    keywords: ["pdf reader", "online pdf viewer", "open pdf online", "read pdf in browser", "view pdf"],
    intro: [
      "Job hunting means a lot of PDFs: job descriptions, offer letters, contracts, forms and your own resume. This reader opens them straight in the browser, which helps when you are on a borrowed laptop or a phone without a PDF app.",
      "The file is opened locally. It is never sent anywhere, so an offer letter or ID scan stays on your device.",
    ],
    steps: ["Choose a PDF or drag it onto the box.", "Read it in the viewer. Use the viewer's own controls to zoom, search and print.", "Open a different file any time, or open the current one in a full tab."],
    points: [
      { h: "Private by default", p: "The PDF is read from your device and never uploaded." },
      { h: "Uses your browser's own viewer", p: "You get the zoom, search and print tools you already know." },
      { h: "Works for job paperwork", p: "Offer letters, contracts, certificates and application forms all open the same way." },
    ],
    faq: [
      { q: "Why does the PDF not show on my phone?", a: "Some mobile browsers cannot show PDFs inside a page. Use the Open in new tab button, which hands the file to your phone's own viewer." },
      { q: "Can I edit the PDF here?", a: "No, this tool is for reading. To make a new PDF, try the PDF maker or Image to PDF." },
      free,
    ],
  },
  {
    slug: "pdf-maker",
    name: "PDF Maker",
    short: "Turn typed or pasted text into a downloadable PDF.",
    category: "PDF",
    kind: "text-pdf",
    title: "Free PDF Maker: Turn Text into a PDF",
    description:
      "Type or paste text and download it as a PDF. Good for cover letters, notes and references. Runs in your browser, no sign-up.",
    keywords: ["pdf maker", "text to pdf", "create pdf online", "make a pdf", "cover letter pdf"],
    intro: [
      "Many job portals only accept PDF uploads, and a cover letter written in a notes app is not one. Paste your text here, give it a title if you like, and download a tidy A4 PDF in a few seconds.",
      "The PDF uses a standard font, so it opens the same everywhere. It supports English and other Latin-alphabet text. For Urdu, Arabic or other scripts, write the document in a word processor and export it from there.",
    ],
    steps: ["Type or paste your text, or load a .txt file.", "Add a title and choose a text size.", "Press Download PDF."],
    points: [
      { h: "Clean A4 pages", p: "Even margins, sensible line spacing and automatic page breaks." },
      { h: "Opens the same everywhere", p: "A standard font means the layout will not shift on the recruiter's screen." },
      privacy,
    ],
    faq: [
      { q: "Can I format the text with bold or bullets?", a: "Not here. This tool is for plain text. For styled documents use the resume or CV maker." },
      { q: "Is there a page limit?", a: "No. Long text simply continues onto more pages." },
      free,
    ],
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    short: "Combine photos or scans into one PDF, in the order you choose.",
    category: "PDF",
    kind: "image-pdf",
    title: "Image to PDF Converter, JPG and PNG to PDF",
    description:
      "Combine JPG, PNG and WebP images into a single PDF. Reorder pages, then download. Ideal for scanned certificates and ID copies. Runs in your browser.",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf", "photos to pdf", "scan to pdf"],
    intro: [
      "Applications often ask for certificates, ID copies or transcripts as one PDF, while all you have is a few phone photos. Add the images here, put them in order and download a single file.",
      "Each image gets its own page, scaled to fit A4 without stretching. Wide images are placed on a landscape page automatically.",
    ],
    steps: ["Add your images. You can select several at once.", "Move pages up or down until the order is right, and remove any you do not need.", "Press Create PDF and download it."],
    points: [
      { h: "One file instead of five attachments", p: "Portals that take a single upload are easy to satisfy when everything is already in one PDF." },
      { h: "No stretching", p: "Images keep their proportions and are centred on the page." },
      privacy,
    ],
    faq: [
      { q: "Which image types work?", a: "JPG, PNG and WebP. Other formats, such as HEIC from some iPhones, need to be converted first." },
      { q: "Will the PDF be large?", a: "Images are saved at high JPEG quality, so photos of documents are usually well under a few megabytes each." },
      free,
    ],
  },
  {
    slug: "image-converter",
    name: "Image Converter",
    short: "Switch images between JPG, PNG and WebP in one go.",
    category: "Images",
    kind: "convert",
    title: "Image Converter: JPG, PNG and WebP, Free",
    description:
      "Convert images to JPG, PNG or WebP in your browser. Pick the format, convert several files at once, and keep your photos off the internet.",
    keywords: ["image converter", "png to jpg", "jpg to png", "webp to png", "webp to jpg", "convert image format"],
    intro: [
      "Application forms are picky. One wants a JPG under 2 MB, another only takes PNG, and the logo you saved from a website turned out to be WebP, which half the world's software still cannot open. Drop your images in, choose the format you need and download the result.",
      "Going to JPG fills any see-through areas with white, because JPG has no transparency. PNG and WebP keep transparency. Converting cannot bring back detail that was already lost, so keep your originals.",
    ],
    steps: [
      "Choose your images or drag them onto the box. You can add many at once.",
      "Pick the format you want: JPG, PNG or WebP. For JPG and WebP you can also set the quality.",
      "Download each converted file. Changing the format or quality redoes the conversion instantly.",
    ],
    points: [
      { h: "Any common image in, three formats out", p: "JPG, PNG and WebP photos and graphics all work as input." },
      { h: "Quality you control", p: "A lower setting gives a smaller file. Around 80 to 90 looks fine for most photos." },
      privacy,
    ],
    faq: [
      { q: "Which format should I pick?", a: "JPG for photos and anything with a size limit, PNG for logos, screenshots and transparency, WebP when you want small files and the site accepts it." },
      { q: "Why is my PNG bigger than the JPG?", a: "PNG stores every pixel without lossy compression, so photos take much more space as PNG." },
      free,
    ],
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    short: "Shrink photos to fit upload limits, with a size preview.",
    category: "Images",
    kind: "compress",
    title: "Free Image Compressor, Reduce Photo Size",
    description:
      "Compress JPG, PNG and WebP images to a smaller file size. Set quality and maximum width, see the saving at once. Private, runs in your browser.",
    keywords: ["image compressor", "compress image", "reduce image size", "reduce photo size", "compress photo for upload"],
    intro: [
      "Upload forms love to say file too large. Phone photos are often 3 to 6 MB, while a job portal may only accept 1 or 2. This compressor makes the file smaller while keeping it good enough to read and look professional.",
      "Two things shrink an image: lower quality and fewer pixels. You can use both. A passport-style photo or a document scan rarely needs to be wider than 1600 pixels.",
    ],
    steps: [
      "Add your images. A few at once is fine.",
      "Set the quality and, if you want, a maximum width. The size you save appears next to each file.",
      "Download the smaller versions. If a file is still too big, lower the quality or the width a little more.",
    ],
    points: [
      { h: "See the saving before you download", p: "Each file shows its size before and after, so you know whether it will fit the limit." },
      { h: "Resize and compress together", p: "Capping the width often saves more than quality alone." },
      privacy,
    ],
    faq: [
      { q: "Will compressing make my photo blurry?", a: "Not at moderate settings. Below about 50 quality you may notice blocky edges, so go lower only if you must." },
      { q: "Can I compress a PNG?", a: "The output is JPG or WebP, which compress far better than PNG for photos. Use the Image Converter if you need PNG." },
      free,
    ],
  },
  {
    slug: "background-remover",
    name: "Background Remover",
    short: "Cut out a plain background, or swap it for white or any colour.",
    category: "Images",
    kind: "bg-remove",
    title: "Free Background Remover for Photos and Logos",
    description:
      "Remove a plain background from a photo or logo and download a transparent PNG, or swap in white or any colour. Runs in your browser, nothing uploaded.",
    keywords: ["background remover", "remove background from image", "transparent png", "change photo background", "passport photo background"],
    intro: [
      "Need a logo on a transparent background, or a profile photo on plain white? This tool finds the colour of the background and clears it, working inwards from the edges so colours inside your subject are left alone.",
      "It is built for plain backgrounds: product shots, logos, scanned signatures, photos taken against a wall. It does not recognise people or objects, so a busy street behind you will not come out cleanly.",
    ],
    steps: [
      "Choose a photo. The background colour is picked for you, and you can click the image to pick a different one.",
      "Raise Strength until the background clears, and use Edge softness to avoid a rough outline.",
      "Keep it transparent, or fill it with white or a colour, then download the PNG.",
    ],
    points: [
      { h: "Transparent PNG or a new colour", p: "Handy for logos, signatures and photos that must have a white or coloured backdrop." },
      { h: "Interior colours stay put", p: "Only background connected to the edges is removed, so a white shirt is not cut away." },
      privacy,
    ],
    faq: [
      { q: "Why is some background left behind?", a: "Shadows and gradients differ from the main background colour. Raise Strength a little, or click a shadowed area to pick that colour." },
      { q: "Does it work on busy backgrounds?", a: "Not well. It removes by colour, not by recognising the subject, so it suits plain backgrounds." },
      free,
    ],
  },
];

export const getTool = (slug: string) => TOOLS.find((t) => t.slug === slug);
export const CATEGORIES: Tool["category"][] = ["Resume and CV", "PDF", "Images"];
