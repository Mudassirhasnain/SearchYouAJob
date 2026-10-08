import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/site/JsonLd";
import ToolRunner from "@/components/tools/ToolRunner";
import { TOOLS, getTool } from "@/lib/tools";

const SITE = "https://searchyouajob.vercel.app";

export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTool(slug);
  if (!t) return {};
  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    alternates: { canonical: `/tools/${t.slug}` },
    openGraph: { title: `${t.title} | SearchYouAJob`, description: t.description, url: `${SITE}/tools/${t.slug}`, siteName: "SearchYouAJob", type: "website" },
    twitter: { card: "summary", title: t.title, description: t.description },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTool(slug);
  if (!t) notFound();
  const others = TOOLS.filter((x) => x.slug !== t.slug);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 print:max-w-none print:p-0">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebApplication", name: t.name, url: `${SITE}/tools/${t.slug}`, description: t.description, applicationCategory: "BusinessApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
            { "@type": "ListItem", position: 2, name: "Job Tools", item: SITE + "/tools" },
            { "@type": "ListItem", position: 3, name: t.name, item: `${SITE}/tools/${t.slug}` } ] },
          { "@type": "FAQPage", mainEntity: t.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      }} />

      <div className="print:hidden">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
          <Link href="/" className="hover:underline">Home</Link> / <Link href="/tools" className="hover:underline">Job Tools</Link> / <span className="text-zinc-700">{t.name}</span>
        </nav>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.name}</h1>
        <p className="mt-2 max-w-2xl text-lg text-zinc-600">{t.short}</p>
      </div>

      <section aria-label={t.name} className="mt-6 rounded-2xl border border-zinc-200 bg-[#f4f4f2] p-4 sm:p-6 print:m-0 print:border-0 print:bg-transparent print:p-0">
        <ToolRunner tool={t} />
      </section>

      <div className="mt-14 max-w-3xl print:hidden">
        <section>
          <h2 className="text-2xl font-semibold">About this {t.name.toLowerCase()}</h2>
          {t.intro.map((p, i) => <p key={i} className="mt-3 text-zinc-700">{p}</p>)}
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">How to use the {t.name.toLowerCase()}</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-zinc-700">
            {t.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Why use it</h2>
          {t.points.map((p) => (
            <div key={p.h} className="mt-4">
              <h3 className="font-medium">{p.h}</h3>
              <p className="mt-1 text-zinc-700">{p.p}</p>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Questions people ask</h2>
          {t.faq.map((f) => (
            <details key={f.q} className="border-b border-zinc-200 py-3">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-zinc-700">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">More job tools</h2>
          <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}><Link href={`/tools/${o.slug}`} className="text-[#2E5C8A] underline">{o.name}</Link></li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-700">Done with the paperwork? <Link href="/" className="text-[#2E5C8A] underline">Search for jobs in plain English</Link>.</p>
        </section>
      </div>
    </main>
  );
}
