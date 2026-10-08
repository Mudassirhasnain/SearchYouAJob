import Link from "next/link";
import { CATEGORIES, TOOLS } from "@/lib/tools";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-zinc-200 bg-white print:hidden">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 text-sm sm:grid-cols-4">
        <div>
          <p className="font-semibold text-zinc-800">SearchYouAJob</p>
          <p className="mt-2 text-zinc-600">Describe the job you want in plain words and get real listings, plus free tools for the paperwork.</p>
        </div>
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
      <div className="border-t border-zinc-100 py-4 text-center text-xs text-zinc-500">
        <Link href="/" className="hover:underline">Job Search</Link> · <Link href="/tools" className="hover:underline">Job Tools</Link> · <Link href="/about" className="hover:underline">About</Link>
        <p className="mt-1">© {new Date().getFullYear()} SearchYouAJob</p>
      </div>
    </footer>
  );
}
