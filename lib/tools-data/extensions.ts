import type { Tool } from "../tool-types";
import { free } from "../tool-types";

// Extra long-form copy, tips, related links and search-focused titles for the original eight tools.
// Arrays replace the originals in lib/tools.ts, so faq arrays include the original questions.
export const EXTENSIONS: Record<string, Partial<Tool>> = {
  "resume-maker": {
    title: "Free Resume Maker: ATS Friendly, No Sign-Up",
    description:
      "Build an ATS friendly resume online for free. Live preview, clean one-page layout, PDF and Word download. No account, no watermark, nothing uploaded.",
    keywords: ["resume maker", "free resume builder", "ATS friendly resume", "resume template", "make a resume online", "online resume maker", "resume builder no sign up", "resume maker with pdf download"],
    sections: [
      {
        h: "What makes a resume ATS friendly?",
        paras: [
          "An applicant tracking system, or ATS, is software that stores applications and pulls out the text so recruiters can search it. It reads a resume much like a very literal person would: top to bottom, left to right, one block at a time. Layouts that confuse it are the ones with several columns, text placed inside tables or text boxes, icons used as section headings, and contact details tucked into the page header or footer.",
          "A plain single column, standard headings such as Experience, Education and Skills, and real selectable text avoid almost all of those problems. That is the approach this resume maker takes. It will not make a weak resume strong, but it will not stop a strong one from being read.",
          "One more detail matters: file type. A PDF made from real text keeps its layout everywhere and is read correctly by nearly every system. A PDF made from a scan or a photo is just a picture, and software cannot read it. Always save from the page, never screenshot it.",
        ],
      },
      {
        h: "How to write resume bullets that get read",
        paras: [
          "Recruiters often give a resume less than a minute on the first pass. Your bullets need to answer one question quickly: what did this person actually do, and did it matter? Start each bullet with a verb such as built, reduced, led, taught or sold, then say what changed because of your work.",
          "Numbers help, but only true ones. Handled 40 customer tickets a day, cut report time from two hours to twenty minutes and trained six new staff are all specific and checkable. If you have no figures, describe scale instead: the size of the team, the number of clients, the tools you used.",
          "Keep to three to five bullets for recent jobs and fewer for older ones. Cut anything that every candidate for the role could say, such as hard working or team player. Show it through results and leave the adjectives out.",
        ],
      },
      {
        h: "Tailoring one resume to many jobs",
        paras: [
          "Sending the same resume everywhere is the most common reason for silence after applying. Read the job post, pick out the five or six skills it repeats, and make sure the honest ones appear in your summary, your skills list and your bullets, using the same wording the employer used.",
          "Save one master version with everything in it, then copy it for each application and delete what does not fit. This tool runs entirely in your browser, so adjust the text, save the PDF and name the file clearly, for example firstname-lastname-resume.pdf.",
        ],
      },
    ],
    tips: [
      "Use a professional email address and put the city, not the full street address.",
      "Keep dates consistent, for example Mar 2023 to Jan 2025, on every entry.",
      "List jobs newest first and drop roles older than about fifteen years unless they matter.",
      "Proofread aloud. Spelling mistakes are the easiest reason to reject an application.",
      "Name the saved file with your name so recruiters can find it in a pile of downloads.",
      "Check the PDF on a phone before sending. Many recruiters open attachments there.",
    ],
    related: ["cv-maker", "word-counter", "pdf-maker", "image-compressor", "signature-generator"],
    faq: [
      { q: "Will this resume pass applicant tracking systems?", a: "The layout is built for it: one column, standard section names, text you can select. No tool can promise a pass, because that also depends on the job description and how you word your experience." },
      { q: "Should I use a resume or a CV?", a: "In the US and Canada employers usually ask for a resume. Elsewhere the two words are often used loosely. If the job post says CV and asks for more detail, try our CV maker." },
      { q: "How long should a resume be?", a: "One page is the safe default for early and mid-career applicants. Two pages are fine when you have a long, relevant history. Never pad a resume to fill space." },
      { q: "Should I add a photo to my resume?", a: "In the US, UK and Canada, no. Photos can cause bias concerns and confuse screening software. Some countries expect one, so follow the local custom." },
      { q: "Can I edit the resume later?", a: "Your entries are saved in your browser on this device, never on our servers, so they are still there when you come back. Download the Word version to keep editing in any word processor, and keep the files you download." },
      free,
    ],
  },
  "cv-maker": {
    title: "Free CV Maker: Modern and Classic Templates",
    description:
      "Create a professional CV online for free with projects, certifications, languages and references. Pick a template, preview live, download PDF or Word. No sign-up.",
    keywords: ["cv maker", "online cv maker", "free cv maker", "free online cv maker", "make a cv online", "cv builder", "curriculum vitae maker", "cv template download"],
    sections: [
      {
        h: "CV or resume: which one do you need?",
        paras: [
          "The two words overlap, and employers use them differently depending on the country. In the United States and Canada a resume is a short, targeted summary, usually one page. A CV in the same countries is a longer record used for academic, scientific and medical roles. In the UK, Europe, Pakistan, India, Australia and much of Asia and Africa, CV is simply the normal word for the document you send with a job application.",
          "The practical rule is to follow the job post. If it says CV, send a CV. If it says resume, send a resume. When it does not say, a two page CV in the local style is the safe choice outside North America.",
        ],
      },
      {
        h: "What to put on a CV, and in what order",
        paras: [
          "Start with your name and contact details, then a short profile of three or four lines that says who you are professionally and what you want next. Follow with work experience in reverse chronological order, then education, then supporting sections such as projects, certifications, languages and references.",
          "Students and graduates can lead with education and projects when work history is thin. People changing careers can lead with a skills summary. The order should always put the strongest evidence for this particular job first.",
          "Personal details differ by country. Date of birth, marital status and a photo are expected in some places and discouraged in others. When in doubt, leave them out, because they rarely help you get an interview.",
        ],
      },
      {
        h: "Modern or Classic template?",
        paras: [
          "The Modern template adds a colour header and skill tags, which suits creative, design and sales roles and any case where a person will read the CV. The Classic template is plain black text on white, which is the safer option when a company uses screening software or when you are not sure how the CV will be read.",
          "Whichever you pick, keep fonts and spacing consistent and keep the length to two pages unless the field expects more. Save as PDF for applications and keep the Word copy for later edits.",
        ],
      },
    ],
    tips: [
      "Write the profile last, once you can see which strengths the CV actually shows.",
      "List projects with a one-line result and a link, if they are public.",
      "Put certifications with the issuing body and year so they can be checked.",
      "Give references only when the post asks, or write references available on request.",
      "Remove sections you cannot fill well. Empty sections disappear from the page automatically.",
    ],
    related: ["resume-maker", "pdf-maker", "image-resizer", "image-compressor", "signature-generator"],
    faq: [
      { q: "How long should a CV be?", a: "Two pages is common for most roles. Research and academic CVs can run longer. Cut anything that does not help with this particular job." },
      { q: "Do I need a photo on my CV?", a: "Not unless the country or employer expects one. This template leaves it out, which also keeps it simple for screening software." },
      { q: "Is a CV the same as a resume?", a: "Often yes, outside North America. In the US a resume is short and targeted and a CV is longer and academic. Follow the wording of the job post." },
      { q: "Can I download my CV as a Word file?", a: "Yes. You can save a PDF or download a Word copy and keep editing it in any word processor." },
      { q: "Does the CV maker save my details?", a: "Your entries are kept in your browser on this device so you do not lose them if you close the page. They are not sent to our servers. Clear your browser data to remove them, and keep the files you download." },
      free,
    ],
  },
  "pdf-reader": {
    title: "Free Online PDF Reader: Open PDFs in Browser",
    description:
      "Open and read PDF files online for free. Offer letters, contracts and forms open privately on your device with zoom, search and print. Nothing is uploaded.",
    keywords: ["pdf reader", "online pdf viewer", "open pdf online", "read pdf in browser", "view pdf online", "pdf reader online no download", "free pdf viewer", "private pdf viewer"],
    sections: [
      {
        h: "Why read a PDF in the browser instead of installing an app?",
        paras: [
          "Installing software is slow when you only need to read one file, and it is often impossible on a shared, school or work computer. A browser already includes a capable PDF viewer. This page simply gives you a clean place to open a file from your device and read it with zoom, search and print controls you already know.",
          "It also helps when the file arrives in an awkward place, such as an email attachment on a phone or a download that your phone does not know how to open. Choose the file, read it, and move on.",
        ],
      },
      {
        h: "Is it safe to open private documents here?",
        paras: [
          "The file is read directly from your device by your own browser and is never uploaded to our servers. That matters for offer letters, contracts, bank statements and ID scans. You can check this yourself by opening your browser's network panel while loading a file: no upload request is made.",
          "As with any PDF, only open files from people you trust. Malicious PDFs exist, and a browser viewer is generally safer than a desktop app because it runs inside the browser's sandbox, but common sense still applies.",
        ],
      },
      {
        h: "What to do when a PDF will not open",
        paras: [
          "Check the extension first. A file that ends in .pdf but fails to open may be damaged, or may be a password protected document that needs the password. If it came as an email attachment, try downloading it again, since partial downloads are a common cause.",
          "On some phones the in-page viewer is limited. Use the open in new tab button to hand the file to the phone's own viewer, which handles zooming and large pages better. If you need to change the file, remember that this tool is for reading. To create a new PDF try the PDF Maker, or combine photos with Image to PDF.",
        ],
      },
    ],
    tips: [
      "Use the browser's search shortcut, usually Ctrl or Cmd plus F, to find a clause fast.",
      "Print to PDF from the viewer to save only the pages you need.",
      "Rotate the phone sideways to read wide tables in contracts.",
      "Keep a copy of every offer letter and contract in a folder you can find later.",
    ],
    related: ["pdf-maker", "image-to-pdf", "image-compressor", "resume-maker", "text-case-converter"],
    faq: [
      { q: "Why does the PDF not show on my phone?", a: "Some mobile browsers cannot show PDFs inside a page. Use the Open in new tab button, which hands the file to your phone's own viewer." },
      { q: "Can I edit the PDF here?", a: "No, this tool is for reading. To make a new PDF, try the PDF maker or Image to PDF." },
      { q: "Is there a file size limit?", a: "There is no limit set by this tool. Very large files depend on your device memory and browser." },
      { q: "Does it work offline?", a: "Once the page has loaded you can usually open local files without a connection, though that depends on your browser." },
      { q: "Is my PDF uploaded anywhere?", a: "No. The file stays on your device and is displayed by your own browser." },
      free,
    ],
  },
  "pdf-maker": {
    title: "Free PDF Maker: Convert Text to PDF Online",
    description:
      "Turn typed or pasted text into a clean A4 PDF in seconds. Ideal for cover letters, notes and references. Free, runs in your browser, no sign-up or watermark.",
    keywords: ["pdf maker", "text to pdf", "create pdf online", "make a pdf", "cover letter pdf", "free pdf maker online", "txt to pdf", "convert text to pdf"],
    sections: [
      {
        h: "When is a text to PDF converter useful?",
        paras: [
          "Plenty of everyday paperwork is just text that needs to arrive as a PDF: a cover letter for a job portal, a signed statement, meeting notes for a client, a set of instructions for a relative. Writing these in a word processor works, but not everyone has one, and exporting is fiddly on a phone.",
          "Pasting text here and pressing download is faster. You get a tidy A4 document with even margins and automatic page breaks that opens the same way on every device.",
        ],
      },
      {
        h: "Writing a cover letter that works as a PDF",
        paras: [
          "A cover letter should be short, specific and addressed to a real person when you can find the name. Open with the role you are applying for and one reason you fit it. Use the middle to give two or three pieces of evidence, such as a result, a project or a skill the job asks for. Close with a clear next step.",
          "Keep it to a single page. Paste the final text here, add your name as the title, choose a readable size such as 11 or 12 point and download. Name the file with your name and the company so it is easy to find later.",
        ],
      },
      {
        h: "What this tool does not do",
        paras: [
          "The PDF uses a standard built-in font, so text is limited to English and other Latin alphabet languages. Bold, italics, bullets and images are not supported, because the goal is a clean, reliable page rather than a design tool.",
          "If you need styled documents, use the Resume Maker or CV Maker. If you need Urdu, Arabic, Hindi or other scripts, write the document in a word processor and export to PDF from there so the right fonts are embedded.",
        ],
      },
    ],
    tips: [
      "Use blank lines between paragraphs so the PDF breathes on the page.",
      "Load a .txt file if you drafted offline, then edit it here before saving.",
      "Choose 12 pt for letters that will be printed and 10 or 11 pt for long notes.",
      "Check the page count on the downloaded file before uploading it to a portal.",
    ],
    related: ["pdf-reader", "image-to-pdf", "resume-maker", "word-counter", "text-case-converter"],
    faq: [
      { q: "Can I format the text with bold or bullets?", a: "Not here. This tool is for plain text. For styled documents use the resume or CV maker." },
      { q: "Is there a page limit?", a: "No. Long text simply continues onto more pages." },
      { q: "Does it support Urdu or Arabic?", a: "No. The built-in font covers Latin alphabet text only. Use a word processor for other scripts." },
      { q: "Is the PDF size small?", a: "Yes. Text only PDFs are usually a few kilobytes, so they pass most upload limits." },
      { q: "Is my text stored?", a: "No. The PDF is created in your browser and your text is never sent to a server." },
      free,
    ],
  },
  "image-to-pdf": {
    title: "Image to PDF Converter: JPG, PNG to PDF Free",
    description:
      "Combine JPG, PNG and WebP images into one PDF. Reorder pages, then download. Great for scanned certificates and ID copies. Free, private, no sign-up.",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf", "photos to pdf", "combine images into pdf", "scan to pdf", "convert image to pdf online", "multiple images to one pdf"],
    sections: [
      {
        h: "How to turn phone photos into a clean PDF",
        paras: [
          "Good PDFs from photos start with good photos. Place the document on a plain, dark surface in even light, hold the phone parallel to the page and keep the edges inside the frame. Avoid shadows from your hand or phone, and take each page separately.",
          "Add the images here in the order they should appear, move any that are in the wrong place, and download. Each image gets its own A4 page, scaled to fit without stretching. Wide images go on a landscape page automatically so nothing is cut off.",
        ],
      },
      {
        h: "Keeping the PDF under an upload limit",
        paras: [
          "Phone photos are large, often three to eight megabytes each, so a ten page PDF can easily pass a portal's limit of two or five megabytes. The fix is to shrink the images before combining them. Run each photo through the Image Compressor or the Image Resizer, aiming for a width of about 1600 pixels, which is plenty for a readable A4 page.",
          "Then build the PDF. Most documents stay perfectly legible at a fraction of the original size, and you can always check by zooming in on the finished file.",
        ],
      },
      {
        h: "Which documents are usually requested as one PDF?",
        paras: [
          "Job and scholarship applications commonly ask for transcripts, degree certificates, ID copies, reference letters and proof of address in a single file. Visa and bank forms ask for similar bundles. Putting everything in a clear order, with the most important document first, makes life easier for whoever reviews it.",
          "Remember that scans of personal documents are sensitive. This tool processes everything on your device, so the images are not sent to us, but delete the files from shared computers when you finish.",
        ],
      },
    ],
    tips: [
      "Crop and straighten photos in your gallery app before adding them.",
      "Use JPG for photos of paper. PNG files of photos are much larger for no gain.",
      "Put pages in the order the portal asks for, not the order you scanned them.",
      "Open the finished PDF once to confirm every page is readable.",
      "Name the file clearly, for example name-transcripts.pdf.",
    ],
    related: ["image-compressor", "image-resizer", "pdf-reader", "pdf-maker", "exif-remover"],
    faq: [
      { q: "Can I reorder the pages?", a: "Yes. Move images up or down before you download, and remove any you added by mistake." },
      { q: "Which image types work?", a: "JPG, PNG and WebP images work. Convert other formats first using the Image Converter." },
      { q: "Will the images be stretched?", a: "No. Each image is scaled to fit the page and keeps its proportions." },
      { q: "How do I make the PDF smaller?", a: "Compress or resize the images first with the Image Compressor, then combine them." },
      { q: "Are my images uploaded?", a: "No. The PDF is built in your browser and the images never leave your device." },
      free,
    ],
  },
  "image-converter": {
    title: "Image Converter: JPG, PNG, WebP Free Online",
    description:
      "Convert images between JPG, PNG and WebP in seconds. Adjust quality, batch convert and download. Free, private, runs in your browser. No uploads, no sign-up.",
    keywords: ["image converter", "jpg to png", "png to jpg", "webp to jpg", "jpg to webp", "convert image format", "free image converter online", "webp to png"],
    sections: [
      {
        h: "JPG, PNG or WebP: which format should you choose?",
        paras: [
          "JPG is the best general choice for photographs. It uses lossy compression to keep files small, and almost every website, form and device accepts it. PNG is lossless, which makes it ideal for screenshots, logos, text and anything with transparency, but photographs saved as PNG are often several times larger.",
          "WebP is a modern format that is usually smaller than both JPG and PNG at similar quality, and it supports transparency. Browsers handle it well, but some older programs, email tools and upload forms still refuse it, which is the most common reason people need a converter.",
        ],
      },
      {
        h: "Why does converting sometimes change the way an image looks?",
        paras: [
          "Converting to JPG discards some detail every time it is saved, so avoid converting the same image back and forth. Keep the original and convert a copy. Converting a transparent PNG to JPG also removes the transparency, because JPG has none. This tool fills transparent areas with white in that case.",
          "Going from JPG to PNG will not add back lost detail. The PNG will be larger and look the same as the JPG. The quality slider only affects JPG and WebP, where higher numbers mean sharper pictures and bigger files.",
        ],
      },
      {
        h: "Safe and private conversion",
        paras: [
          "Many online converters upload your files to a server, which is a poor idea for photos of documents or people. This converter decodes and re-encodes the picture inside your browser, so nothing is sent anywhere and nothing is kept.",
          "You can drop several files at once and download each result. If a particular file fails, it is usually damaged or in a format the browser cannot read, such as some RAW or HEIC files.",
        ],
      },
    ],
    tips: [
      "Use JPG for photos, PNG for graphics with sharp edges, WebP for fast websites.",
      "Start at quality 80 to 90 for JPG. Higher numbers rarely look better but cost size.",
      "Keep the original file. Converting is a copy, not an edit.",
      "If a form rejects WebP, convert to JPG and try again.",
    ],
    related: ["image-compressor", "image-resizer", "background-remover", "base64-image-converter", "image-to-pdf"],
    faq: [
      { q: "Does converting reduce quality?", a: "Converting to JPG or WebP at less than full quality loses a little detail. Converting to PNG does not reduce quality but may increase file size." },
      { q: "Can I convert many images at once?", a: "Yes. Drop several files and download each converted image." },
      { q: "Why was the transparency lost?", a: "JPG does not support transparency. Choose PNG or WebP to keep it." },
      { q: "Does it support HEIC from iPhones?", a: "Only if your browser can decode HEIC. If not, change the camera setting to Most Compatible or share as JPG." },
      { q: "Are my images uploaded?", a: "No. Conversion happens in your browser." },
      free,
    ],
  },
  "image-compressor": {
    title: "Image Compressor: Reduce Photo Size Online Free",
    description:
      "Reduce image file size without visible loss. Compress JPG and WebP, set a max width and meet upload limits for forms and listings. Free, private, no uploads.",
    keywords: ["image compressor", "compress image", "reduce image size", "compress jpg", "reduce photo size online", "image size reducer", "compress image to 100kb", "free image compressor"],
    sections: [
      {
        h: "How image compression works",
        paras: [
          "Lossy compression, used by JPG and WebP, saves space by throwing away detail the eye is least likely to notice. Lowering the quality setting throws away more, so files shrink but eventually look blocky or blurry. Lowering the pixel dimensions has a much bigger effect: halving the width and height cuts the pixel count to a quarter.",
          "For most uploads the best result comes from combining both. Reduce the width to the size the page or form actually needs, then use a quality of 70 to 85. The picture will usually look the same to the viewer at a small fraction of the original size.",
        ],
      },
      {
        h: "Hitting a size limit such as 100 KB or 2 MB",
        paras: [
          "Government portals, school applications and online listings often set strict limits. Work down in steps. First set the maximum width to 1600 pixels, which is enough for almost any screen photo. If the file is still too large, lower the quality in steps of five and compare the sizes shown next to each result.",
          "For passport style photos or signatures, a width of 600 to 800 pixels is typically enough. If the tool reports that the output is no smaller than the original, the source is already well compressed, so lower the quality or the width further.",
        ],
      },
      {
        h: "Compress without sending files to a server",
        paras: [
          "Compression here runs on your own device using your browser, so photos of documents, IDs and family members are never uploaded. That also makes it fast, since there is no waiting for a transfer, and it works on a slow connection once the page has loaded.",
          "Keep the original image. Lossy compression cannot be undone, so work on copies and delete the originals only when you are sure.",
        ],
      },
    ],
    tips: [
      "Resize first, then compress. Pixel count matters more than the quality slider.",
      "Use WebP when the destination allows it. It is usually smaller than JPG.",
      "Compare the before and after sizes and zoom in on the result before uploading.",
      "Do not compress screenshots with small text too hard. Use PNG or a high quality JPG.",
    ],
    related: ["image-resizer", "image-converter", "image-to-pdf", "exif-remover", "background-remover"],
    faq: [
      { q: "Why is the file not smaller?", a: "Some images are already compressed. Lower the quality or choose a smaller maximum width." },
      { q: "Can I compress to an exact size like 50 KB?", a: "You can get close by adjusting width and quality, checking the result size after each change." },
      { q: "Does compression remove image data permanently?", a: "Yes, for JPG and WebP. Always keep the original file." },
      { q: "Which format compresses best?", a: "WebP usually gives the smallest file at similar visual quality, followed by JPG for photos." },
      { q: "Are my photos uploaded?", a: "No. Compression runs in your browser." },
      free,
    ],
  },
  "background-remover": {
    title: "Free Background Remover for Plain Backgrounds",
    description:
      "Remove a plain background from a photo online and get a transparent PNG or a white or coloured backdrop. Free, private, no sign-up and no watermark.",
    keywords: ["background remover", "remove background from image", "transparent background", "make background transparent", "remove white background", "free background remover", "passport photo background", "png transparent maker"],
    sections: [
      {
        h: "How this background remover works",
        paras: [
          "This tool removes background by colour rather than by recognising a person or object. It picks the colour at the edge of your photo, then clears every pixel that is similar to it and connected to the border. Colours inside the subject stay put, so a white shirt against a white wall is not cut out unless it touches the removed area.",
          "That approach is fast, private and predictable on plain backgrounds, and it needs no upload. It is not the right tool for a cluttered street scene or a photo with a background the same colour as the subject.",
        ],
      },
      {
        h: "Getting a clean result",
        paras: [
          "Start with a photo taken against a flat, evenly lit wall. Raise the Strength slider until the background clears, then check the edges. If a halo of the old colour remains, raise Strength a little more or use Edge softness to blend the outline. If parts of the subject start disappearing, lower it again.",
          "Shadows are the usual trouble, because they are darker than the wall. Click a shadowed area to pick that colour as a second reference, and the tool will clear it as well.",
        ],
      },
      {
        h: "When to use a transparent PNG or a solid colour",
        paras: [
          "A transparent PNG is useful for logos, signatures, product photos and designs where the picture sits on another background. Many forms for passports, visas and ID cards require a plain white or light blue backdrop instead, so fill the cleared area with white or your chosen colour before downloading.",
          "Check the rules of the form you are filling. Some official photo checkers reject edited backgrounds or soft edges, in which case retaking the photo against a plain wall is safer.",
        ],
      },
    ],
    tips: [
      "Photograph against a plain wall with the light in front of you, not behind.",
      "Keep the subject a few steps away from the wall to reduce shadows.",
      "Click the image to choose the exact background colour if the auto pick is off.",
      "Zoom in on edges and hair before you download.",
    ],
    related: ["image-converter", "image-resizer", "signature-generator", "image-compressor", "portrait-to-landscape-image"],
    faq: [
      { q: "Why is some background left behind?", a: "Shadows and gradients differ from the main background colour. Raise Strength a little, or click a shadowed area to pick that colour." },
      { q: "Does it work on busy backgrounds?", a: "Not well. It removes by colour, not by recognising the subject, so it suits plain backgrounds." },
      { q: "Can I make a signature transparent?", a: "Yes. A signature on white paper is a good fit. Photograph it in even light and remove the white background." },
      { q: "What format is the download?", a: "A PNG, which supports transparency." },
      { q: "Are my photos uploaded?", a: "No. The image is processed in your browser and is never sent to a server." },
      free,
    ],
  },
};
