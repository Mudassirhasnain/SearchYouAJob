import type { Tool } from "../tool-types";
import { free, privacy } from "../tool-types";

export const IMAGE_TOOLS: Tool[] = [
  {
    slug: "image-resizer",
    name: "Image Resizer",
    short: "Resize photos by exact pixels or percentage, with an optional maximum file size.",
    category: "Images",
    kind: "image-resizer",
    title: "Image Resizer: Resize Photos by Pixels or %",
    description:
      "Resize images to exact pixel sizes or a percentage, keep the aspect ratio and set a maximum file size in KB. Free, private, no sign-up, no uploads.",
    keywords: ["image resizer", "resize image online", "resize photo to specific size", "resize image in pixels", "resize image to 100kb", "bulk image resizer", "change image dimensions", "reduce image dimensions"],
    intro: [
      "Websites, portals and printers all ask for images in a particular size. A passport form wants 600 by 600 pixels, a shop listing wants a square 1200 pixel photo, and a social profile wants something that does not get cropped. The photo from your phone is almost always far larger than any of them.",
      "This resizer changes the pixel dimensions of one image or many. Set an exact width and height or scale by a percentage, keep the aspect ratio locked so nothing looks stretched, choose JPG, PNG or WebP, and add an optional maximum file size in kilobytes for strict upload limits.",
    ],
    steps: [
      "Add one or more images by dropping them in the box. The first image sets the starting size.",
      "Choose pixels or percentage. In pixel mode, type a width and the height follows when Keep aspect ratio is ticked.",
      "Pick a format and quality, add a maximum size if a form requires it, press Resize images and download each result.",
    ],
    points: [
      { h: "Exact pixels or percentage", p: "Set 800 by 600 for a form, or scale everything to 50 percent for a quick shrink." },
      { h: "Maximum file size control", p: "Type 200 and the tool lowers JPG or WebP quality until the file is under 200 KB, as far as the picture allows." },
      { h: "Batch friendly", p: "Add many photos at once. In locked mode each photo is scaled to the width you set and keeps its own proportions." },
      privacy,
    ],
    sections: [
      {
        h: "What is the difference between resizing and compressing an image?",
        paras: [
          "Resizing changes the number of pixels in the picture, for example from 4000 by 3000 to 1200 by 900. Compressing changes how much data is used to store those pixels, usually by discarding fine detail the eye is unlikely to notice. Both reduce file size, but resizing usually has the bigger effect, because halving width and height leaves a quarter of the pixels.",
          "For a clean result, resize first to the size you actually need, then apply a modest quality such as 80 to 90. This tool does both in one pass. If you only need a smaller file and do not mind the dimensions, the Image Compressor may be the quicker choice.",
        ],
      },
      {
        h: "How do I resize an image without making it look stretched?",
        paras: [
          "Keep the aspect ratio locked. The aspect ratio is the proportion between width and height, and if you change one without the other, the picture is squashed or stretched. With the lock on, entering a new width calculates the matching height automatically.",
          "If a form requires an exact size with a different shape from your photo, such as a square from a landscape picture, resizing alone will distort it. Crop the photo first in your gallery app, or use the Vertical to Horizontal Image Converter to change shape without distortion, then resize.",
        ],
      },
      {
        h: "Common image sizes for forms, shops and social media",
        paras: [
          "Passport and ID photo portals often ask for between 35 by 45 millimetres at a given resolution, or a pixel size such as 600 by 600, and a file under 100 to 300 KB. Online shops commonly use square images from 1000 to 2000 pixels. A typical blog or website image is 1200 to 1600 pixels wide. Social profile pictures are displayed small, so 400 to 800 pixels is plenty.",
          "Always check the exact rules of the site you are uploading to, since they change. Making an image larger than the original cannot add detail, so avoid enlarging small pictures beyond about 150 percent unless you accept a softer result.",
        ],
      },
    ],
    tips: [
      "Resize from the biggest original you have, not from an already shrunk copy.",
      "Use JPG for photos and PNG for logos, screenshots and graphics with sharp lines.",
      "Avoid scaling up. Enlarging a small photo makes it blurry, not sharper.",
      "Set a max size in KB only when a form demands it. Otherwise leave it empty for best quality.",
      "Check the result at 100 percent zoom before uploading.",
    ],
    faq: [
      { q: "How do I resize an image to a specific size in KB?", a: "Choose JPG or WebP, type the limit in Max size, and press Resize. The tool reduces quality in steps until the file fits, as far as the image allows. Also reduce the pixel size if it still does not fit." },
      { q: "Can I resize many images at once?", a: "Yes. Add several files and they are all resized with the same settings." },
      { q: "Will resizing reduce quality?", a: "Shrinking keeps images sharp. Heavy compression or enlarging reduces quality." },
      { q: "Which format should I choose?", a: "JPG for photos, PNG for graphics with transparency or text, WebP for modern websites." },
      { q: "Does it keep the original file?", a: "Yes. Your original is never changed. You download a new copy." },
      free,
    ],
    related: ["image-compressor", "image-converter", "portrait-to-landscape-image", "exif-remover", "image-to-pdf"],
  },
  {
    slug: "exif-remover",
    name: "Photo EXIF Metadata Remover",
    short: "Strip GPS location, camera details and timestamps from photos before you share them.",
    category: "Images",
    kind: "exif-remover",
    title: "EXIF Remover: Delete Photo Metadata and GPS",
    description:
      "Remove EXIF data, GPS location and camera details from photos before posting. See what the original contained. Free, private, runs in your browser.",
    keywords: ["exif remover", "remove exif data", "remove metadata from photo", "remove gps from photo", "strip exif online", "delete photo location data", "photo metadata remover", "clean photo metadata"],
    intro: [
      "Every photo from a phone or camera can carry hidden information. Beyond the picture itself, the file often stores the time it was taken, the device model, camera settings and, if location is switched on, the exact GPS coordinates. Post a photo taken at home and you may be sharing your address without knowing it.",
      "This tool removes that hidden data. It redraws the picture on a blank canvas in your browser and saves a fresh file, which contains the pixels and nothing else. For JPEG photos it also tells you what was found in the original, including whether GPS coordinates were present.",
    ],
    steps: [
      "Drop one or more photos into the box.",
      "Read the note under each file. For JPEGs it shows whether EXIF data and GPS location were in the original.",
      "Download the cleaned copy and share that one instead of the original.",
    ],
    points: [
      { h: "Shows what was hidden", p: "For JPEG files you see whether EXIF data, GPS coordinates and a camera make and model were present." },
      { h: "Real removal, not hiding", p: "The cleaned file is built from pixels only, so the metadata is not stored in it at all." },
      { h: "Orientation stays correct", p: "Photos are rotated the right way up before cleaning, so they do not turn sideways." },
      privacy,
    ],
    sections: [
      {
        h: "What is EXIF data and why does it matter for privacy?",
        paras: [
          "EXIF stands for Exchangeable Image File Format. It is a block of tags inside many photo files written by the camera. Typical tags include the date and time, the device make and model, lens, exposure settings and, when location services are on, latitude and longitude. Phones also store things like the software version and sometimes a unique device identifier.",
          "This is useful for photographers, but it is a privacy risk when you share pictures. A photo of a package, a child's room or a rental listing taken at home may carry the exact coordinates. Anyone who downloads the original file can read them with free software.",
        ],
      },
      {
        h: "Do social networks remove EXIF data for me?",
        paras: [
          "Many large platforms strip most metadata from images you upload, but this is not guaranteed everywhere and it can change. Messaging apps, email attachments, cloud storage links, classified ad sites, forums and personal blogs often pass the original file through untouched.",
          "The safe habit is to remove metadata yourself before sharing a file, especially when you send the original image by email or upload it to a site you do not control. It takes seconds and removes any doubt about what else is inside the file.",
        ],
      },
      {
        h: "How does this tool remove metadata, and what are the limits?",
        paras: [
          "The browser decodes your photo into raw pixels and the tool draws those pixels onto a new canvas, then encodes a new JPEG, PNG or WebP. The new file contains no EXIF block, no GPS tags and no camera details, because they never reach the canvas. The picture may be recompressed, so very slight quality changes are possible for JPEG files.",
          "Some information can still identify a photo in other ways: a visible street sign, a unique building in the background or a watermark. Metadata removal does not change what is visible in the picture, so look at the image itself as well. Photos with unusual formats such as HEIC may not open in every browser.",
        ],
      },
    ],
    tips: [
      "Turn off location tagging in your camera app if you do not need it.",
      "Clean photos before sending them by email or uploading to marketplaces.",
      "Check the visible background of the photo too. Pixels can reveal places.",
      "Keep the original file privately if you want the metadata for your own records.",
      "After cleaning, the file should be a similar size. Large drops can mean a thumbnail was removed.",
    ],
    faq: [
      { q: "Does it remove GPS location from photos?", a: "Yes. The cleaned copy has no EXIF block, so no GPS coordinates are included." },
      { q: "Will the image quality change?", a: "JPEGs are re-encoded at high quality, so differences are not visible in normal use. PNG files are lossless." },
      { q: "Does it work on PNG and WebP?", a: "Yes. These are re-encoded without metadata, though only JPEG files are scanned to show what the original contained." },
      { q: "Can I clean many photos at once?", a: "Yes. Drop several files and download each cleaned copy." },
      { q: "Is my photo uploaded?", a: "No. Everything happens in your browser, which is the point of a privacy tool." },
      free,
    ],
    related: ["image-compressor", "image-resizer", "image-converter", "image-to-pdf", "password-generator"],
  },
  {
    slug: "base64-image-converter",
    name: "Base64 Image Converter",
    short: "Turn an image into a Base64 data URI, or decode Base64 back into an image file.",
    category: "Images",
    kind: "base64-image-converter",
    title: "Base64 Image Converter: Encode and Decode",
    description:
      "Convert images to Base64 data URIs for HTML, CSS and JSON, or decode Base64 to a downloadable image. Copy snippets in one click. Free and private.",
    keywords: ["base64 image converter", "image to base64", "base64 to image", "data uri generator", "convert image to base64 string", "decode base64 image", "base64 encode image online", "embed image in html base64"],
    intro: [
      "Base64 is a way of writing binary data, like an image, as plain text. That text can be pasted straight into HTML, CSS, JSON or an email template, so the picture travels inside the document and does not need a separate file or request. Developers use it for small icons, logos and signatures.",
      "Use this converter in either direction. Drop an image to get the data URI, the raw Base64 string, a CSS background rule and an HTML image tag, each with a copy button. Or paste a Base64 string and see the image, then download it as a file.",
    ],
    steps: [
      "On the Image to Base64 tab, drop an image. The converted text appears in four ready-to-use formats.",
      "Press Copy beside the format you need and paste it into your code.",
      "To go the other way, open Base64 to image, paste the string and download the picture.",
    ],
    points: [
      { h: "Four snippets at once", p: "Data URI, raw Base64, a CSS background-image rule and a complete HTML img tag." },
      { h: "Decodes with or without a header", p: "Paste a full data URI or just the Base64 body. The image type is detected from the file signature." },
      { h: "Size shown up front", p: "You see how much bigger the text is than the file, so you can decide if embedding is worth it." },
      privacy,
    ],
    sections: [
      {
        h: "What is a Base64 data URI?",
        paras: [
          "A data URI is a web address that contains the file itself. It starts with data:image/png;base64, followed by the encoded text. Browsers read it the same way as an image file on a server, so you can use it anywhere an image address is accepted, in an img tag, a CSS url() or a canvas.",
          "Base64 represents every three bytes of the file as four text characters. That is why the encoded text is about 33 percent larger than the original. The image itself is not changed, only the way it is written.",
        ],
      },
      {
        h: "When should you embed an image as Base64?",
        paras: [
          "Embedding works well for very small images such as icons, a tiny logo, a loading spinner or a signature, where saving an extra request is worth more than the extra size. It is also handy for HTML emails, single-file demos and configuration files that must be self-contained.",
          "For larger photos it is usually a poor idea. The text is bigger than the file, it cannot be cached separately by the browser and it makes your code hard to read and edit. A good rule is to embed only images under a few kilobytes and link everything else normally.",
        ],
      },
      {
        h: "How to decode a Base64 string back to an image",
        paras: [
          "Paste the string into the decoder. If it starts with data:image, the type is read from the header. If it is raw Base64, the first few bytes are checked for the signature of PNG, JPEG, GIF or WebP files, so the correct type is used for the download.",
          "If nothing appears, the string is probably cut off, contains extra characters such as a leading quote, or is not an image. Remove any line breaks or quotes and try again. Very large strings can be slow to display in a browser, which is another reason to keep embedded images small.",
        ],
      },
    ],
    tips: [
      "Compress or resize an image first. Smaller files mean shorter Base64 text.",
      "Use PNG or WebP for small icons with transparency and JPG for photos.",
      "Do not embed large photos. Link to them as normal files instead.",
      "Copy the snippet that matches where you paste it. CSS needs the url() version.",
      "Keep the original image file. Base64 text is harder to edit later.",
    ],
    faq: [
      { q: "Does Base64 compress an image?", a: "No. It makes the data about one third bigger. It only changes the format into text." },
      { q: "Is Base64 a form of encryption?", a: "No. Anyone can decode it. Never use it to hide sensitive information." },
      { q: "Which image types are supported?", a: "Any image your browser can open for encoding. For decoding, PNG, JPEG, GIF and WebP are detected." },
      { q: "Can I use the data URI in an email?", a: "Many email clients block or strip embedded images, so test before relying on it." },
      { q: "Is my image uploaded?", a: "No. The conversion happens in your browser." },
      free,
    ],
    related: ["image-compressor", "image-converter", "json-formatter", "image-resizer", "qr-code-generator"],
  },
  {
    slug: "portrait-to-landscape-image",
    name: "Vertical to Horizontal Image Converter",
    short: "Turn a portrait photo into a landscape image without stretching it.",
    category: "Images",
    kind: "portrait-to-landscape-image",
    title: "Vertical to Horizontal Image Converter, Free",
    description:
      "Convert a portrait photo to landscape without stretching. Fill the sides with a blurred copy or a colour, crop to fit, or rotate. Free, runs in your browser.",
    keywords: ["vertical to horizontal image converter", "portrait to landscape photo", "convert portrait to landscape", "add blur background to photo", "make vertical photo horizontal", "rotate image 90 degrees", "photo to 16:9", "fit photo to landscape"],
    intro: [
      "A tall phone photo looks awkward on a wide screen. Slide decks, video thumbnails, website banners and TV displays are all landscape, so a portrait picture ends up with big empty bars on both sides or gets badly cropped. Stretching it is the worst choice, since faces and buildings become distorted.",
      "This converter gives you four better options. Fill the empty sides with a blurred, enlarged copy of the same photo, a solid colour, crop the picture to fill the whole frame, or simply rotate it by 90 degrees. Pick a standard landscape shape, set the width and download the result.",
    ],
    steps: [
      "Drop your portrait photo into the box.",
      "Choose a method: blurred background, solid colour, crop to fill or rotate 90 degrees, and pick a shape such as 16:9.",
      "Check the preview and download it as PNG or JPG.",
    ],
    points: [
      { h: "No stretching", p: "The photo keeps its true proportions. Only the empty space around it is filled." },
      { h: "Standard shapes built in", p: "16:9 for video and slides, 4:3, 3:2 for cameras and 1.91:1 for link previews and social posts." },
      { h: "Live preview", p: "See exactly what you will get before downloading." },
      privacy,
    ],
    sections: [
      {
        h: "Which method should you choose?",
        paras: [
          "The blurred background keeps the whole photo visible and avoids hard empty bars, which is the style used by many video apps. It suits thumbnails, presentations and social posts. A solid colour is cleaner and more formal, and works well when you want to match a brand colour or a slide background.",
          "Crop to fill uses the entire frame but cuts off the top and bottom of the photo, so use it when the subject sits in the middle. Rotate 90 degrees is for pictures that were saved sideways. It turns the image without cropping, so a portrait becomes a landscape of the same pixel count.",
        ],
      },
      {
        h: "What do aspect ratios like 16:9 and 4:3 mean?",
        paras: [
          "An aspect ratio is the proportion between width and height. 16:9 is the shape of most monitors, TVs and online video. 4:3 is the older screen shape and common for classroom projectors and some tablets. 3:2 matches many cameras and print sizes such as 6 by 4 inches, and 1.91:1 is the standard preview shape for shared links.",
          "Choosing the right shape before you upload avoids automatic cropping by the platform. Enter the width you need, and the height is calculated from the ratio.",
        ],
      },
      {
        h: "Getting good results from vertical photos",
        paras: [
          "For the blur method, a photo with varied colours gives the most pleasing background. If the blurred edges look muddy, try a solid colour that appears in the photo, such as the colour of a shirt or a wall.",
          "Use a high resolution original when possible. The photo is placed at the height of the frame, so a small image will look soft if you pick a large output width. Download PNG for the best quality or JPG for a smaller file.",
        ],
      },
    ],
    tips: [
      "Use the blur background for videos and presentations to avoid empty bars.",
      "Pick a solid colour that matches your slide or website background.",
      "Crop to fill only when the important part of the photo is in the middle.",
      "Use a width of 1920 for full HD slides and 1200 for social link previews.",
      "Keep a copy of the original portrait photo for other uses.",
    ],
    faq: [
      { q: "How do I make a vertical photo horizontal without cropping?", a: "Use the blurred background or solid colour method. The whole photo is kept and the side space is filled." },
      { q: "Will the photo be stretched?", a: "No. Only the empty area changes, and the picture keeps its proportions." },
      { q: "Can I rotate instead?", a: "Yes. Choose Rotate 90 degrees to turn the photo without any filling or cropping." },
      { q: "What size is the download?", a: "You set the width and the height follows the ratio, up to 6000 pixels wide." },
      { q: "Is my photo uploaded?", a: "No. The image is edited in your browser." },
      free,
    ],
    related: ["image-resizer", "background-remover", "image-compressor", "image-converter", "color-converter"],
  },
  {
    slug: "signature-generator",
    name: "Digital Signature Generator",
    short: "Draw or type a signature and download it as a transparent PNG.",
    category: "Images",
    kind: "signature-generator",
    title: "Signature Generator: Draw or Type, PNG Download",
    description:
      "Create a digital signature online. Draw with a mouse or finger, or type your name in handwriting fonts, then download a transparent PNG. Free, no sign-up.",
    keywords: ["signature generator", "digital signature maker", "online signature creator", "draw signature online", "transparent signature png", "electronic signature image", "handwritten signature generator", "create signature for pdf"],
    intro: [
      "Contracts, rental agreements, forms and invoices often need a signature image. Printing a page, signing it and scanning it again is slow. A transparent PNG of your signature can be placed on a PDF or a Word document in seconds and looks as if you signed it on the page.",
      "Draw your signature with a mouse, a stylus or your finger on a touchscreen, or type your name and choose a handwriting style. Pick the ink colour, then download a PNG with a transparent background, trimmed neatly around the ink.",
    ],
    steps: [
      "Choose Draw to sign with your mouse or finger, or Type to use your name in a script font.",
      "Pick the ink colour and, for drawing, the pen thickness. Use Undo or Clear to try again.",
      "Press Download transparent PNG and insert the image into your document.",
    ],
    points: [
      { h: "Transparent background", p: "Place the signature on any document without a white box around it." },
      { h: "Smooth pen strokes", p: "Lines are smoothed so a shaky mouse still produces a clean signature." },
      { h: "Drawing stays on your device", p: "Your drawn signature is created in the browser and is not uploaded. Typed styles use handwriting fonts loaded from Google Fonts." },
    ],
    sections: [
      {
        h: "Is a signature image legally valid?",
        paras: [
          "Rules differ by country and by document. In many places an electronic signature can be valid for ordinary contracts when the signer clearly intends to sign. Some documents, such as wills, property transfers and certain government forms, need a handwritten signature, a witness or a specific e-signature service.",
          "An image of your signature on its own is not a certified digital signature. It does not prove who placed it or whether the document was changed afterwards. Check what the receiving party accepts, and use a formal e-signature service when you need an audit trail.",
        ],
      },
      {
        h: "How to add your signature to a PDF or Word document",
        paras: [
          "In Word or Google Docs, use Insert, then Image, and place the PNG where the signature goes. The transparent background means it can sit over a signature line. Resize it by dragging a corner so it keeps its proportions.",
          "For a PDF, most PDF viewers and phone apps have a fill and sign or add image option. Insert the PNG, move it to the signature box and save a new copy. Always keep the unsigned original in case something needs to change.",
        ],
      },
      {
        h: "Tips for a signature that looks natural",
        paras: [
          "Draw large and slowly. A signature drawn small and fast in a corner often looks scribbled once it is placed on a page. On a phone, turn the device sideways to get a wider drawing area, and use a stylus if you have one.",
          "A black or dark blue ink looks like a real pen. If you only need a signature for personal convenience, typed script styles are quick, but they look the same as other people's choices. For anything formal, a drawn signature that resembles your real one is better.",
        ],
      },
    ],
    tips: [
      "Draw bigger than you think you need. The tool trims the empty space for you.",
      "Use dark blue or black ink for a natural look.",
      "Keep the PNG in a safe folder, and do not share it publicly.",
      "Insert the signature into a copy of the document, never the original.",
      "Check requirements first. Some institutions need a wet ink signature.",
    ],
    faq: [
      { q: "Can I use this signature on contracts?", a: "Often yes for simple agreements, but it depends on the country and the document. Check what the other party accepts." },
      { q: "Why is the background transparent?", a: "A transparent PNG lets you place the signature on any document without a white box." },
      { q: "Does it work on a phone?", a: "Yes. Draw with a finger or stylus. Turning the phone sideways gives more room." },
      { q: "Does the typed signature need internet?", a: "The handwriting fonts are loaded from Google Fonts. If they cannot load, a standard cursive font is used." },
      { q: "Is my signature saved?", a: "No. It exists only in your browser until you download it." },
      free,
    ],
    related: ["background-remover", "pdf-reader", "invoice-generator", "image-resizer", "image-compressor"],
  },
];
