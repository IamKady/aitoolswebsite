import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Bookmark, Star, Clock, Settings } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">My Dashboard</h1>
      <p className="text-muted-foreground text-sm mb-8">Welcome back! Here&apos;s your activity overview.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { icon: Bookmark, label: "Saved Tools", value: "0", color: "text-blue-500", bg: "bg-blue-500/10" },
          { icon: Star, label: "Reviews Written", value: "0", color: "text-yellow-500", bg: "bg-yellow-500/10" },
          { icon: Clock, label: "Tools Viewed", value: "0", color: "text-purple-500", bg: "bg-purple-500/10" },
          { icon: Settings, label: "Comparisons", value: "0", color: "text-green-500", bg: "bg-green-500/10" },
        ].map((item) => (
          <div key={item.label} className="p-5 rounded-2xl border border-border bg-card">
            <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className="text-2xl font-bold text-foreground">{item.value}</div>
            <div className="text-sm text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl border border-dashed border-border text-center">
        <h3 className="font-semibold text-foreground mb-2">Discover AI Tools</h3>
        <p className="text-sm text-muted-foreground mb-4">Start saving and reviewing AI tools to build your personalized collection.</p>
        <Link href="/tools" className="inline-flex items-center gap-2 px-5 py-2.5 gradient-bg text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
          Browse AI Tools
        </Link>
      </div>
    </div>
  );
}
