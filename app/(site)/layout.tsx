import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-zinc-900">
      <SiteNav />
      {children}
      <SiteFooter />
    </div>
  );
}
