import Link from "next/link";
import { CATEGORIES, TOOLS } from "@/lib/tools";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-zinc-200 bg-white print:hidden">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm">
        <div className="max-w-md">
          <p className="font-semibold text-zinc-800">SearchYouAJob</p>
          <p className="mt-2 text-zinc-600">Describe the job you want in plain words and get real listings, plus {TOOLS.length} free tools that run in your browser.</p>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <div key={c}>
              <p className="font-semibold text-zinc-800">{c}</p>
              <ul className="mt-2 space-y-1.5">
                {TOOLS.filter((t) => t.category === c).map((t) => (
                  <li key={t.slug}><Link href={`/tools/${t.slug}`} className="text-zinc-600 hover:text-[#2E5C8A]">{t.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-zinc-100 py-4 text-center text-xs text-zinc-500">
        <Link href="/" className="hover:underline">Job Search</Link> · <Link href="/tools" className="hover:underline">Free Tools</Link> · <Link href="/about" className="hover:underline">About</Link> · <Link href="/privacy" className="hover:underline">Privacy Policy</Link> · <Link href="/contact" className="hover:underline">Contact</Link>
        <p className="mt-1">© {new Date().getFullYear()} SearchYouAJob</p>
      </div>
    </footer>
  );
}
