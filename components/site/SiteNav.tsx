"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Job Search" },
  { href: "/tools", label: "Job Tools" },
  { href: "/about", label: "About" },
];

export default function SiteNav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-[#fafaf9]/95 backdrop-blur print:hidden">
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-800">
          <Image src="/searchYouAJobIcon.png" alt="" width={28} height={28} />
          <span className="hidden sm:inline">SearchYouAJob</span>
        </Link>
        <ul className="flex items-center gap-1 text-sm">
          {links.map((l) => {
            const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 ${active ? "bg-[#EAF1FD] font-medium text-[#2E5C8A]" : "text-zinc-600 hover:bg-zinc-100"}`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
