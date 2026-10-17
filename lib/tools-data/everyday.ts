import type { Tool } from "../tool-types";
import { free } from "../tool-types";

const local = {
  h: "Private and instant",
  p: "Everything runs in your browser using your device's own clock and random number generator. Nothing you enter is sent to a server.",
};

export const EVERYDAY_TOOLS: Tool[] = [
  {
    slug: "weeks-into-the-year",
    name: "Weeks Into the Year Calculator",
    short: "Find the current week number, day of the year and weeks remaining for any date.",
    category: "Everyday Tools",
    kind: "weeks-into-the-year",
    title: "What Week of the Year Is It? Week Calculator",
    description:
      "See what week of the year it is today or for any date. ISO 8601 week number, day of year, weeks remaining and a month by month week chart. Free and instant.",
    keywords: ["what week of the year is it", "week number calculator", "how many weeks into the year", "iso week number", "current week number", "day of the year calculator", "weeks left in the year", "week number of date"],
    intro: [
      "Project plans, payroll calendars, school terms, shipping schedules and sales reports often refer to a week number instead of a date. Week 42 sounds precise, until you discover that two systems number weeks in different ways and disagree by one.",
      "Pick today or any date and this calculator shows the ISO 8601 week number, a simple count of weeks from 1 January, the day of the year, the weeks and days remaining and the percentage of the year that has passed. A table lists the week numbers at the start and end of each month so you can plan ahead.",
    ],
    steps: [
      "The date is set to today. Choose a different date if you need another one.",
      "Read the ISO week number first, then the simple week count, the day of the year and the time remaining.",
      "Use the month table to look up the week number for the first and last day of any month.",
    ],
    points: [
      { h: "Two week counts", p: "The international ISO standard used by businesses, and a simple count that treats 1 January as the start of week 1." },
      { h: "Year progress", p: "See the day of the year, the percentage elapsed and the weeks and days left." },
      { h: "Month by month table", p: "Find the week number of any month boundary for the whole year." },
      local,
    ],
    sections: [
      {
        h: "How are ISO week numbers calculated?",
        paras: [
          "The ISO 8601 standard defines weeks that start on Monday. Week 1 of a year is the week that contains the first Thursday of that year, which is the same as the week containing 4 January. A year has either 52 or 53 such weeks. This rule keeps every week as a full seven days with no week split between two years.",
          "As a result, the first days of January can belong to the last week of the previous year, and the last days of December can belong to week 1 of the next. For example, 1 January 2027 is a Friday and falls in ISO week 53 of 2026. The calculator shows the year the week belongs to whenever it differs from the calendar year.",
        ],
      },
      {
        h: "Why do week numbers differ between systems?",
        paras: [
          "Not everyone uses the ISO rule. The United States, Canada and parts of the Middle East commonly start the week on Sunday and call the week containing 1 January week 1, even if that week has only a day or two in the new year. Spreadsheet and calendar apps often let you choose the week numbering system, and the default depends on the region.",
          "Always confirm which system a company or tool uses before trusting a week number. When you share a week number in an international team, add the year and say ISO week to avoid a mismatch. The simple count in this calculator is one more option: it counts blocks of seven days from 1 January.",
        ],
      },
      {
        h: "Where are week numbers used?",
        paras: [
          "Manufacturing and logistics use week numbers for production batches, delivery windows and warehouse planning. Many European companies use them for holidays, school terms and project deadlines, and some products carry a date code that shows the week of production.",
          "Sales teams track weekly targets and finance teams close weekly books. Knowing the weeks remaining in the year helps with goal setting: if only 12 weeks are left, a yearly target must be broken into 12 steps, not 52.",
        ],
      },
    ],
    tips: [
      "Write ISO week 42 in documents that cross countries.",
      "Check the week number system in your spreadsheet before copying formulas.",
      "Remember that week 53 exists in some years.",
      "Use the weeks remaining figure to split yearly goals into achievable steps.",
      "For exact dates between two points, use the Days Between Dates Calculator.",
    ],
    faq: [
      { q: "What week of the year is it?", a: "The ISO week for today is shown first when the page loads. Change the date to check any other day." },
      { q: "What is the difference between ISO weeks and simple weeks?", a: "ISO weeks start on Monday and week 1 contains the first Thursday. The simple count treats 1 January as the start of week 1." },
      { q: "Can a year have 53 weeks?", a: "Yes. Years in which 1 January is a Thursday, or a Wednesday in a leap year, have 53 ISO weeks." },
      { q: "Why does 1 January show as week 52 or 53?", a: "ISO week 1 might start a few days later, so early January can belong to the previous year's last week." },
      { q: "How many weeks are left this year?", a: "See Weeks remaining in the result cards, shown as weeks and extra days." },
      free,
    ],
    related: ["days-between-dates", "age-calculator", "time-zone-converter", "unix-timestamp-converter", "online-timer-stopwatch"],
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    short: "Generate random numbers in any range, with no repeats, decimals and dice or lottery presets.",
    category: "Everyday Tools",
    kind: "random-number-generator",
    title: "Random Number Generator: Range, Dice, Lottery",
    description:
      "Generate random numbers in any range. Choose how many, whole numbers or decimals, no repeats, sorting, and presets for dice, coin flips and lottery picks.",
    keywords: ["random number generator", "random number between 1 and 100", "random number picker", "dice roller online", "lottery number generator", "unique random numbers", "random decimal generator", "coin flip online"],
    intro: [
      "Picking a winner, drawing lots, choosing a seat, rolling a die for a board game or selecting a sample for a survey all need a number nobody can predict. Doing it by hand is slow and people are poor at being random, because we avoid repeats and favour certain numbers.",
      "Set a minimum, a maximum and how many numbers you want. You can switch on decimals, require no repeats, sort the results or use a preset for a d6, a d20, a coin flip or a 6 of 49 lottery draw. The numbers come from your browser's secure random generator.",
    ],
    steps: [
      "Enter the minimum and maximum and how many numbers you need.",
      "Choose whole numbers or decimals, and tick No repeats or Sort results if needed.",
      "Press Generate, or use a preset such as Roll a d6. Copy the results when you are done.",
    ],
    points: [
      { h: "Fair and unbiased", p: "Whole numbers are picked with rejection sampling on secure random values, so every number in the range has the same chance." },
      { h: "Unique picks", p: "Turn on No repeats to draw without replacement, as in a raffle or lottery." },
      { h: "Quick presets", p: "One click for dice, a coin flip, a lottery draw and a number from 1 to 100." },
      local,
    ],
    sections: [
      {
        h: "How does a random number generator work?",
        paras: [
          "Computers are predictable machines, so ordinary programs use pseudo-random formulas that look random but follow a fixed sequence if you know the starting point. This tool uses the cryptographically secure generator built into your browser, which draws on unpredictable system sources such as hardware noise, so its output cannot be guessed from earlier results.",
          "Turning random bits into a number in a range needs care. A common shortcut, taking the remainder after division, favours low numbers slightly. This tool rejects values that would cause that bias and tries again, so each number from minimum to maximum is equally likely.",
        ],
      },
      {
        h: "When do you need no repeats?",
        paras: [
          "Drawing without replacement is the rule in raffles, lotteries, secret Santa style draws and choosing a group from a list. If you pick 6 numbers from 1 to 49 with no repeats, no number can appear twice. If repeats are allowed, as when rolling a die several times, the same number can easily appear again.",
          "If you ask for more unique numbers than the range contains, the tool tells you it is impossible. For example, you cannot draw 10 different numbers from 1 to 6. The sort option is helpful for lottery tickets, where numbers are read in ascending order.",
        ],
      },
      {
        h: "Can you use this for lotteries or gambling?",
        paras: [
          "The numbers are genuinely unpredictable, but this is not a certified gaming system. It is meant for games, classroom use, decisions and sampling. It does not improve your odds in any real lottery, where every combination is equally likely no matter how it is chosen.",
          "For regulated draws, giveaways with legal requirements or anything involving significant money, use an auditable process that your local rules accept, such as a witnessed draw or an approved service. Keep a record of the numbers and how you picked them so that results can be verified.",
        ],
      },
    ],
    tips: [
      "Use No repeats for raffles. Allow repeats for dice rolls.",
      "Number your list from 1 and match the random result to the name.",
      "Sort the results when you need a readable lottery style line.",
      "Use decimals with 2 places for random prices or test data.",
      "Copy the results so that you have a record of the draw.",
    ],
    faq: [
      { q: "How do I get a random number between 1 and 100?", a: "Press the 1 to 100 preset, or enter 1 and 100 and press Generate." },
      { q: "Is it truly random?", a: "It uses your browser's secure random source, which is unpredictable for practical purposes." },
      { q: "Can I generate unique numbers only?", a: "Yes. Tick No repeats. The range must hold at least as many values as you ask for." },
      { q: "Can I get decimal numbers?", a: "Yes. Tick Decimals and choose up to 10 decimal places." },
      { q: "Is this suitable for official lotteries?", a: "No. It is not a certified system. Use an approved process for regulated draws." },
      free,
    ],
    related: ["password-generator", "online-timer-stopwatch", "percentage-calculator", "hash-generator", "typing-speed-test"],
  },
  {
    slug: "online-timer-stopwatch",
    name: "Online Timer and Stopwatch",
    short: "A countdown timer, stopwatch with laps and a Pomodoro focus timer in one page.",
    category: "Everyday Tools",
    kind: "online-timer-stopwatch",
    title: "Online Timer, Stopwatch and Pomodoro Timer",
    description:
      "Free online timer with alarm, stopwatch with lap times and Pomodoro focus timer. Quick presets, full screen mode and keyboard shortcuts. No sign-up.",
    keywords: ["online timer", "countdown timer", "online stopwatch", "pomodoro timer", "timer with alarm", "stopwatch with laps", "study timer", "full screen timer"],
    intro: [
      "A timer is one of those tools you need all the time: cooking, workouts, exams, presentations, meetings and focused work. Phone apps work, but a browser timer is useful on a laptop, on a classroom screen or on a shared computer where you cannot install anything.",
      "This page has three tools. The countdown timer rings when time is up. The stopwatch counts upward and records laps. The Pomodoro timer cycles between focus sessions and breaks. Each one has quick presets, a full screen mode for projectors and keyboard shortcuts, and uses the clock so it stays accurate when you switch tabs.",
    ],
    steps: [
      "Choose Timer, Stopwatch or Pomodoro at the top.",
      "For the timer, set hours, minutes and seconds, or press a preset, then Start. For the stopwatch press Start and Lap. For Pomodoro, adjust the lengths and press Start.",
      "Use Space to start or pause, R to reset and L for a lap. Press Full screen to show it on a big display.",
    ],
    points: [
      { h: "Accurate in the background", p: "Time is measured from the system clock, not by counting ticks, so switching tabs does not slow it down." },
      { h: "Alarm when finished", p: "A short beep plays at the end of a countdown or Pomodoro session. Browsers allow sound only after you press Start." },
      { h: "Title shows the time", p: "The browser tab shows the remaining time so you can check it from another tab." },
      local,
    ],
    sections: [
      {
        h: "What is the Pomodoro Technique?",
        paras: [
          "The Pomodoro Technique is a time management method that splits work into focused blocks, usually 25 minutes, separated by short 5 minute breaks. After four focus sessions you take a longer break of 15 to 30 minutes. The idea is that a clear time limit makes it easier to start and to resist distractions.",
          "To use it, pick one task, start the focus timer and work on only that until the alarm sounds. Take the break away from your screen. The timer keeps count of completed sessions, and you can change the lengths if 25 minutes does not suit you. Many people prefer 50 minutes of focus with a 10 minute break for deeper work.",
        ],
      },
      {
        h: "Which timer should you use for what?",
        paras: [
          "Use the countdown timer when you have a fixed amount of time: boiling eggs, a presentation slot, an exam section or a plank hold. Use the stopwatch when you want to measure how long something takes: a run, a speech rehearsal, a work task or a race, where laps record the split for each part.",
          "For study and work sessions, the Pomodoro timer handles the switching for you. In a classroom, put the timer on the projector in full screen so that everyone can see the time remaining, which helps students pace themselves.",
        ],
      },
      {
        h: "Why does a browser timer need you to press Start for sound?",
        paras: [
          "Browsers block audio that plays without a user action, to stop websites from making unexpected noise. When you press Start, the page is allowed to prepare the sound, and the alarm will work later when the timer ends. If you do not hear the alarm, check that the tab is not muted and that your device volume is up.",
          "Keep the tab open for the alarm to play. Some browsers slow down timers in tabs that are hidden for a long time, but because this tool checks the real clock, the remaining time is always right when you return, even if the alarm was late.",
        ],
      },
    ],
    tips: [
      "Test the alarm sound once before an important session.",
      "Use full screen on a projector for classes and workshops.",
      "Use laps on the stopwatch to compare the parts of a run or a talk.",
      "Pick a Pomodoro length that fits your attention, not the default.",
      "Keep the tab open and the volume up so you hear the alarm.",
    ],
    faq: [
      { q: "Does the timer keep running if I switch tabs?", a: "Yes. It uses the system clock, so the remaining time is correct when you come back." },
      { q: "Why did I not hear the alarm?", a: "Check your volume and that the tab is not muted. Sound works after you press Start." },
      { q: "How do I set a 25 minute timer?", a: "Press the 25 min preset, then Start." },
      { q: "Can I use keyboard shortcuts?", a: "Yes: Space starts or pauses, R resets and L records a lap in the stopwatch." },
      { q: "Can I show the timer on a projector?", a: "Yes. Use the Full screen button." },
      free,
    ],
    related: ["analogue-clock", "typing-speed-test", "days-between-dates", "random-number-generator", "time-zone-converter"],
  },
  {
    slug: "analogue-clock",
    name: "Analogue Clock",
    short: "A clean analogue clock for any time zone, with styles, full screen and a practice mode.",
    category: "Everyday Tools",
    kind: "analogue-clock",
    title: "Analogue Clock Online: Any Time Zone, Full Screen",
    description:
      "View the current time on an analogue clock for any time zone. Choose style and numerals, go full screen, or practise reading a clock face. Free, no sign-up.",
    keywords: ["analogue clock", "analog clock online", "online clock", "clock for classroom", "full screen clock", "world clock", "learn to tell time", "roman numeral clock"],
    intro: [
      "An analogue clock is easy to read from across a room and shows the passing of time at a glance. Teachers use one to show the whole class, presenters put one on a second screen and many people simply prefer a round face to a row of digits.",
      "This clock shows the current time with hour, minute and second hands, in any time zone from a list of about 40. Choose a light, dark or minimal style and Arabic numerals, Roman numerals or none. You can show the digital time too, go full screen and switch to a practice mode to learn how to read the hands.",
    ],
    steps: [
      "The clock shows your local time. Pick another time zone from the list if you need it.",
      "Choose the style and numerals, and switch the seconds hand and digital time on or off.",
      "Press Full screen for a classroom or screen, or open Practice reading time to test yourself.",
    ],
    points: [
      { h: "Any time zone", p: "Show the time in the city you are working with, with daylight saving applied automatically." },
      { h: "Three styles", p: "Light for classrooms, dark for screens at night and a minimal face for a calm look." },
      { h: "Practice mode", p: "A random time is shown and you type the answer, with a running score." },
      local,
    ],
    sections: [
      {
        h: "How do you read an analogue clock?",
        paras: [
          "The short, thick hand is the hour hand and the long, thin one is the minute hand. A thin hand, often in red, is the seconds hand. The hour hand points at the hour, moving slowly between numbers as the minutes pass. The minute hand points at the minutes, where each number on the dial stands for five minutes, so 3 means 15 minutes and 9 means 45.",
          "To tell the time, read the hour first from the short hand, then count the minutes from the long hand. If the long hand is on the 6, it is half past. If it is before the 6, say that many minutes past the hour. After the 6, say how many minutes to the next hour. Practice mode helps you build the habit with random times.",
        ],
      },
      {
        h: "Using a clock in the classroom or on a screen",
        paras: [
          "Full screen mode turns the page into a big, clear clock that works on a projector or smart board. Children learning to tell time benefit from seeing both the analogue face and the digital time side by side, so keep the digital display on when teaching and turn it off when testing.",
          "The Roman numerals style is useful in history and art lessons, and the no numerals option makes the exercise harder for advanced learners. Dark mode is gentler on the eyes in a dim room or on a second monitor.",
        ],
      },
      {
        h: "Time zones and daylight saving on the clock",
        paras: [
          "Choose a city and the clock follows its local time, including daylight saving changes. This is handy if you work with people in different countries and want a quick visual of their time of day. For exact conversions and the hour difference between two places, use the Time Difference Converter.",
          "The clock is driven by your device's own time, so it is as accurate as your system clock. If your computer's time is wrong, the clock will be wrong too. Most devices correct their time automatically over the internet.",
        ],
      },
    ],
    tips: [
      "Use dark style on a projector in a bright room, and light in a dark room.",
      "Hide the digital time when you want to test children on reading the clock.",
      "Turn off the seconds hand for a calmer display during exams.",
      "Check your device time zone settings if the local time looks wrong.",
      "Use full screen and press Escape to exit.",
    ],
    faq: [
      { q: "How do I change the time zone?", a: "Use the Time zone list above the clock. Daylight saving is applied automatically." },
      { q: "Can I use it full screen?", a: "Yes. Press Full screen and Escape to leave." },
      { q: "How does practice mode work?", a: "A random time is shown. Type what you read, such as 3:45, and press Check." },
      { q: "Is the clock accurate?", a: "It follows your device clock, which is usually synchronised over the internet." },
      { q: "Can I hide the seconds hand?", a: "Yes. Untick Seconds hand." },
      free,
    ],
    related: ["online-timer-stopwatch", "time-zone-converter", "est-to-pst-converter", "weeks-into-the-year", "age-calculator"],
  },
  {
    slug: "invoice-generator",
    name: "Invoice Generator",
    short: "Create a clean invoice with line items, tax and discount, and save it as a PDF.",
    category: "PDF",
    kind: "invoice-generator",
    title: "Free Invoice Generator: Create PDF Invoices",
    description:
      "Create a professional invoice online with line items, tax, discount and logo. Save as a clean PDF for clients. Free, no sign-up, no watermark, nothing uploaded.",
    keywords: ["invoice generator", "free invoice maker", "create invoice online", "invoice template pdf", "freelance invoice", "invoice with tax and discount", "make an invoice", "simple invoice generator"],
    intro: [
      "Freelancers, contractors and small businesses need to send an invoice every time they finish work. A clear invoice gets you paid faster, and a messy one invites questions. You do not need accounting software to produce a neat one.",
      "Fill in your details, your client's details, the invoice number and dates, and add as many line items as you need with quantities and unit prices. Add tax or a discount, include a logo if you have one and the totals are calculated for you. Then save the invoice as a PDF with selectable text.",
    ],
    steps: [
      "Enter your business details, the client details, the invoice number and the dates.",
      "Add line items with a description, quantity and unit price, then set any tax or discount and choose the currency.",
      "Check the preview, press Save as PDF and choose Save as PDF as the destination in the print window.",
    ],
    points: [
      { h: "Correct totals", p: "Line amounts, discount, tax and total are rounded to the cent and update as you type." },
      { h: "Eight currencies", p: "USD, EUR, GBP, PKR, INR, AED, CAD and AUD, formatted the way each is written." },
      { h: "Your logo, kept private", p: "A logo you add is shown in the preview and the PDF but is never uploaded." },
      { h: "A clean, printable layout", p: "A4 page with clear sections and text you can select, with no watermark." },
    ],
    sections: [
      {
        h: "What should an invoice include?",
        paras: [
          "At minimum an invoice should show the word invoice, a unique invoice number, the issue date, your name and contact details, the client's name and address, a description of what you supplied, the quantity and price, the total and when and how you want to be paid. Unique numbers make bookkeeping easier and are required in many countries.",
          "Depending on where you work, there may be extra requirements: a tax or VAT registration number, a statement of the tax rate, your company registration number or the legal name of your business. Check the rules for your country and your client's country, because requirements differ. Put payment details such as bank account or payment link in the notes box.",
        ],
      },
      {
        h: "How are tax and discount calculated on the invoice?",
        paras: [
          "The subtotal is the sum of each line's quantity multiplied by its unit price. A discount is subtracted from the subtotal, either as a percentage of it or as a fixed amount. Tax is then calculated on the discounted amount, which is how sales tax and VAT normally work. The total due is the discounted subtotal plus tax.",
          "For example, a subtotal of 900, a 10 percent discount and 5 percent tax gives a discount of 90, a taxable amount of 810, tax of 40.50 and a total of 850.50. If your tax rules work differently, for example with tax included in the prices, adjust the unit prices and leave the tax at zero.",
        ],
      },
      {
        h: "Tips for getting paid faster",
        paras: [
          "Send the invoice as soon as the work is done, and say clearly when it is due and how to pay. Shorter terms such as 7 or 14 days work better than 30 or more, and a polite reminder a few days before the due date helps. Use a clear description for each line so that the client's accounts team does not need to ask what it is for.",
          "Keep a copy of every invoice and number them in order. Save the PDF with a name such as client-name-invoice-001.pdf, so that you can find it later. This tool does not store your data, so keep the PDFs you create.",
        ],
      },
    ],
    tips: [
      "Use a new invoice number every time and keep them in sequence.",
      "Describe each line clearly so the client knows what they are paying for.",
      "Put bank or payment details in the notes box.",
      "Choose Save as PDF and switch off headers and footers in the print window.",
      "Check local tax rules. This tool does not give tax advice.",
    ],
    faq: [
      { q: "Is the invoice generator really free?", a: "Yes. There is no account, no watermark and no limit on invoices." },
      { q: "Is my invoice data stored?", a: "No. Everything stays in your browser. Save the PDF to keep a copy." },
      { q: "How do I save the invoice as a PDF?", a: "Press Save as PDF. In the print window choose Save as PDF as the destination." },
      { q: "Can I add my logo?", a: "Yes. Choose an image and it appears at the top left of the invoice." },
      { q: "Does it calculate tax automatically?", a: "Yes. Enter the rate and it is applied to the amount after discount." },
      free,
    ],
    related: ["pdf-maker", "signature-generator", "loan-emi-calculator", "percentage-calculator", "image-to-pdf"],
  },
];
