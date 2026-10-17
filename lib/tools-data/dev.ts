import type { Tool } from "../tool-types";
import { free } from "../tool-types";

const local = {
  h: "Runs in your browser",
  p: "Your data is processed on your own device. Nothing you enter is sent to our servers or stored.",
};

export const DEV_TOOLS: Tool[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter and Validator",
    short: "Format, validate and minify JSON with error positions and a collapsible tree view.",
    category: "Developer and Security",
    kind: "json-formatter",
    title: "JSON Formatter and Validator: Pretty Print",
    description:
      "Format, validate and minify JSON online. See the line and column of syntax errors, sort keys and browse a collapsible tree. Free, private, nothing uploaded.",
    keywords: ["json formatter", "json validator", "json beautifier", "json pretty print", "minify json", "json viewer online", "fix invalid json", "json tree viewer"],
    intro: [
      "API responses and configuration files often arrive as a single unreadable line of JSON. One missing comma or quote can break an entire application, and finding it by eye in a minified file is painful. A formatter turns that block into an indented, readable structure, and a validator tells you exactly where the problem is.",
      "Paste your JSON and press Format to indent it, Minify to remove all whitespace, or just watch the live validation message. Errors show the line and column when your browser reports them. A collapsible tree view lets you explore nested objects and arrays without scrolling through everything.",
    ],
    steps: [
      "Paste your JSON into the input box. The validation message updates as you type.",
      "Press Format to pretty print with 2 spaces, 4 spaces or tabs, or Minify to compress it. Tick Sort keys to order the keys alphabetically.",
      "Copy or download the result, or explore the tree view beneath it.",
    ],
    points: [
      { h: "Clear error messages", p: "Syntax errors show the problem and, where the browser supports it, the line and column number." },
      { h: "Tree view", p: "Collapse and expand objects and arrays, with colours for strings, numbers and booleans." },
      { h: "Simple repair", p: "One click removes trailing commas and swaps single quotes for double quotes when that is all that is wrong." },
      local,
    ],
    sections: [
      {
        h: "What is valid JSON?",
        paras: [
          "JSON, short for JavaScript Object Notation, is a text format for structured data. It has six value types: objects in curly braces, arrays in square brackets, strings in double quotes, numbers, true or false, and null. Keys must be strings in double quotes, and items are separated by commas with no comma after the last one.",
          "JSON is stricter than JavaScript object syntax. Single quotes, unquoted keys, comments, trailing commas and values such as undefined or NaN are all invalid. These are the usual reasons that a JSON file copied from code or a document fails to parse.",
        ],
      },
      {
        h: "Common JSON errors and how to fix them",
        paras: [
          "The most frequent mistakes are a trailing comma after the last item, single quotes around strings, a missing comma between items, a missing closing bracket and unescaped quotes inside a string. The error message usually points to the first character the parser could not understand, and the real mistake is often just before it.",
          "The simple repair button handles two cases safely: trailing commas and single quotes when the text contains no double quotes at all. It will not guess at missing brackets or damaged strings, because a wrong guess could change your data. For those, use the line and column in the message to find the problem.",
        ],
      },
      {
        h: "When should you minify JSON?",
        paras: [
          "Minifying removes spaces, tabs and line breaks. The data is identical, but the file is smaller, which saves bandwidth when sending it to a browser or between services. Keep the formatted version for editing and the minified one for production.",
          "Sorting keys alphabetically helps when you compare two JSON files, store snapshots in version control or want a predictable order. Note that sorting changes the order of keys in objects but never the order of items inside arrays, since array order carries meaning.",
        ],
      },
    ],
    tips: [
      "Use 2 space indentation for web projects. It keeps files compact and readable.",
      "Sort keys before comparing two JSON files in a diff tool.",
      "Never paste secrets such as passwords or tokens into any online tool you do not trust.",
      "Check numbers carefully. Very large integers can lose precision in JavaScript.",
      "Minify before embedding JSON in HTML or sending it over a slow link.",
    ],
    faq: [
      { q: "How do I validate JSON?", a: "Paste it into the box. The tool says Valid JSON or shows the error with a position." },
      { q: "Why does my JSON fail with an unexpected token?", a: "Look for a trailing comma, single quotes, a comment or a missing comma near the position shown." },
      { q: "Does formatting change my data?", a: "No. Formatting only changes whitespace. Sorting keys changes object key order only." },
      { q: "Can it handle large files?", a: "Very large files depend on your device memory. The tree view is best for moderate sizes." },
      { q: "Is my JSON uploaded?", a: "No. It is parsed in your browser." },
      free,
    ],
    related: ["base64-image-converter", "unix-timestamp-converter", "hash-generator", "text-case-converter", "markdown-previewer"],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    short: "Create QR codes for links, Wi-Fi, contacts, email, phone and text. Download PNG or SVG.",
    category: "Developer and Security",
    kind: "qr-code-generator",
    title: "QR Code Generator: Free, No Expiry, PNG and SVG",
    description:
      "Create QR codes for links, Wi-Fi, contacts, email, phone and SMS. Set size, colours and error correction, then download PNG or SVG. Free, never expires.",
    keywords: ["qr code generator", "free qr code generator", "wifi qr code", "vcard qr code", "qr code for url", "qr code svg", "qr code no expiry", "create qr code online"],
    intro: [
      "A QR code connects the physical world to a phone in a second. Restaurants use them for menus, shops for payments, businesses for contact details and homes for Wi-Fi passwords. The code only needs to carry the text, so a static QR code works forever and does not depend on any service staying online.",
      "This generator makes static codes for website links, plain text, Wi-Fi networks, contact cards, email, phone numbers and SMS messages. Choose the size, margin, colours and error correction, preview the result and download a PNG or a scalable SVG for printing.",
    ],
    steps: [
      "Choose what the code should hold: a link, text, Wi-Fi, contact, email, phone or SMS.",
      "Fill in the details and adjust size, colours and error correction if needed.",
      "Test the preview with your phone camera, then download PNG or SVG.",
    ],
    points: [
      { h: "Static codes that never expire", p: "The data is stored in the code itself. There is no tracking link, no subscription and nothing to renew." },
      { h: "Seven content types", p: "Link, text, Wi-Fi, vCard contact, email, phone call and SMS, each in the standard format phones understand." },
      { h: "Print ready", p: "SVG scales to any size without blurring, and PNG works in documents and slides." },
      { h: "Private", p: "Your Wi-Fi password or contact details are encoded in your browser and never uploaded." },
    ],
    sections: [
      {
        h: "How do you make a Wi-Fi QR code?",
        paras: [
          "Choose Wi-Fi, enter the network name exactly as it appears, add the password and select the security type, which is usually WPA. When someone scans the code, their phone offers to join the network without typing the password. Special characters such as semicolons and colons are escaped automatically so that complex passwords still work.",
          "Print the code and stick it somewhere guests can see it. Remember that anyone who can scan it can read the password, so use it only where that is acceptable, and create a guest network for visitors if your router supports it.",
        ],
      },
      {
        h: "What does error correction mean?",
        paras: [
          "QR codes contain extra data so they can still be read when partly damaged or covered. There are four levels: Low restores about 7 percent of the data, Medium about 15 percent, Quartile 25 percent and High 30 percent. Higher levels make the code denser, with more squares, which can be harder to scan at small sizes.",
          "Use Medium for most uses. Choose High if the code will be printed on a surface that may get scuffed, or if you plan to place a logo in the middle. Use Low only for short data that must stay simple to scan.",
        ],
      },
      {
        h: "Tips for QR codes that scan every time",
        paras: [
          "Keep a quiet zone, the blank margin around the code. The default margin of 4 squares matches the standard. Use dark dots on a light background, because many scanners struggle with inverted or low contrast codes. The tool warns you if your colours are too close.",
          "Print the code large enough for the distance. A good rule is that the code should be about one tenth of the scanning distance, so a code scanned from 1 metre should be about 10 centimetres wide. Always test the final printed version with more than one phone before you print a large batch.",
        ],
      },
    ],
    tips: [
      "Use a short web address. Shorter data makes a simpler code that is easier to scan.",
      "Test with both an iPhone and an Android phone.",
      "Use SVG for posters and packaging so it stays sharp at any size.",
      "Do not invert the colours. Dark dots on a light background scan best.",
      "Add a short label near the code so people know what it does.",
    ],
    faq: [
      { q: "Do these QR codes expire?", a: "No. They are static codes that contain the data itself, so they work as long as the destination exists." },
      { q: "Can I add a logo?", a: "Not in this tool. If you add one yourself in an editor, use High error correction and test carefully." },
      { q: "What size should I download?", a: "Use SVG for print. For screens, 500 to 1000 pixels PNG is plenty." },
      { q: "Why does it say there is too much data?", a: "QR codes hold a limited amount. Shorten the text or lower the error correction level." },
      { q: "Is the data uploaded?", a: "No. The code is generated in your browser." },
      free,
    ],
    related: ["barcode-generator", "color-converter", "image-resizer", "password-generator", "image-converter"],
  },
  {
    slug: "barcode-generator",
    name: "Barcode Generator",
    short: "Create Code 128, EAN-13, UPC-A, Code 39 and ITF barcodes and download SVG or PNG.",
    category: "Developer and Security",
    kind: "barcode-generator",
    title: "Barcode Generator: Code 128, EAN-13, UPC-A",
    description:
      "Generate Code 128, EAN-13, UPC-A, Code 39 and ITF barcodes with automatic check digits. Download SVG or PNG for labels and packaging. Free, no sign-up.",
    keywords: ["barcode generator", "code 128 barcode generator", "ean 13 barcode generator", "upc a barcode generator", "code 39 generator", "free barcode maker", "barcode svg", "create barcode online"],
    intro: [
      "Barcodes label stock in a warehouse, track parcels, identify library books and mark products on a shelf. Each type has its own rules about which characters it can hold, how long it can be and how the check digit works. Getting any of that wrong produces a code that scanners reject.",
      "This generator builds five common types from the specification, validates your input and shows clear messages when something does not fit. For EAN-13 and UPC-A it calculates the check digit for you. Adjust bar width and height, show or hide the number and download a clean SVG or PNG.",
    ],
    steps: [
      "Choose the barcode type and enter the value. A valid sample is filled in for each type.",
      "Adjust bar width, height and whether to show the human readable number.",
      "Download SVG for printing or PNG for documents, and test with a scanner.",
    ],
    points: [
      { h: "Five standard types", p: "Code 128, EAN-13, UPC-A, Code 39 and Interleaved 2 of 5 (ITF)." },
      { h: "Automatic check digits", p: "Enter 12 digits for EAN-13 or 11 for UPC-A and the final digit is added. A wrong check digit is flagged." },
      { h: "Vector output", p: "SVG files stay sharp at any print size, with a quiet zone included." },
      local,
    ],
    sections: [
      {
        h: "Which barcode type should you use?",
        paras: [
          "Code 128 is the best general choice. It encodes all standard keyboard characters, packs data densely and is read by nearly every scanner, so it is common in shipping labels and inventory. This tool switches to the compact numeric mode automatically when the text is an even number of digits.",
          "EAN-13 and UPC-A are retail product codes. EAN-13 is used internationally and UPC-A in the United States and Canada. Code 39 is an older format that holds capital letters, digits and a few symbols, still used in industry and government. ITF is used on cartons and packaging and holds only an even number of digits.",
        ],
      },
      {
        h: "How does a check digit work?",
        paras: [
          "A check digit is an extra number that lets a scanner detect a misread or mistyped code. For EAN-13, the digits are multiplied alternately by 1 and 3, added up, and the check digit is whatever brings the total to a multiple of ten. UPC-A uses the same idea with the weights reversed.",
          "For example the EAN-13 number 4006381333931 ends in 1 because the first twelve digits give a weighted sum of 89, and 1 brings it to 90. If you enter a full number with the wrong last digit, the tool tells you what it should be instead of drawing an invalid code.",
        ],
      },
      {
        h: "Can you use these for products in shops?",
        paras: [
          "A barcode that scans is not automatically a valid product code. Shops expect EAN or UPC numbers assigned by GS1, the organisation that manages the global numbering system. Using random numbers can clash with a real product. Register with GS1 in your country or ask your retailer how to obtain numbers.",
          "For internal use, such as asset tags, shelves, tickets and private inventory, you are free to choose your own values, ideally with Code 128 or Code 39. Print at a decent size, keep the quiet zone clear and test with the scanner you will actually use.",
        ],
      },
    ],
    tips: [
      "Keep the quiet zone empty. Do not crowd the edges of the barcode.",
      "Use black bars on a white background for the most reliable scanning.",
      "Print at 100 percent size and avoid shrinking to fit.",
      "Increase the bar width if your printer is low resolution.",
      "Test a printed sample with your scanner before printing in bulk.",
    ],
    faq: [
      { q: "How do I generate an EAN-13 barcode?", a: "Choose EAN-13 and enter 12 digits. The check digit is added automatically." },
      { q: "Why does my UPC-A show an error?", a: "UPC-A needs 11 digits, or 12 if you include a correct check digit." },
      { q: "Which characters does Code 39 support?", a: "Digits, capital letters, space and the symbols - . $ / + %." },
      { q: "Can I scan the barcode on screen?", a: "Usually yes, but screens can reflect light. Printing gives the most reliable result." },
      { q: "Are the barcodes legally valid for retail?", a: "Shops need numbers issued by GS1. This tool only draws the code." },
      free,
    ],
    related: ["qr-code-generator", "image-resizer", "invoice-generator", "hash-generator", "password-generator"],
  },
  {
    slug: "password-generator",
    name: "Secure Password Generator",
    short: "Generate strong random passwords, passphrases and PINs with your browser's crypto.",
    category: "Developer and Security",
    kind: "password-generator",
    title: "Secure Password Generator: Strong and Random",
    description:
      "Generate strong random passwords, memorable passphrases and PINs using your browser's cryptographic random generator. See entropy and strength. Private.",
    keywords: ["password generator", "strong password generator", "random password generator", "passphrase generator", "secure password generator", "pin generator", "generate strong password online", "password strength"],
    intro: [
      "Weak and reused passwords are the main way accounts get broken into. Human made passwords follow patterns: a name, a year, an exclamation mark at the end. Attackers know these patterns and try them first. A truly random password has no pattern to guess.",
      "This generator creates random passwords, passphrases made of several words, and numeric PINs. It uses the cryptographically secure random generator built into your browser, with no bias, and the result never leaves your device. A strength meter shows the entropy in bits so you can see how hard the password would be to guess.",
    ],
    steps: [
      "Choose Password, Passphrase or PIN.",
      "Set the length and the character types, or the number of words for a passphrase.",
      "Press Generate, copy the result into your password manager and use it for one account only.",
    ],
    points: [
      { h: "Cryptographically secure", p: "Uses crypto.getRandomValues with rejection sampling so that every character is equally likely." },
      { h: "Three modes", p: "Passwords up to 128 characters, passphrases from a list of over 500 common words, and PINs from 4 to 12 digits." },
      { h: "Entropy meter", p: "A strength label with bits of entropy shows how large the search space is." },
      { h: "Nothing sent or stored", p: "Generation happens in your browser and passwords are never transmitted." },
    ],
    sections: [
      {
        h: "What makes a password strong?",
        paras: [
          "Strength comes from unpredictability and length. Each extra character multiplies the number of possible passwords. A 16 character password drawn from upper and lower case letters, digits and symbols has about 100 bits of entropy, which is far beyond what any attacker can try by brute force today.",
          "Rules such as one capital and one symbol matter less than length and randomness. A random 16 character password of letters alone is much stronger than an 8 character one with every symbol type. Aim for at least 14 to 16 characters for anything important, and use a different password for every account.",
        ],
      },
      {
        h: "Password or passphrase: which is better?",
        paras: [
          "A passphrase is a string of random words, like Maple-Rocket-Cloud-Tiger. Because the word list has 514 entries, each word adds about 9 bits of entropy, so four words give roughly 36 bits and six words around 54. That is easier to remember and type than a random jumble, though it needs more characters for the same strength.",
          "Use a passphrase for things you must type from memory, such as the master password of a password manager, your device login or a disk encryption key. Use a long random password for everything else and let the password manager remember it. Six or more words are recommended for a master passphrase.",
        ],
      },
      {
        h: "How to store and use generated passwords safely",
        paras: [
          "Use a reputable password manager so you do not need to remember or write passwords down. Turn on two-factor authentication for important accounts such as email, banking and social media, since it protects you even when a password leaks.",
          "Never reuse a password, never share it by message and change it if a service reports a breach. Be cautious about any password tool that sends data to a server. This page does not, and you can confirm that by checking your browser's network panel while you generate.",
        ],
      },
    ],
    tips: [
      "Use at least 16 characters for important accounts.",
      "Use a password manager and a unique password for every site.",
      "Turn on two-factor authentication wherever it is offered.",
      "Use a six word passphrase for your master password.",
      "Avoid look-alike characters if you need to type the password by hand.",
    ],
    faq: [
      { q: "Is it safe to generate passwords in a browser?", a: "Yes, when the page uses the browser's secure random generator and does not send the result anywhere, as this tool does." },
      { q: "How long should my password be?", a: "At least 14 to 16 characters for important accounts, longer for master passwords." },
      { q: "What does entropy mean?", a: "It measures unpredictability in bits. Each extra bit doubles the number of guesses needed." },
      { q: "Why avoid look-alike characters?", a: "Characters such as 1, l, 0 and O are easy to confuse when you read a password aloud or type it by hand." },
      { q: "Does the site store my passwords?", a: "No. They exist only on your screen until you copy them." },
      free,
    ],
    related: ["hash-generator", "qr-code-generator", "exif-remover", "json-formatter", "random-number-generator"],
  },
  {
    slug: "hash-generator",
    name: "Cryptographic Hash Generator",
    short: "Calculate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes for text or files.",
    category: "Developer and Security",
    kind: "hash-generator",
    title: "Hash Generator: MD5, SHA-1, SHA-256, SHA-512",
    description:
      "Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes for text or files and compare checksums to verify downloads. Free and private, runs in your browser.",
    keywords: ["hash generator", "sha256 generator", "md5 hash generator", "sha512 hash", "file checksum calculator", "verify file hash", "sha1 generator", "checksum compare online"],
    intro: [
      "A hash is a fixed length fingerprint of some data. Change a single character and the fingerprint changes completely, yet the same input always gives the same output. That makes hashes useful for checking that a download is intact, comparing files without opening them and storing fingerprints in databases.",
      "Type or paste text, or choose a file, and this tool shows its MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes at once. Paste a published checksum into the compare box and it tells you whether it matches any of them. Everything is computed in your browser, so files are never uploaded.",
    ],
    steps: [
      "Enter some text, or choose a file to hash.",
      "Copy the hash you need. Switch to uppercase hexadecimal if your source uses it.",
      "To verify a download, paste the checksum from the publisher into the compare box and look for a match.",
    ],
    points: [
      { h: "Five algorithms together", p: "MD5, SHA-1, SHA-256, SHA-384 and SHA-512, calculated at once." },
      { h: "Files without uploading", p: "Large files are read by your browser and hashed locally." },
      { h: "Checksum comparison", p: "Paste an expected hash and see instantly whether it matches." },
      local,
    ],
    sections: [
      {
        h: "What is a cryptographic hash?",
        paras: [
          "A hash function takes any amount of data and produces a short fixed length value, written as hexadecimal characters. SHA-256 always produces 64 characters and SHA-512 produces 128, whether the input is one letter or a ten gigabyte file. Good hash functions are one way: you cannot work back from the hash to the input, and it is practically impossible to find two different inputs with the same hash.",
          "Hashing is not encryption. Encryption can be reversed with a key, while a hash cannot be reversed at all. People sometimes say they decrypted a hash when they really guessed the input and checked that it matched, which is why weak or common passwords can still be found.",
        ],
      },
      {
        h: "How do you verify a file download with a checksum?",
        paras: [
          "Software publishers often list a SHA-256 checksum next to the download link. After downloading, hash the file and compare. If the values match, the file is exactly what the publisher posted, with no corruption in transit. If they do not match, download it again or do not run it.",
          "A checksum on the same web page as the download proves the file arrived intact, but not that the site itself is trustworthy. For high risk software, look for digital signatures or checksums published through a separate trusted channel.",
        ],
      },
      {
        h: "Which hash algorithm should you use?",
        paras: [
          "For anything related to security, use SHA-256 or stronger. MD5 and SHA-1 are broken for security purposes, because researchers have found ways to produce different inputs with the same hash. They are still fine for catching accidental corruption and are widely used for old checksums, but never for signatures, certificates or storing passwords.",
          "For storing passwords, plain hashes of any kind are not enough. Use a dedicated password hashing function such as Argon2, bcrypt or scrypt, which adds salt and is deliberately slow. This tool is for checksums and learning, not for building a login system.",
        ],
      },
    ],
    tips: [
      "Compare hashes character by character or use the compare box. Do not rely on a glance.",
      "Use SHA-256 for new work. Use MD5 only when a source requires it.",
      "Make sure text has no hidden trailing newline when comparing with a command line tool.",
      "Hash the original file, not a copy that has been renamed or edited.",
      "Never use a plain hash to store passwords.",
    ],
    faq: [
      { q: "How do I check a SHA-256 checksum?", a: "Choose the file, then paste the published value into the compare box. The tool says Match if it equals a computed hash." },
      { q: "Is MD5 secure?", a: "No. It is fine for detecting accidental errors but not for security." },
      { q: "Why is my hash different from a command line tool?", a: "A trailing newline or different text encoding changes the input. This tool hashes UTF-8 text exactly as typed." },
      { q: "Can a hash be reversed?", a: "No. Short or common inputs can be guessed, but the function itself cannot be undone." },
      { q: "Is my file uploaded?", a: "No. It is read and hashed in your browser." },
      free,
    ],
    related: ["password-generator", "json-formatter", "unix-timestamp-converter", "base64-image-converter", "qr-code-generator"],
  },
];
