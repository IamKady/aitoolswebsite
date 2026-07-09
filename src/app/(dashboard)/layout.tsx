import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { BookOpen, Bookmark, History, Settings, Zap } from "lucide-react";

const dashboardLinks = [
  { href: "/dashboard", label: "Overview", icon: Zap },
  { href: "/dashboard/saved", label: "Saved Tools", icon: Bookmark },
  { href: "/dashboard/history", label: "Search History", icon: History },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="w-56 flex-shrink-0 hidden md:block">
            <div className="space-y-1 sticky top-24">
              {dashboardLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
