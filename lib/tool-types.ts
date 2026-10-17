export type ToolKind = string;

export const CATEGORIES = [
  "Resume and CV",
  "PDF",
  "Images",
  "Text and Writing",
  "Calculators",
  "Converters",
  "Developer and Security",
  "Everyday Tools",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Tool = {
  slug: string;
  name: string;
  short: string;
  category: Category;
  kind: ToolKind;
  /** SEO title WITHOUT the site suffix. The root template appends " | SearchYouAJob". Keep under 45 characters. */
  title: string;
  /** Meta description, 140 to 160 characters. */
  description: string;
  keywords: string[];
  intro: string[];
  steps: string[];
  points: { h: string; p: string }[];
  faq: { q: string; a: string }[];
  /** Extra long-form sections (h2 + paragraphs). Used to reach 500+ visible words per page. */
  sections?: { h: string; paras: string[] }[];
  /** Short practical tips shown as a list. */
  tips?: string[];
  /** Slugs of related tools (4 to 6), shown as suggestions. */
  related?: string[];
};

export const privacy = {
  h: "Your files stay on your device",
  p: "The work happens inside your browser. Nothing is uploaded to our servers, so private documents stay private.",
};
export const free = { q: "Is it free?", a: "Yes. No account, no watermark, no limit on how many times you use it." };
