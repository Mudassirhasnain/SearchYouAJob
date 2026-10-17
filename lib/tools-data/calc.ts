import type { Tool } from "../tool-types";
import { free } from "../tool-types";

const local = {
  h: "Private and instant",
  p: "Every calculation runs in your browser. The numbers you enter are not sent to a server or stored.",
};

export const CALC_TOOLS: Tool[] = [
  {
    slug: "loan-emi-calculator",
    name: "Loan EMI Calculator",
    short: "Work out your monthly instalment, total interest and a full repayment schedule.",
    category: "Calculators",
    kind: "loan-emi-calculator",
    title: "Loan EMI Calculator with Amortization Table",
    description:
      "Calculate your monthly loan EMI, total interest and full amortization schedule for home, car or personal loans. PKR, USD, EUR, GBP, INR. Free, no sign-up.",
    keywords: ["loan emi calculator", "emi calculator", "monthly loan payment calculator", "amortization schedule calculator", "home loan emi calculator", "car loan calculator", "personal loan calculator", "loan interest calculator"],
    intro: [
      "Before you sign a loan agreement, you should know three numbers: how much you will pay every month, how much of the total is interest, and how the balance falls over time. This calculator gives you all three in a second, for any loan amount, interest rate and repayment period.",
      "Enter the loan amount, the yearly interest rate and the tenure in years or months, then pick a currency. You will see your monthly EMI, the total interest, the total payment and a month by month table that you can download as a CSV file for a spreadsheet.",
    ],
    steps: [
      "Enter the loan amount, the annual interest rate and the tenure. Switch between years and months if needed.",
      "Choose your currency: PKR, USD, EUR, GBP or INR.",
      "Read the EMI, total interest and total payment, then open the full schedule or download it as CSV.",
    ],
    points: [
      { h: "Full amortization table", p: "See how much of each payment goes to interest and how much to principal, and the remaining balance after every month." },
      { h: "Works for any loan type", p: "Home, car, personal, education or business loans that use a fixed rate and equal monthly instalments." },
      { h: "Compare scenarios fast", p: "Change the rate or tenure and watch the total interest move, so you can pick a loan you can afford." },
      local,
    ],
    sections: [
      {
        h: "How is EMI calculated?",
        paras: [
          "EMI stands for equated monthly instalment. The standard formula is EMI = P x r x (1 + r)^n divided by ((1 + r)^n - 1), where P is the loan amount, r is the monthly interest rate and n is the number of monthly payments. The monthly rate is the yearly rate divided by 12 and by 100, so 12 percent a year is 0.01 a month.",
          "For example, a loan of 1,000,000 at 12 percent a year over 5 years has 60 payments and a monthly rate of 0.01. The EMI works out to about 22,244. Over 60 months you would pay about 1,334,667 in total, so roughly 334,667 of that is interest. If the rate is zero, the EMI is simply the loan amount divided by the number of months.",
        ],
      },
      {
        h: "Why does a longer tenure cost more?",
        paras: [
          "A longer loan lowers the monthly payment but increases the total interest, because the bank charges interest on the outstanding balance for more months. Stretching the same 1,000,000 loan from 5 years to 10 years at 12 percent drops the EMI to about 14,347 but raises total interest to roughly 721,000.",
          "In the early months of any loan most of each instalment is interest, and the principal portion grows slowly. The amortization table makes this visible. It is the reason that paying extra early in the loan saves more than paying extra near the end.",
        ],
      },
      {
        h: "What this calculator does not include",
        paras: [
          "The result assumes a fixed interest rate and equal monthly payments. It does not include processing fees, insurance, late payment charges, early repayment penalties or taxes, and it does not model variable rates or Islamic financing structures, where profit may be calculated differently from interest.",
          "Banks may also round payments or calculate interest daily, so the figure on your offer letter can differ by a small amount. Use this calculator to compare options and plan your budget, and confirm the final numbers with your lender in writing.",
        ],
      },
    ],
    tips: [
      "Check that your EMI stays under about a third of your monthly income.",
      "Compare the same loan over different tenures before you decide.",
      "Ask the lender for the annual percentage rate, which includes fees.",
      "Download the CSV to track your remaining balance in a spreadsheet.",
      "Make extra principal payments early if the lender allows it without penalty.",
    ],
    faq: [
      { q: "What is EMI?", a: "Equated monthly instalment, the fixed amount you pay each month to repay a loan with interest." },
      { q: "Is the interest calculated monthly?", a: "Yes. The yearly rate is divided by 12 to get the monthly rate used in the formula." },
      { q: "Can I use it for a 0% loan?", a: "Yes. With a rate of zero, the EMI is the loan amount divided by the number of months." },
      { q: "Does it work for a car or home loan?", a: "Yes, for any loan with a fixed rate and equal monthly payments." },
      { q: "Why is my bank EMI slightly different?", a: "Banks may include fees, round amounts or calculate interest in a different way. Ask for their schedule." },
      free,
    ],
    related: ["percentage-calculator", "days-between-dates", "age-calculator", "unit-converter", "invoice-generator"],
  },
  {
    slug: "percentage-calculator",
    name: "Percentage and Discount Calculator",
    short: "Solve percentages, discounts, percentage change and markup with the formula shown.",
    category: "Calculators",
    kind: "percentage-calculator",
    title: "Percentage Calculator: Discounts, % Change",
    description:
      "Calculate percentages, discounts with tax, percentage increase or decrease and markup vs margin. Formulas are shown for every result. Free, no sign-up.",
    keywords: ["percentage calculator", "discount calculator", "percentage change calculator", "what is x percent of y", "sale price calculator", "markup and margin calculator", "percent increase calculator", "percentage difference calculator"],
    intro: [
      "Percentages turn up in everything: a sale price, a pay rise, a tax charge, a test score, a profit margin. They are simple in principle but easy to get wrong in your head, especially when a discount and a coupon are stacked or a tax is added at the end.",
      "This calculator has five modes that cover the common questions: X percent of Y, X is what percent of Y, percentage change between two values, discount with an extra coupon and tax, and markup versus margin. Every answer shows the formula used, so you can check the logic or learn it.",
    ],
    steps: [
      "Choose the question that matches your problem from the buttons at the top.",
      "Enter the numbers. The result appears at once, with the formula underneath.",
      "Change any number to see how the answer moves.",
    ],
    points: [
      { h: "Five common problems", p: "Percent of a number, one number as a percent of another, percentage change, discounts with tax and markup and margin." },
      { h: "Stacked discounts handled correctly", p: "A second coupon is applied to the already discounted price, as shops usually do, not added to the first percentage." },
      { h: "Formula on every result", p: "See exactly how the answer was calculated." },
      local,
    ],
    sections: [
      {
        h: "How do you calculate a percentage of a number?",
        paras: [
          "Divide the percentage by 100 and multiply by the number. 15 percent of 200 is 15 divided by 100, which is 0.15, times 200, which equals 30. To find what percent one number is of another, divide the part by the whole and multiply by 100. 30 out of 200 is 0.15, or 15 percent.",
          "Percent literally means per hundred, so any percentage is a fraction with 100 as the bottom number. Moving the decimal point two places converts between the two forms, and this is the basis of every mode in this calculator.",
        ],
      },
      {
        h: "How is percentage change calculated?",
        paras: [
          "Percentage change is the difference between the new and old value divided by the old value, multiplied by 100. If a price rises from 80 to 100, the change is 20 divided by 80, which is 25 percent. If it falls from 100 back to 80, the change is minus 20 percent, not minus 25 percent, because the starting point is different.",
          "This asymmetry catches many people out. A 50 percent loss needs a 100 percent gain to get back to where you started. When you compare two figures where neither is clearly the starting point, state which one you used as the base to avoid confusion.",
        ],
      },
      {
        h: "What is the difference between markup and margin?",
        paras: [
          "Markup is profit as a percentage of cost. Margin is profit as a percentage of the selling price. If you buy an item for 80 and sell it for 100, your profit is 20. The markup is 25 percent of cost, while the margin is 20 percent of price. They describe the same profit in two ways, and mixing them up leads to underpricing.",
          "For discounts, remember that two discounts do not simply add. A 20 percent discount followed by a 10 percent coupon takes the price to 72 percent of the original, which is a 28 percent total discount, not 30. Tax is usually added after discounts, which this calculator also does.",
        ],
      },
    ],
    tips: [
      "Use the percentage change mode for salary rises, price changes and growth.",
      "For a sale, enter the tax rate to see the real price you pay at the till.",
      "Remember that the base value matters. A percent of a small number is small.",
      "Check markup versus margin before setting prices for a product.",
      "Round only at the end to avoid compounding small errors.",
    ],
    faq: [
      { q: "How do I calculate 20% off a price?", a: "Choose Discount and tax, enter the original price and 20 as the discount. The result shows the final price and the amount saved." },
      { q: "What is the formula for percentage increase?", a: "(New value minus old value) divided by old value, times 100." },
      { q: "Do two discounts add together?", a: "No. The second applies to the reduced price, so the total is slightly less than the sum." },
      { q: "Is markup the same as margin?", a: "No. Markup is based on cost and margin is based on the selling price." },
      { q: "Can I use decimals?", a: "Yes. Enter any number, such as 7.5 percent." },
      free,
    ],
    related: ["loan-emi-calculator", "bmi-calculator", "unit-converter", "days-between-dates", "invoice-generator"],
  },
  {
    slug: "age-calculator",
    name: "Exact Age Calculator",
    short: "Find your exact age in years, months, days, hours and minutes, and your next birthday.",
    category: "Calculators",
    kind: "age-calculator",
    title: "Age Calculator: Exact Age in Years, Months, Days",
    description:
      "Calculate your exact age in years, months, days, hours and minutes. See the weekday you were born and a countdown to your next birthday. Free and instant.",
    keywords: ["age calculator", "exact age calculator", "calculate age from date of birth", "how old am i", "age in days calculator", "birthday countdown", "age on a date calculator", "date of birth calculator"],
    intro: [
      "Forms and applications ask for your age on a particular date, and the answer is not always obvious. Visa rules, school admission cut-offs, exam eligibility and pension schemes often depend on your exact age on a certain day, down to the month and day.",
      "Enter your date of birth and the calculator shows your age in years, months and days, plus the same period as total months, weeks, days, hours and minutes. It also tells you which day of the week you were born and how long until your next birthday. Pick a different comparison date to see your age on any day, past or future.",
    ],
    steps: [
      "Select your date of birth.",
      "Leave the second date empty for your age today, or choose a date to find your age on that day.",
      "Read your exact age, the totals and the countdown to your next birthday.",
    ],
    points: [
      { h: "Calendar-correct result", p: "Months and days are counted by the real calendar, so different month lengths and leap years are handled." },
      { h: "Age on any date", p: "Useful for eligibility checks, such as your age on the first day of a school year or on the closing date of a job." },
      { h: "Live and private", p: "The current time is read from your device. Your birth date is not stored or sent anywhere." },
    ],
    sections: [
      {
        h: "How is exact age calculated?",
        paras: [
          "The calculator subtracts the birth date from the comparison date year by year, then month by month, then day by day. If the day of the month is smaller than your birth day, it borrows a month and adds the number of days in the previous month. If the months go negative, it borrows a year.",
          "For example, someone born on 14 May 1998 is on 13 October 2026 28 years, 4 months and 29 days old. The totals use the actual number of milliseconds between the two moments, so the hours and minutes figures reflect the exact time on your device clock.",
        ],
      },
      {
        h: "Why does age on a specific date matter?",
        paras: [
          "Eligibility rules are usually written for a fixed date. A school might require a child to be five on or before 31 August. A job post may require candidates to be at least 18 or no older than 35 on the closing date. A visa or scholarship might use your age on the application deadline.",
          "Counting years in your head can go wrong by a month or two around birthdays. Entering the rule date in the comparison box gives a definite answer, which you can screenshot or note for your records. Always confirm which date the organisation uses.",
        ],
      },
      {
        h: "What happens with leap day birthdays?",
        paras: [
          "People born on 29 February have a birthday only in leap years. In other years, many legal systems treat the birthday as 28 February or 1 March, and the choice differs between countries. This calculator uses the calendar day directly, so in a non-leap year the countdown points to 1 March because the date 29 February does not exist.",
          "If a legal document depends on your leap day birthday, check the rule that applies to you rather than relying on a general tool.",
        ],
      },
    ],
    tips: [
      "Use the comparison date for cut-offs such as school entry or application deadlines.",
      "Check the weekday you were born. It is a fun fact and sometimes asked on forms.",
      "Enter the birth date carefully. A swapped day and month changes the result.",
      "Time totals update every second, so refresh for an exact moment.",
      "For someone else's age, never share their birth date publicly.",
    ],
    faq: [
      { q: "How do I calculate my age from my date of birth?", a: "Enter your date of birth. The calculator compares it with today and shows years, months and days." },
      { q: "Can I find my age on a past or future date?", a: "Yes. Use the age at date field to choose any date." },
      { q: "How are months counted?", a: "By calendar months, borrowing the actual number of days in the previous month when needed." },
      { q: "Does it show the day of the week I was born?", a: "Yes, below your age result." },
      { q: "Is my date of birth stored?", a: "No. It is used in your browser only." },
      free,
    ],
    related: ["days-between-dates", "weeks-into-the-year", "unix-timestamp-converter", "bmi-calculator", "time-zone-converter"],
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    short: "Check your body mass index, category and healthy weight range for your height.",
    category: "Calculators",
    kind: "bmi-calculator",
    title: "BMI Calculator: Body Mass Index and Healthy Range",
    description:
      "Calculate your BMI in metric or imperial units. See your WHO category on a colour gauge and the healthy weight range for your height. Free and private.",
    keywords: ["bmi calculator", "body mass index calculator", "bmi calculator for adults", "healthy weight range calculator", "bmi chart", "calculate bmi kg cm", "bmi calculator lbs feet", "ideal weight for height"],
    intro: [
      "Body mass index, or BMI, is a quick way to compare your weight with your height. It is widely used by doctors, insurers and public health bodies as a first screening step, because it needs only two measurements and no equipment.",
      "Enter your height and weight in metric or imperial units. The calculator shows your BMI, the category it falls into, a colour gauge with your position marked and the weight range that is considered healthy for your height. An optional waist measurement adds a waist to height ratio.",
    ],
    steps: [
      "Choose metric (centimetres and kilograms) or imperial (feet, inches and pounds).",
      "Enter your height and weight. Add your waist if you want the waist to height ratio.",
      "Read your BMI, category and healthy weight range.",
    ],
    points: [
      { h: "WHO adult categories", p: "From underweight through normal weight to obesity classes, shown with colours and a gauge." },
      { h: "Healthy range for your height", p: "See the weight span that corresponds to a BMI between 18.5 and 24.9." },
      { h: "Honest about limits", p: "BMI is a screening number, and the page says clearly when it can mislead." },
      local,
    ],
    sections: [
      {
        h: "How is BMI calculated?",
        paras: [
          "BMI equals weight in kilograms divided by height in metres squared. Someone who weighs 68 kg and is 1.70 m tall has a BMI of 68 divided by 2.89, which is about 23.5. In imperial units the calculator first converts pounds to kilograms and feet and inches to centimetres, so the result is the same.",
          "For adults the World Health Organization uses these ranges: under 18.5 is underweight, 18.5 to 24.9 is normal weight, 25 to 29.9 is overweight and 30 or above is obesity, divided into classes at 35 and 40. Some countries use different cut-offs for certain populations, for example lower thresholds for people of South Asian descent, so ask a doctor which applies to you.",
        ],
      },
      {
        h: "What are the limits of BMI?",
        paras: [
          "BMI does not measure body fat directly. It cannot tell muscle from fat, so a muscular athlete can be classed as overweight. It also does not show where fat is stored, which matters for health, and it is not suitable for children and teenagers, pregnant women or older adults without adjustments.",
          "Think of it as a starting point for a conversation with a doctor, not a diagnosis. Waist measurement, blood pressure, blood tests, diet and activity levels give a much fuller picture. A waist to height ratio under 0.5 is a commonly used simple guide, which is why the calculator offers it as an extra.",
        ],
      },
      {
        h: "What should you do with the result?",
        paras: [
          "If your BMI is in the normal range, keep up healthy habits. If it is above or below the range, do not panic or start extreme changes. Talk to a doctor or a registered dietitian who can look at your whole situation, including age, family history and medical conditions.",
          "Sustainable changes in eating, sleep and movement matter more than any single number. This page gives general information and is not medical advice. If you have symptoms or concerns about your weight, seek professional help.",
        ],
      },
    ],
    tips: [
      "Measure your height without shoes and your weight at a similar time of day.",
      "Use the healthy range as a rough guide, not a strict target.",
      "Do not use BMI for children. They need age based growth charts.",
      "Track trends over months rather than reacting to daily changes.",
      "Speak to a doctor before making big changes to diet or exercise.",
    ],
    faq: [
      { q: "What is a healthy BMI?", a: "For most adults, a BMI from 18.5 to 24.9 is considered the normal weight range by the WHO." },
      { q: "Is BMI accurate for athletes?", a: "Not always. Muscle weighs more than fat, so a muscular person may be labelled overweight." },
      { q: "Can I use it for my child?", a: "No. Children and teenagers need age and sex specific growth charts from a health professional." },
      { q: "How do I convert pounds and feet?", a: "Switch to imperial and enter feet, inches and pounds. The calculator converts them for you." },
      { q: "Is this medical advice?", a: "No. It is general information. Ask a health professional about your own situation." },
      free,
    ],
    related: ["percentage-calculator", "unit-converter", "age-calculator", "days-between-dates", "online-timer-stopwatch"],
  },
  {
    slug: "days-between-dates",
    name: "Days Between Dates Calculator",
    short: "Count the days between two dates, or add and subtract time from a date.",
    category: "Calculators",
    kind: "days-between-dates",
    title: "Days Between Dates Calculator, Add Days to Date",
    description:
      "Find the exact days, weeks, months and working days between two dates, or add and subtract days, weeks, months and years from a date. Free and instant.",
    keywords: ["days between dates calculator", "date difference calculator", "how many days until", "add days to a date", "working days calculator", "days from date calculator", "count days between two dates", "business days between dates"],
    intro: [
      "Deadlines, notice periods, contract terms, pregnancy dates, project schedules and trips all depend on counting days. Doing it by hand across months of different lengths is slow and easy to get wrong, particularly when leap years or weekends are involved.",
      "This calculator has two modes. The first counts the days between two dates and breaks the answer into weeks, months, years, hours and working days. The second starts from a date and adds or subtracts any number of days, weeks, months and years, then shows the new date with its weekday.",
    ],
    steps: [
      "Choose Days between two dates, or Add or subtract time.",
      "Pick the dates, or a start date and the amount of time to add or remove.",
      "Read the result, including the weekday, and change the inputs to compare dates.",
    ],
    points: [
      { h: "Several answers at once", p: "Total days, weeks and days, years months and days, hours and Monday to Friday working days." },
      { h: "Include the end date if you need it", p: "A single checkbox switches between counting the gap and counting both end days." },
      { h: "Date arithmetic done right", p: "Adding one month to 31 January gives the last day of February, not a date that does not exist." },
    ],
    sections: [
      {
        h: "How many days are between two dates?",
        paras: [
          "The difference is the number of whole days from the first date to the second. From 1 January to 31 December in an ordinary year is 364 days, because you count the steps between the dates. If you also count the start day itself, which people often do when counting a stay or a subscription, the total is 365. The Include the end date option handles this.",
          "The calculator works in UTC internally so that daylight saving changes cannot add or remove an hour and alter the day count. Leap years are counted correctly, so the gap between the same two calendar dates is a day longer when 29 February falls between them.",
        ],
      },
      {
        h: "How are working days counted?",
        paras: [
          "Working days here mean Monday to Friday. The calculator counts every weekday between the dates and skips Saturdays and Sundays. It does not know about public holidays, which differ between countries and years, so subtract those yourself for an exact business day count.",
          "Some workplaces use a different working week, for example Sunday to Thursday. In that case use the total days and weeks figures, and adjust with your own calendar. For legal notice periods, always check how your contract counts days.",
        ],
      },
      {
        h: "How do you add months to a date?",
        paras: [
          "Months have different lengths, so adding one month is not the same as adding 30 days. The usual rule is to keep the same day of the month, and if the target month is shorter, to use its last day. Adding one month to 31 January gives 28 February, or 29 February in a leap year.",
          "In the add or subtract mode the calculator applies years and months first, then weeks and days. This matches how most people think about it: three months and ten days from a date. If you need a rule written in a contract, such as 90 days or three months, use the option that matches the wording exactly.",
        ],
      },
    ],
    tips: [
      "Decide whether the start or end day counts before you rely on the number.",
      "Subtract public holidays from the working day count yourself.",
      "Use months for subscriptions and days for strict deadlines.",
      "For pregnancy or school dates, check the official rule that applies.",
      "Bookmark the page for recurring tasks such as notice periods.",
    ],
    faq: [
      { q: "How do I count days until a date?", a: "Set the start to today and the end to your target date. The total days is shown first." },
      { q: "Does it include weekends?", a: "Total days include everything. A separate working days figure excludes Saturdays and Sundays." },
      { q: "Are leap years handled?", a: "Yes. Dates are calculated with the real calendar, including 29 February." },
      { q: "Can I add 90 days to a date?", a: "Yes. Use Add or subtract time, enter 90 in days and read the new date and weekday." },
      { q: "Does it know public holidays?", a: "No. Holidays vary by country, so subtract them manually." },
      free,
    ],
    related: ["age-calculator", "weeks-into-the-year", "unix-timestamp-converter", "time-zone-converter", "loan-emi-calculator"],
  },
];
