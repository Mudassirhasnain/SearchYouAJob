import type { Tool } from "../tool-types";
import { free } from "../tool-types";

const local = {
  h: "Runs in your browser",
  p: "Your text is processed on your own device. Nothing you type or paste is sent to our servers or stored.",
};

export const TEXT_TOOLS: Tool[] = [
  {
    slug: "text-case-converter",
    name: "Text Case Converter",
    short: "Change text to upper, lower, title, camel, snake or kebab case, and clean up lines.",
    category: "Text and Writing",
    kind: "text-case-converter",
    title: "Text Case Converter: Upper, Lower, Title Case",
    description:
      "Convert text to uppercase, lowercase, title case, sentence case, camelCase, snake_case and kebab-case. Sort lines and remove duplicates. Free, no sign-up.",
    keywords: ["text case converter", "uppercase to lowercase", "title case converter", "camelcase converter", "snake case converter", "remove duplicate lines", "sort lines alphabetically", "kebab case converter"],
    intro: [
      "Retyping text because it was pasted in the wrong case is a waste of time. A heading arrives in capitals, a list of names is in lowercase, or a variable name needs to change from one style to another. This tool changes the case of your text in one click and keeps the result in the same box, so you can chain several changes.",
      "It also includes line tools for the other small jobs that come with copied text: sorting a list alphabetically, removing duplicate lines, deleting empty lines and trimming stray spaces. Everything works on whatever is in the text box, so paste, press, and copy the result.",
    ],
    steps: [
      "Paste or type your text into the box.",
      "Press a case button such as Title Case, camelCase or snake_case, or a line tool such as Remove duplicate lines.",
      "Press Copy text, or keep applying changes. Clear empties the box.",
    ],
    points: [
      { h: "Ten case styles", p: "Uppercase, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE and aLtErNaTiNg." },
      { h: "Line cleanup tools", p: "Sort A to Z or Z to A, remove duplicates, drop empty lines, trim each line, collapse spaces, reverse order and number lines." },
      local,
    ],
    sections: [
      {
        h: "What is the difference between title case and sentence case?",
        paras: [
          "Title Case capitalises the first letter of every word, as in The Quick Brown Fox. It is the usual style for headlines, book titles and menu labels. Sentence case capitalises only the first word of each sentence and any proper nouns, as in The quick brown fox. Most modern style guides prefer sentence case for headings on websites because it reads more naturally.",
          "This converter capitalises every word for Title Case. Formal style guides leave small words such as of, and, the and to in lowercase, so check headlines against the guide your publisher uses. Sentence case lowercases everything first and then capitalises the start of each sentence, so proper nouns need to be fixed by hand.",
        ],
      },
      {
        h: "camelCase, snake_case and kebab-case: where each is used",
        paras: [
          "Programmers use naming styles to join several words into one identifier. camelCase starts lowercase and capitalises each later word, and is common for variables and functions in JavaScript, Java and Swift. PascalCase capitalises every word and is typical for class and component names. snake_case joins words with underscores and is standard in Python, Ruby and database column names.",
          "kebab-case uses hyphens and is the usual choice for URLs, CSS class names and file names, because search engines treat a hyphen as a word separator. CONSTANT_CASE uses capitals with underscores for constants and environment variables. Paste a plain phrase such as user profile image and the tool turns it into each style instantly.",
        ],
      },
      {
        h: "Cleaning up lists, names and copied text",
        paras: [
          "Copying text from a PDF, a spreadsheet or an email often brings extra spaces, blank lines and duplicate entries. Collapse extra spaces fixes double spacing, Trim each line removes leading and trailing space, and Remove empty lines tightens a list. Remove duplicate lines keeps the first copy of each line, which is handy for email lists, keyword lists and tag lists.",
          "Sorting uses a locale aware comparison, so accented letters sort sensibly. Number lines adds 1., 2., 3. in front of every line, which turns a plain list into a quick numbered one. Reverse line order flips the list top to bottom.",
        ],
      },
    ],
    tips: [
      "Run Remove duplicate lines before sorting if you want a clean unique list.",
      "Check Title Case results for small words if you follow a formal style guide.",
      "Convert a sentence to kebab-case to turn a page title into a URL slug.",
      "Use Sentence case on text that was pasted in capitals, then fix proper nouns.",
      "Paste back into your original app and check special characters, accents and quotes.",
    ],
    faq: [
      { q: "How do I convert uppercase text to lowercase?", a: "Paste the text, then press the lowercase button. The whole text changes at once and you can copy it." },
      { q: "Does it handle accented letters?", a: "Yes. Letters such as e with an accent are converted, and sorting takes accents into account." },
      { q: "Why does Title Case capitalise small words like of and the?", a: "The tool applies a simple rule, capital letter on every word. If your style guide keeps small words in lowercase, edit them afterwards." },
      { q: "Can I undo a change?", a: "Use your browser's undo shortcut in the text box, or paste the original text again. The tool does not store a history." },
      { q: "Is there a size limit?", a: "No fixed limit. Very large texts depend on your device memory." },
      { q: "Is my text stored or uploaded?", a: "No. All changes happen in your browser." },
    ],
    related: ["word-counter", "lorem-ipsum-generator", "markdown-previewer", "pdf-maker", "json-formatter"],
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    short: "Generate placeholder text by paragraph, sentence or word count, with optional HTML tags.",
    category: "Text and Writing",
    kind: "lorem-ipsum-generator",
    title: "Lorem Ipsum Generator: Dummy Text, Free",
    description:
      "Generate lorem ipsum placeholder text by paragraphs, sentences or words. Optional HTML paragraph tags and classic opening line. Free, fast, no sign-up needed.",
    keywords: ["lorem ipsum generator", "dummy text generator", "placeholder text", "lorem ipsum paragraphs", "lorem ipsum words", "random text generator", "filler text for design", "lorem ipsum html"],
    intro: [
      "Designers and developers need realistic looking text before the real copy exists. A card with a single word does not show how a layout handles a long line, and a page filled with the same sentence repeated looks wrong in a mock-up. Lorem ipsum solves this by giving the eye something that looks like normal writing without distracting readers with meaning.",
      "This generator produces the amount you ask for: a number of paragraphs, sentences or words. You can start with the classic opening line, wrap paragraphs in HTML tags for pasting into code, and press Generate new text to get a different set whenever you need variation.",
    ],
    steps: [
      "Choose paragraphs, sentences or words and enter how many you need.",
      "Tick or untick the classic opening line and, for paragraphs, the HTML tag option.",
      "Press Copy text and paste it into your design, document or code.",
    ],
    points: [
      { h: "Exact amounts", p: "Ask for 3 paragraphs, 12 sentences or 150 words and get exactly that, up to generous limits." },
      { h: "Ready for code", p: "The HTML option wraps each paragraph in a p tag so you can paste straight into a template." },
      { h: "Instant and private", p: "Text is generated in your browser with no requests, no ads in the way and nothing stored." },
    ],
    sections: [
      {
        h: "What is lorem ipsum and where does it come from?",
        paras: [
          "Lorem ipsum is scrambled Latin used as dummy text by printers and designers for centuries. It is based on passages from a work by the Roman writer Cicero, rearranged and altered so that it does not read as meaningful Latin. The aim is a natural looking spread of word lengths and letter patterns that does not pull attention away from the layout.",
          "The version most people know begins with the words lorem ipsum dolor sit amet. This generator uses a pool of the standard words and builds sentences of varied length with commas in some of them, which gives paragraphs a more realistic rhythm than a random jumble.",
        ],
      },
      {
        h: "When should you use placeholder text?",
        paras: [
          "Placeholder text is useful in wireframes, website templates, brochures, slide layouts, fonts specimens and app screens during development. It lets you judge line length, spacing, headline sizes and how a design copes with short and long content. It is also useful in tests, such as checking how a database field or a text box behaves with several thousand characters.",
          "It is a poor idea to ship it. Real content changes the way a design works, so replace placeholder text with the actual words as early as you can, and search your pages for lorem before launch. Search engines can treat pages filled with dummy text as low quality.",
        ],
      },
      {
        h: "Tips for realistic mock-ups",
        paras: [
          "Real copy varies in length. A headline might be four words or fourteen, and a product description might run to one sentence or three paragraphs. Generate several sizes and try the extremes in your layout rather than only the average. Test very short and very long content so the design does not break when a client adds something unexpected.",
          "If your project has a language other than English, remember that word length changes. German words are often long, and languages written right to left need extra layout checks. Placeholder text only helps with the typical case, so test the final language as soon as it is available.",
        ],
      },
    ],
    tips: [
      "Generate a few different lengths and test your layout with all of them.",
      "Use words mode for button labels, tags and headlines.",
      "Use the HTML option when pasting into a CMS or code editor.",
      "Replace dummy text with real copy before publishing the page.",
      "Press Generate new text to avoid the same paragraph repeating in a mock-up.",
    ],
    faq: [
      { q: "What does lorem ipsum mean?", a: "It has no real meaning. It is altered Latin used as filler so that people look at the design, not the words." },
      { q: "Is lorem ipsum good for SEO?", a: "No. Use it only while building. Pages launched with dummy text can look low quality to search engines and visitors." },
      { q: "Can I get the same text again?", a: "The text changes each time you press Generate new text. Copy the text you want to keep." },
      { q: "How many paragraphs can I generate?", a: "Up to 200 paragraphs or sentences, and up to 2000 words in one go." },
      { q: "Can I get HTML with p tags?", a: "Yes. In paragraph mode, tick Wrap in p tags and the output is ready for code." },
      free,
    ],
    related: ["text-case-converter", "word-counter", "markdown-previewer", "color-converter", "json-formatter"],
  },
  {
    slug: "markdown-previewer",
    name: "Markdown Previewer",
    short: "Write Markdown on the left and see the formatted result live on the right.",
    category: "Text and Writing",
    kind: "markdown-previewer",
    title: "Markdown Previewer: Live Editor, Free Online",
    description:
      "Write Markdown and see a live preview side by side. Supports headings, lists, tables, code, links and quotes. Download .md or HTML. Free and private.",
    keywords: ["markdown previewer", "markdown editor online", "markdown viewer", "markdown to html", "live markdown preview", "github markdown preview", "online markdown editor free", "markdown cheat sheet"],
    intro: [
      "Markdown is a way of writing formatted text with plain characters. A pound sign makes a heading, asterisks make bold and a hyphen starts a bullet. It is used in README files, documentation, notes apps, forums and many blogs, because it is quick to write and readable even before it is converted.",
      "This previewer shows you the result as you type. The editor sits on one side and the formatted page on the other, so you can check a table, a list or a code block before pasting it into a project. When you are done, download the Markdown file or the converted HTML.",
    ],
    steps: [
      "Type or paste your Markdown into the left pane. A short sample is loaded so you can see the syntax.",
      "Watch the right pane update. Fix anything that does not look right.",
      "Download the .md file or the HTML, or press Copy HTML.",
    ],
    points: [
      { h: "Common Markdown supported", p: "Headings, bold, italic, strikethrough, inline code, fenced code blocks, links, ordered and unordered lists, quotes, tables and horizontal rules." },
      { h: "Safe by design", p: "Any HTML you type is escaped and shown as text, and only http, https and mailto links are allowed, so a pasted snippet cannot run scripts." },
      local,
    ],
    sections: [
      {
        h: "Markdown syntax you will use every day",
        paras: [
          "Headings use one to six pound signs, so a single sign is the biggest heading and six is the smallest. Wrap words in two asterisks for bold or one asterisk for italic. Start a line with a hyphen, asterisk or plus to make a bullet, or with a number and a full stop to make a numbered list. Put a greater than sign at the start of a line to make a quote.",
          "Links are written as the text in square brackets followed by the address in round brackets. Inline code goes between backticks, and a block of code goes between two lines of three backticks. Leave a blank line between paragraphs, because a single line break inside a paragraph is treated as a space.",
        ],
      },
      {
        h: "How do you write a table in Markdown?",
        paras: [
          "Tables use pipes to separate columns. Write a header row with pipes between the names, then a second row of hyphens in each column, then your data rows. The row of hyphens tells the parser that it is a table. Spacing does not need to line up perfectly, but aligned columns are easier to read in the raw file.",
          "Tables are one of the features that differ between Markdown flavours. This previewer handles the common GitHub style table. If you paste Markdown meant for a different platform, a few advanced features such as footnotes, task lists or embedded HTML may look different once published, so always check the final platform too.",
        ],
      },
      {
        h: "Where is Markdown used?",
        paras: [
          "Developers write README files and documentation in Markdown because it lives happily in version control and renders nicely on code hosting sites. Writers use it in note taking apps and static site generators, where a folder of plain text files becomes a website. Many forums and chat tools accept a subset of Markdown for bold and code formatting.",
          "Because the source is plain text, Markdown files are small, future proof and easy to search. You can open them in any editor on any device, which is why people keep notes, drafts and long documents in this format.",
        ],
      },
    ],
    tips: [
      "Leave a blank line before and after lists, tables and code blocks.",
      "Use two spaces or a blank line to separate paragraphs, not a single return.",
      "Check links by hovering. Only web and mail links are made clickable here.",
      "Download the .md file as a backup before you close the page.",
      "Copy HTML if you need to paste formatted content into a template.",
    ],
    faq: [
      { q: "Does it support GitHub flavoured Markdown?", a: "It supports the common parts: tables, fenced code, strikethrough and lists. Some advanced extensions such as task lists and footnotes are not rendered." },
      { q: "Can I use HTML inside the Markdown?", a: "HTML you type is shown as text rather than run. This keeps the preview safe." },
      { q: "Why did my list not render?", a: "Put a blank line before the first item and use a hyphen, asterisk or number with a space after it." },
      { q: "Can I export to PDF?", a: "Download the HTML, open it in a browser and use Print, then Save as PDF. You can also copy the text into the PDF Maker." },
      { q: "Does it save my work?", a: "No. Download the file to keep it, since nothing is stored." },
      free,
    ],
    related: ["text-case-converter", "word-counter", "pdf-maker", "json-formatter", "lorem-ipsum-generator"],
  },
  {
    slug: "word-counter",
    name: "Word and Character Counter",
    short: "Count words, characters, sentences and reading time, and check limits for posts and SEO.",
    category: "Text and Writing",
    kind: "word-counter",
    title: "Word Counter and Character Counter, Free",
    description:
      "Count words, characters with and without spaces, sentences and paragraphs. See reading time, keyword density and limits for tweets, SEO titles and SMS.",
    keywords: ["word counter", "character counter", "word count online", "character count tool", "reading time calculator", "keyword density checker", "count words in text", "essay word counter"],
    intro: [
      "Essays have a word limit, tweets have a character limit and search results cut off long titles. A word counter answers the question of how long a piece of text really is, and does it while you type so you can trim or expand with confidence.",
      "Paste your text and the counts update immediately: words, characters with and without spaces, sentences, paragraphs, reading time and speaking time. Below that you will find a list of common character limits and the most used words in your text, which helps with writing for search and with spotting repeated words.",
    ],
    steps: [
      "Type or paste your text into the box.",
      "Read the live counts for words, characters, sentences and paragraphs.",
      "Check the limits panel for your platform and the keyword list for repeated words, then edit.",
    ],
    points: [
      { h: "Everything at a glance", p: "Eight counts update as you type, including words per sentence and estimated reading and speaking time." },
      { h: "Limits for real platforms", p: "See how close you are to 280 characters for a post, 60 for an SEO title and 160 for a meta description or SMS." },
      local,
    ],
    sections: [
      {
        h: "How are words and characters counted?",
        paras: [
          "A word is counted as any run of characters between spaces or line breaks, which matches the method used by most word processors. A hyphenated word such as well-known counts as one word. Characters are counted two ways: with spaces, which is what most platforms measure, and without spaces, which some forms and translation services use.",
          "Sentences are counted by full stops, question marks and exclamation marks followed by a space or the end of the text. This gives a good estimate, but abbreviations such as Dr. may add an extra sentence, so treat the figure as a guide and not as a rule.",
        ],
      },
      {
        h: "How is reading time calculated?",
        paras: [
          "Reading time divides the word count by an average adult silent reading speed of about 225 words per minute. Speaking time uses about 130 words per minute, which is a comfortable pace for a speech or a voice over. Both are estimates. Technical text, dense writing and reading in a second language are slower, while light skimming is faster.",
          "These figures are useful for planning. A five minute talk is roughly 650 words, and a blog post that takes seven minutes to read is about 1,600 words. Use them to size a presentation, a podcast script or an article before you start writing.",
        ],
      },
      {
        h: "Using keyword density without over-optimising",
        paras: [
          "The keyword panel lists the most frequent meaningful words in your text, with common filler words such as the and and removed. It is a quick way to see whether your main topic appears often enough and whether a word is being repeated more than it should.",
          "There is no magic percentage that search engines reward. Write for people first, use the words your readers would naturally use, and treat the list as a way to catch accidental repetition. If one non-topic word appears far more than any other, vary your wording.",
        ],
      },
    ],
    tips: [
      "Check the exact rules for your assignment. Some count headings and references, others do not.",
      "Keep SEO titles under 60 characters and meta descriptions under about 155 to avoid truncation.",
      "Aim for 15 to 20 words per sentence for easy reading.",
      "Read your text aloud once and compare with the speaking time estimate.",
      "Remove repeated words that appear at the top of the keyword list for no reason.",
    ],
    faq: [
      { q: "Does it count spaces as characters?", a: "Both counts are shown. Characters includes spaces and line breaks, and No spaces excludes all whitespace." },
      { q: "How accurate is the sentence count?", a: "Good for ordinary prose. Abbreviations and decimals can add small errors." },
      { q: "What reading speed does it use?", a: "About 225 words per minute for reading and 130 for speaking aloud." },
      { q: "Can I count words in a file?", a: "Open the file in an editor, copy the text and paste it into the box." },
      { q: "Is there a text limit?", a: "No fixed limit. Very large texts depend on your device." },
      free,
    ],
    related: ["text-case-converter", "markdown-previewer", "lorem-ipsum-generator", "pdf-maker", "typing-speed-test"],
  },
  {
    slug: "typing-speed-test",
    name: "Typing Speed Test",
    short: "Measure your words per minute and accuracy with a timed test.",
    category: "Text and Writing",
    kind: "typing-speed-test",
    title: "Typing Speed Test: Check Your WPM Free",
    description:
      "Take a free typing speed test. Choose 15, 30 or 60 seconds and see net WPM, gross WPM, accuracy and mistakes. No sign-up, works in your browser.",
    keywords: ["typing speed test", "typing test", "wpm test", "check typing speed", "words per minute test", "typing practice online", "typing accuracy test", "free typing test"],
    intro: [
      "Typing speed matters more than most people expect. Data entry, customer support, writing and coding jobs all involve hours at a keyboard, and a faster, more accurate typist finishes the same work sooner and with less strain. Job tests for administrative roles often ask for a minimum speed, so it helps to know your number before you apply.",
      "This test gives you a passage to type. The clock starts when you press the first key and runs for 15, 30 or 60 seconds. Correct letters are highlighted green, mistakes red, and at the end you see net speed, gross speed, accuracy and the number of mistakes.",
    ],
    steps: [
      "Choose 15, 30 or 60 seconds, then click the passage so the cursor is active.",
      "Start typing. The timer begins on your first key press, and you must type each character as shown.",
      "Read your results, then press Try again for a new passage.",
    ],
    points: [
      { h: "Net and gross WPM", p: "Gross WPM counts everything you typed. Net WPM counts only correct characters, which is closer to useful work." },
      { h: "Live feedback", p: "Each character turns green or red as you type, so you see where mistakes happen." },
      { h: "No sign-up and no tracking of results", p: "Your scores are shown on screen only and are not stored or sent anywhere." },
    ],
    sections: [
      {
        h: "How is words per minute calculated?",
        paras: [
          "By convention one word is five characters, including spaces and punctuation. Gross WPM is the total characters typed divided by five, divided by the minutes used. Net WPM does the same using only the correct characters. Using a fixed length for a word keeps the measure fair, because typing a few long words is no easier or harder than typing many short ones.",
          "Accuracy is the percentage of typed characters that matched the passage. Mistakes counts each wrong key press as you make it, even if you correct it afterwards, so it reflects how clean your typing was and not just the final text.",
        ],
      },
      {
        h: "What is a good typing speed?",
        paras: [
          "The average adult types at roughly 40 words per minute. Around 60 to 70 WPM is comfortable for office work, and many data entry and transcription roles ask for 50 or more with high accuracy. Professional typists and competitive typists exceed 100 WPM. Programmers often type slower in practice, because they spend more time thinking than typing.",
          "Accuracy matters as much as speed. A fast typist with many errors spends more time fixing mistakes than a slightly slower, clean one. When practising, slow down until accuracy is above 95 percent, then speed up gradually.",
        ],
      },
      {
        h: "How to improve your typing speed",
        paras: [
          "Learn touch typing, which means using all fingers and resting them on the home row so you do not look at the keys. Practise short sessions daily rather than one long session a week. Look ahead at the next word while your fingers finish the current one, and keep a steady rhythm instead of bursts of speed.",
          "Good posture and setup also help. Keep your wrists straight and your screen at eye level, and take short breaks to avoid strain. Retake the test at the same time of day under the same conditions to track real progress, since results vary from passage to passage.",
        ],
      },
    ],
    tips: [
      "Warm up with a 15 second test before you try a 60 second one.",
      "Do not look at the keyboard. Look at the next few words on screen.",
      "If you make a mistake, keep going unless the job test requires corrections.",
      "Use a normal keyboard. Phones and tablets give much lower scores.",
      "Retake the test on different days and note your best and average scores.",
    ],
    faq: [
      { q: "What counts as a word?", a: "Five characters, including spaces and punctuation, which is the standard used by most typing tests." },
      { q: "What is the difference between net and gross WPM?", a: "Gross counts all typed characters. Net counts only the correct ones, so it is never higher than gross." },
      { q: "Why does the timer start late?", a: "The clock starts on your first key press, not when the page loads." },
      { q: "Can I paste text into the test?", a: "No. Pasting is disabled so that the result reflects real typing." },
      { q: "Is a typing certificate available?", a: "No. This is a practice and self-check tool. Employers usually run their own test." },
      free,
    ],
    related: ["word-counter", "text-case-converter", "resume-maker", "online-timer-stopwatch", "markdown-previewer"],
  },
];
