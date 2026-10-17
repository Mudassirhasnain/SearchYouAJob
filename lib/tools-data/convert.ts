import type { Tool } from "../tool-types";
import { free } from "../tool-types";

const local = {
  h: "Private and instant",
  p: "Conversions run in your browser using your device's own clock and data. Nothing you enter is sent to a server.",
};

export const CONVERT_TOOLS: Tool[] = [
  {
    slug: "unit-converter",
    name: "Universal Unit Converter",
    short: "Convert length, weight, temperature, area, volume and digital storage units.",
    category: "Converters",
    kind: "unit-converter",
    title: "Unit Converter: Length, Weight, Temperature",
    description:
      "Convert length, mass, temperature, area, volume and data storage units instantly, with a full table of results. Includes marla and kanal. Free, no sign-up.",
    keywords: ["unit converter", "metric to imperial converter", "length converter", "weight converter", "temperature converter", "area converter", "marla to square feet", "mb to gb converter"],
    intro: [
      "Recipes use cups and millilitres, plots of land are sold in marla and acres, and a flight bag has a limit in kilograms while your scale shows pounds. Everyday life keeps asking for conversions between metric and imperial systems, and doing the maths in your head is where mistakes creep in.",
      "This converter covers six categories: length, mass and weight, temperature, area, volume and digital storage. Type a value, pick the units and the result appears at once. Below it, a table shows the same value in every unit of that category so you can see all the answers together.",
    ],
    steps: [
      "Choose a category such as length, mass or area.",
      "Enter the value and pick the From and To units. Use Swap to reverse them.",
      "Read the result at the top, or scan the table of every unit below it.",
    ],
    points: [
      { h: "Six categories, many units", p: "From millimetres to nautical miles, milligrams to stones, teaspoons to UK gallons, and bits to tebibytes." },
      { h: "Every unit at once", p: "A table lists the converted value in all units, so you can pick the one you need." },
      { h: "Local units included", p: "Marla and kanal for area, the units used for property in Pakistan and parts of India." },
      local,
    ],
    sections: [
      {
        h: "How do you convert between metric and imperial units?",
        paras: [
          "Every unit is defined against a base unit. The converter changes your value into the base unit, such as metres for length or kilograms for mass, and then into the unit you want. This avoids rounding errors that pile up when you chain several conversions. The factors used are the exact international definitions, such as 1 inch equals exactly 25.4 millimetres and 1 pound equals exactly 0.45359237 kilograms.",
          "Handy rules of thumb: a kilometre is about 0.62 miles, a kilogram is about 2.2 pounds, a litre is a little more than a US quart and an inch is 2.54 centimetres. For anything that matters, such as medicine, building or shipping, use the exact result from the converter rather than a rule of thumb.",
        ],
      },
      {
        h: "How do you convert Celsius, Fahrenheit and Kelvin?",
        paras: [
          "Temperature scales do not simply multiply, because they start at different zero points. To change Celsius to Fahrenheit, multiply by 9 over 5 and add 32. To go back, subtract 32 and multiply by 5 over 9. Kelvin equals Celsius plus 273.15, and a change of one kelvin is the same size as a change of one degree Celsius.",
          "Useful reference points are water freezing at 0 degrees Celsius or 32 Fahrenheit, a comfortable room at about 21 Celsius or 70 Fahrenheit, and body temperature near 37 Celsius or 98.6 Fahrenheit. Absolute zero is 0 kelvin, which is minus 273.15 Celsius.",
        ],
      },
      {
        h: "What is the difference between MB and MiB?",
        paras: [
          "Storage makers use decimal prefixes, where a kilobyte is 1000 bytes, a megabyte is 1000 kilobytes and a gigabyte is 1000 megabytes. Computers work in powers of two, so memory and some operating systems count in steps of 1024. To remove the confusion the binary units have separate names: kibibyte (KiB), mebibyte (MiB) and gibibyte (GiB).",
          "This is why a drive sold as 500 GB shows up as about 465 GiB in some systems. Nothing is missing: the two numbers measure the same bytes in different units. The converter keeps both families so you can see exactly how they relate.",
        ],
      },
    ],
    tips: [
      "Use the all-units table when you are unsure which unit someone means.",
      "Check the unit definition for marla and kanal, as they vary by region.",
      "Cooking cups differ between countries. This tool uses the US cup of 236.6 millilitres.",
      "Keep as many digits as you need until the final answer, then round.",
      "Use Swap to double check a conversion by going back to the start.",
    ],
    faq: [
      { q: "How many square feet are in a marla?", a: "Using the common Punjab definition, one marla is 272.25 square feet, which is about 25.29 square metres." },
      { q: "How do I convert kg to lb?", a: "Pick Mass and weight, enter the value in kg and choose pounds as the To unit. One kilogram is about 2.2046 pounds." },
      { q: "Is the US gallon the same as the UK gallon?", a: "No. A US gallon is 3.785 litres and a UK gallon is 4.546 litres." },
      { q: "Why do I see very small or very large numbers in scientific form?", a: "Values below one ten millionth or above one quadrillion are shown in exponent notation for readability." },
      { q: "How precise are the results?", a: "Up to ten significant digits, with trailing zeros removed." },
      free,
    ],
    related: ["percentage-calculator", "bmi-calculator", "color-converter", "time-zone-converter", "loan-emi-calculator"],
  },
  {
    slug: "unix-timestamp-converter",
    name: "Unix Timestamp Converter",
    short: "Convert epoch timestamps to readable dates and dates back to epoch seconds or milliseconds.",
    category: "Converters",
    kind: "unix-timestamp-converter",
    title: "Unix Timestamp Converter: Epoch to Date, Free",
    description:
      "Convert Unix epoch timestamps to human-readable UTC and local dates, and dates back to seconds or milliseconds. Live epoch clock included. Free, no sign-up.",
    keywords: ["unix timestamp converter", "epoch converter", "epoch to date", "timestamp to date", "date to unix timestamp", "current unix time", "milliseconds to date", "epoch time converter online"],
    intro: [
      "Computers rarely store dates as words. Databases, log files, APIs and tokens usually record a moment as a single number: the count of seconds since 1 January 1970 at midnight UTC. That number is the Unix timestamp, also called epoch time, and it is perfect for machines but unreadable for people.",
      "Paste a timestamp and this converter shows the matching date in UTC, in ISO 8601 format and in your own time zone, plus a relative description such as three hours ago. It also works the other way, turning a chosen date and time into epoch seconds and milliseconds. A live clock shows the current epoch time, updating every second.",
    ],
    steps: [
      "Paste a Unix timestamp. The tool detects seconds or milliseconds automatically, or you can set the unit yourself.",
      "Read the UTC date, ISO 8601 string, local date and relative time. Copy any of them.",
      "To convert a date, pick it in the second panel and copy the seconds or milliseconds value.",
    ],
    points: [
      { h: "Seconds or milliseconds", p: "Ten digit values are read as seconds and thirteen digit values as milliseconds, with a manual override." },
      { h: "UTC and local time", p: "See the same instant in both, so you can debug time zone problems quickly." },
      { h: "Live epoch clock", p: "The current Unix time is shown and refreshed every second." },
      local,
    ],
    sections: [
      {
        h: "What is Unix time?",
        paras: [
          "Unix time counts the seconds that have passed since the Unix epoch, which is 00:00:00 UTC on 1 January 1970. It ignores time zones and daylight saving, so a timestamp means the same instant everywhere. That makes it ideal for sorting events, measuring durations and syncing systems across the world.",
          "Most programming languages can produce it directly. In JavaScript, Date.now() returns milliseconds and dividing by 1000 gives seconds. In Python, time.time() returns seconds as a decimal. When you read a timestamp from an API, check the documentation to see whether it uses seconds or milliseconds, because mixing them up gives dates in 1970 or in the year 50000.",
        ],
      },
      {
        h: "How do you tell seconds from milliseconds?",
        paras: [
          "A timestamp in seconds for a present day date has ten digits, such as 1760000000. In milliseconds it has thirteen digits, such as 1760000000000. The converter uses a simple rule: values with an absolute size of one hundred billion or more are treated as milliseconds. Dates between 1973 and the year 5138 are read correctly this way.",
          "If you are working with very old or far future dates, or with microsecond and nanosecond values from some databases, divide by 1000 until you reach the milliseconds range, or set the unit manually.",
        ],
      },
      {
        h: "Why does my timestamp show a different time from the server?",
        paras: [
          "The timestamp is the same everywhere, but the way it is displayed depends on the time zone. The UTC line is the reference. The local line uses the clock settings of your device, so a colleague in another country will read a different local time for the same number.",
          "Always store and transmit times as UTC or as a timestamp, and convert to local time only when showing them to a person. When you type a date to convert, tick Treat as UTC if the date came from a server log, otherwise it is interpreted in your local time zone.",
        ],
      },
    ],
    tips: [
      "Check whether an API uses seconds or milliseconds before converting.",
      "Use the ISO 8601 line when you need a standard text format for databases and logs.",
      "Treat typed dates as UTC when they come from a server log.",
      "Remember that 32-bit systems run out of seconds in January 2038.",
      "Copy the relative time to quickly see how old an event is.",
    ],
    faq: [
      { q: "What is the Unix epoch?", a: "00:00:00 UTC on 1 January 1970, the starting point from which Unix time counts seconds." },
      { q: "How do I convert a timestamp to a date?", a: "Paste it into the first box. The date appears in UTC, ISO format and local time." },
      { q: "How do I get the current Unix timestamp?", a: "It is shown at the top of the tool and updates every second." },
      { q: "What is the year 2038 problem?", a: "Systems that store Unix time in a signed 32-bit integer overflow on 19 January 2038. Modern 64-bit systems are not affected." },
      { q: "Does it handle negative timestamps?", a: "Yes. Negative values are dates before 1970." },
      free,
    ],
    related: ["time-zone-converter", "days-between-dates", "weeks-into-the-year", "json-formatter", "hash-generator"],
  },
  {
    slug: "color-converter",
    name: "Color Converter and Contrast Checker",
    short: "Convert HEX, RGB and HSL colours and check WCAG contrast for accessible text.",
    category: "Converters",
    kind: "color-converter",
    title: "Color Converter and WCAG Contrast Checker",
    description:
      "Convert colours between HEX, RGB and HSL and check WCAG 2.1 contrast ratios for AA and AAA text. Live preview and copy buttons. Free, no sign-up.",
    keywords: ["color converter", "hex to rgb", "rgb to hex", "hex to hsl", "contrast checker", "wcag contrast checker", "color contrast ratio", "accessible color combinations"],
    intro: [
      "Designers and developers move between colour formats all day. A brand guide gives a HEX code, a CSS file wants RGB or HSL, and a design tool uses something else again. Converting by hand is slow, and getting it wrong means a colour that is slightly off.",
      "Enter a colour in any common notation and see it in HEX, RGB and HSL, with an optional transparency value. The same page includes a contrast checker based on the Web Content Accessibility Guidelines 2.1, which tells you if your text and background colours are readable for people with low vision.",
    ],
    steps: [
      "Type a colour such as #2E5C8A, rgb(46, 92, 138) or hsl(210, 50%, 36%), or use the colour picker.",
      "Copy the HEX, RGB or HSL version you need.",
      "In the contrast checker, enter a text colour and a background colour and read the ratio and the AA and AAA results.",
    ],
    points: [
      { h: "Three formats, both ways", p: "HEX with 3, 4, 6 or 8 digits, RGB and HSL, including alpha transparency." },
      { h: "Real WCAG calculation", p: "Uses the relative luminance formula from WCAG 2.1 to give an exact ratio to two decimal places." },
      { h: "Clear pass and fail", p: "Separate results for normal text, large text and user interface components at AA and AAA." },
      local,
    ],
    sections: [
      {
        h: "What are HEX, RGB and HSL?",
        paras: [
          "RGB describes a colour as amounts of red, green and blue light from 0 to 255. HEX is the same three numbers written in base 16 and joined together, so rgb(46, 92, 138) becomes #2E5C8A. Both are how screens physically create colour, so they are the most common formats in web code.",
          "HSL describes the same colour in a way people find more natural: hue is the position on the colour wheel from 0 to 360 degrees, saturation is how vivid it is, and lightness is how close it is to black or white. It is easier to adjust by hand. To make a colour darker, lower the lightness and keep the hue.",
        ],
      },
      {
        h: "How is contrast ratio calculated?",
        paras: [
          "WCAG first converts each colour into relative luminance, a measure of how bright it appears to the eye, using weights of about 21 percent for red, 72 percent for green and 7 percent for blue after correcting for the display gamma. The ratio is then the lighter luminance plus 0.05, divided by the darker luminance plus 0.05. It runs from 1 to 1 for identical colours up to 21 to 1 for black on white.",
          "Because the calculation follows the standard, you can use the result in accessibility reports. It does not replace testing with real users, since factors such as font weight, size and surrounding light also affect readability.",
        ],
      },
      {
        h: "What contrast do you need for AA and AAA?",
        paras: [
          "Level AA requires a ratio of at least 4.5 to 1 for normal text and 3 to 1 for large text, which means 18 point or larger, or 14 point bold. User interface parts such as button borders and icons also need 3 to 1. Level AAA is stricter: 7 to 1 for normal text and 4.5 to 1 for large text.",
          "Most websites aim for AA, which many laws and procurement rules reference. Light grey text on white is the most common failure, so test your grey. If a combination fails, darken the text or lighten the background until it passes, and check the result in the preview box.",
        ],
      },
    ],
    tips: [
      "Test your real text sizes. A pass at large text does not pass for body text.",
      "Do not rely on colour alone to show meaning. Add icons or labels.",
      "Use HSL to make a darker shade by lowering lightness only.",
      "Check placeholder text and disabled buttons too. They are often too faint.",
      "Use 8-digit HEX when you need a transparent colour in CSS.",
    ],
    faq: [
      { q: "How do I convert HEX to RGB?", a: "Type the HEX code and the RGB value appears in the list. Each pair of HEX digits becomes one number from 0 to 255." },
      { q: "What contrast ratio is required for WCAG AA?", a: "4.5 to 1 for normal text and 3 to 1 for large text and interface components." },
      { q: "Does it support transparency?", a: "Yes. 4 and 8 digit HEX codes and rgba or hsla values are read and shown with alpha." },
      { q: "Why do two similar colours have very different ratios?", a: "Contrast depends on brightness more than hue. A small change in lightness can change the ratio a lot." },
      { q: "Is this tool a full accessibility audit?", a: "No. It checks one pair of colours. Test your whole page with real devices and users as well." },
      free,
    ],
    related: ["unit-converter", "qr-code-generator", "image-converter", "lorem-ipsum-generator", "json-formatter"],
  },
  {
    slug: "time-zone-converter",
    name: "Time Difference Converter",
    short: "Convert a date and time between any two time zones and see the exact hour difference.",
    category: "Converters",
    kind: "time-zone-converter",
    title: "Time Zone Converter: Time Difference Calculator",
    description:
      "Convert time between time zones and see the exact hour difference, with daylight saving applied for your date. World clock table of 10 cities. Free, no sign-up.",
    keywords: ["time zone converter", "time difference calculator", "world time converter", "convert time between countries", "meeting time planner", "pakistan time to us time", "time difference between cities", "dst time converter"],
    intro: [
      "Booking a call with a client abroad, joining a live event or calling family sounds easy until you try to work out the time. Daylight saving, half hour zones and the date line mean the answer is not always a simple whole number of hours.",
      "Pick the time zone you are starting from, the one you want, then enter a date and time. The converter shows the matching local time, the exact difference such as plus 9 hours or plus 30 minutes, and whether it falls on the same day, the next day or the previous day. A world table shows the same moment in ten major cities.",
    ],
    steps: [
      "Choose a From time zone and a To time zone. Your own zone is selected to start.",
      "Enter the date and time as it is in the From zone.",
      "Read the converted time, the hour difference and the day shift, and check the world table for other cities.",
    ],
    points: [
      { h: "Daylight saving handled", p: "The offset is worked out for the exact date you enter, so summer and winter results are both correct." },
      { h: "Half hour zones included", p: "India, parts of Australia and others are shown with their true offsets such as plus 5 hours 30 minutes." },
      { h: "Ten city world table", p: "See the same moment in Los Angeles, New York, London, Dubai, Karachi, Tokyo and more." },
      local,
    ],
    sections: [
      {
        h: "How do time zones and UTC work?",
        paras: [
          "Coordinated Universal Time, or UTC, is the reference all time zones are measured from. A zone is described by its offset, for example UTC plus 5 for Pakistan Standard Time or UTC minus 5 for US Eastern Standard Time. To convert, subtract the source offset from the time to get UTC, then add the target offset.",
          "The tool uses the standard time zone database built into your browser, which includes the historical and future rules for every region it lists. That is why the same two cities can differ by a different number of hours in March than in July.",
        ],
      },
      {
        h: "Why does daylight saving make this tricky?",
        paras: [
          "Many countries move their clocks forward in spring and back in autumn, but they do not all change on the same date. The United States switches in March and November, Europe switches on the last weekends of March and October, and many countries in Asia and Africa do not change at all. For a few weeks each year, the gap between two cities is an hour different from the rest of the year.",
          "This is why the same meeting at 3 pm in London can be 10 am or 11 am in New York depending on the week. Always convert using the actual date of the meeting, not a rule you memorised in another season.",
        ],
      },
      {
        h: "Tips for scheduling across time zones",
        paras: [
          "Send meeting invites with a time zone attached, such as 14:00 UTC or 7 pm Pakistan time, instead of a bare time. Calendar apps convert invites automatically, but chat messages and emails do not. State the date as well, because the date can differ between the two places.",
          "When the zones are far apart, look for the overlap in working hours. The world table helps you find a time that is reasonable for everyone, for example early morning in one city and evening in another. Remember to check public holidays and weekends in both places.",
        ],
      },
    ],
    tips: [
      "Always enter the date of the meeting, not today's date, to catch daylight saving changes.",
      "Mention the time zone name in messages to avoid confusion.",
      "Use the day shift note to avoid booking the wrong day.",
      "Check the world table to find a fair time for several people.",
      "Check both countries' weekends. Not everyone rests on Saturday and Sunday.",
    ],
    faq: [
      { q: "How do I convert Pakistan time to US Eastern time?", a: "Choose Karachi as the From zone and New York as the To zone, then enter the date and time. The gap is 10 hours in winter and 9 hours in summer, when the US is on daylight saving time." },
      { q: "Does it account for daylight saving time?", a: "Yes. The offset is calculated for the date you enter." },
      { q: "What does plus 5h 30m mean?", a: "The destination is 5 hours and 30 minutes ahead of the starting zone." },
      { q: "Why is my time zone not listed?", a: "The list covers about 40 major zones. Pick a city in the same zone and region." },
      { q: "Does it work offline?", a: "After the page has loaded, it uses your browser's built-in time zone data." },
      free,
    ],
    related: ["est-to-pst-converter", "unix-timestamp-converter", "analogue-clock", "days-between-dates", "age-calculator"],
  },
  {
    slug: "est-to-pst-converter",
    name: "EST to PST Converter",
    short: "Convert Eastern Time to Pacific Time, or the other way, with daylight saving applied.",
    category: "Converters",
    kind: "est-to-pst-converter",
    title: "EST to PST Converter: Eastern to Pacific Time",
    description:
      "Convert EST to PST or PST to EST instantly. Daylight saving is applied automatically with EDT and PDT labels and a 24 hour chart. Free, no sign-up.",
    keywords: ["est to pst converter", "est to pst", "pst to est", "eastern to pacific time", "edt to pdt", "est to pst time converter", "3 hours behind eastern time", "convert eastern time to pacific time"],
    intro: [
      "Eastern and Pacific time are the two zones most often compared in the United States and Canada. Meetings, webinars, game launches and TV schedules often announce one and expect the reader to work out the other. The usual answer is three hours, but there are edge cases.",
      "Enter a date and time in one zone, and this converter shows the other. It applies daylight saving automatically, labels the result as PST or PDT and EST or EDT, tells you when the answer falls on a different day and includes a table for every hour of the chosen date.",
    ],
    steps: [
      "Choose EST to PST or PST to EST.",
      "Pick the date and time in the starting zone.",
      "Read the converted time, then scan the 24 hour chart for other hours.",
    ],
    points: [
      { h: "EST, EDT, PST and PDT labelled", p: "The result shows the correct abbreviation for the date, so you know whether daylight saving is on." },
      { h: "Day change warning", p: "If the converted time is on the next or previous day, the tool says so." },
      { h: "Full day chart", p: "See every hour of the date in both zones side by side." },
      local,
    ],
    sections: [
      {
        h: "How many hours is EST behind PST?",
        paras: [
          "Pacific time is three hours behind Eastern time. When it is 12 noon in New York it is 9 am in Los Angeles. That difference holds all year, because both zones change their clocks on the same dates. The difference only shifts if one place changes its clocks and the other does not, which is rare within the United States.",
          "To convert Eastern to Pacific, subtract three hours. To go from Pacific to Eastern, add three hours. Crossing midnight changes the date: 1 am Eastern on Tuesday is 10 pm Pacific on Monday.",
        ],
      },
      {
        h: "What is the difference between EST and EDT?",
        paras: [
          "EST stands for Eastern Standard Time and is used in winter, at UTC minus 5. EDT is Eastern Daylight Time, used in summer at UTC minus 4. The Pacific zone follows the same pattern with PST at UTC minus 8 and PDT at UTC minus 7. In the United States, daylight saving starts on the second Sunday of March and ends on the first Sunday of November.",
          "People often say EST all year, which is technically wrong in summer. When an event says 3 pm ET, it means whichever of EST or EDT is in effect that day. This converter uses the real rules for the date, so you do not need to know which one applies.",
        ],
      },
      {
        h: "Where is each time zone used?",
        paras: [
          "Eastern time covers New York, Washington, Miami, Atlanta, Boston and Toronto, among others. Pacific time covers Los Angeles, San Francisco, Seattle, Portland, Las Vegas and Vancouver. The Central and Mountain zones sit between them, one hour apart each.",
          "If you are scheduling across the whole country, use the time zone converter with other cities. For global teams, add the World time table in the Time Difference Converter, which shows ten cities at once.",
        ],
      },
    ],
    tips: [
      "Say ET or PT in messages if you do not want to specify daylight saving.",
      "Add the date when sharing a time, since it may differ in the other zone.",
      "Late evening Pacific events fall after midnight on the east coast.",
      "Check the chart to find a convenient time for both coasts.",
      "Do not assume other countries follow the same dates for daylight saving.",
    ],
    faq: [
      { q: "What is 3 pm EST in PST?", a: "12 noon PST on the same day." },
      { q: "Is Pacific time always 3 hours behind Eastern?", a: "Yes, because both zones change their clocks on the same days." },
      { q: "When does daylight saving start and end in the US?", a: "It starts on the second Sunday in March and ends on the first Sunday in November." },
      { q: "What does the day change warning mean?", a: "The converted time is on a different calendar date, such as the next day." },
      { q: "Can I convert PST to EST?", a: "Yes. Press the PST to EST button at the top." },
      free,
    ],
    related: ["time-zone-converter", "unix-timestamp-converter", "analogue-clock", "days-between-dates", "online-timer-stopwatch"],
  },
];
