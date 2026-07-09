import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Shield, LayoutDashboard, Database, Inbox, Home } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col justify-between hidden md:flex">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <Shield className="w-5 h-5" />
            <span>Admin Center</span>
          </div>

          <nav className="space-y-1">
            {[
              { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
              { href: "/", label: "Back to Site", icon: Home },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-semibold">Logged in as Admin</span>
          <UserButton />
        </div>
      </aside>

      {/* Main panel */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-card/50 md:hidden">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Shield className="w-5 h-5" />
            <span>Admin</span>
          </div>
          <UserButton />
        </header>

        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}
