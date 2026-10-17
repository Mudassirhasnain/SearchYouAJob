import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://searchyouajob.vercel.app"),

  title: {
    default: "SearchYourJob: AI Job Search in One Chat",
    template: "%s | SearchYouAJob",
  },

  description:
    "SearchYouAJob is an AI-powered job search assistant that helps you find relevant jobs through conversational search.",

  icons: {
  icon: "/searchYouAJobIcon.png",
  },

  keywords: [
    "job search",
    "remote jobs",
    "find jobs",
    "find online jobs",
    "find remote jobs",
    "find work from home jobs",
    "online jobs in us",
    "remote jobs",
    "linkedin",
    "jobs finder",
    "automatic job applier",
    "jobs in canada",
    "jobs in america",
    "ai powered job search",
    "search jobs online",
    "unemployement",
    "jobs",
    "online job search",
    "remote jobs in us",
    "online job search tool",
    "search jobs",
    "jobs research",
    "will ai take our jobs",
    "ai jobs",
    "cs jobs",
    "how to search for jobs",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "SearchYourJob: AI Job Search in One Chat",
    description:
      "Find relevant jobs with an AI-powered conversational job search assistant.",
    url: "https://searchyouajob.vercel.app/",
    siteName: "SearchYouAJob",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "SearchYouAJob — AI Job Search Assistant",
    description:
      "Find relevant jobs with an AI-powered conversational job search assistant.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "SearchYouAJob",
              url: "https://searchyouajob.vercel.app/",
              description:
                "AI-powered job search assistant that helps you find relevant jobs through conversational search.",
            }),
          }}
        />
      </head>

      <body suppressHydrationWarning={true}>
        {children}
        <SpeedInsights />
        <Analytics />
        </body>
    </html>
  );
}
