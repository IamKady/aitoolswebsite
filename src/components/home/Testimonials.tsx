import { Star, Quote } from "lucide-react";
import { getInitials } from "@/lib/utils";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Content Creator",
    avatar: null,
    initials: "SC",
    rating: 5,
    text: "ToolWire AI saved me hours of research. I found the perfect AI writing tool for my blog in under 5 minutes. The comparison feature is a game-changer!",
    color: "#6366f1",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Full Stack Developer",
    avatar: null,
    initials: "MR",
    rating: 5,
    text: "The AI recommendation assistant actually understands what I need. It suggested tools I'd never heard of that completely transformed my development workflow.",
    color: "#8b5cf6",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Marketing Manager",
    avatar: null,
    initials: "PS",
    rating: 5,
    text: "Best AI tools directory on the internet. The category organization is perfect, and the reviews are genuine. This is my go-to resource for discovering new AI tools.",
    color: "#ec4899",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Startup Founder",
    avatar: null,
    initials: "DK",
    rating: 5,
    text: "Found our entire AI tool stack for our startup through ToolWire AI. The collections feature is brilliant — especially the 'Best AI for Startups' list.",
    color: "#10b981",
  },
  {
    id: 5,
    name: "Aisha Johnson",
    role: "University Student",
    avatar: null,
    initials: "AJ",
    rating: 5,
    text: "As a student, finding free AI tools was challenging until I discovered ToolWire AI. The 'Free AI Tools' collection is incredible — uses it daily for assignments!",
    color: "#f59e0b",
  },
  {
    id: 6,
    name: "Tom Richardson",
    role: "Freelance Designer",
    avatar: null,
    initials: "TR",
    rating: 4,
    text: "The search is incredibly smart. I typed 'remove background from image' and it gave me exactly the tools I needed with honest pros/cons comparisons.",
    color: "#06b6d4",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">What Users Say</p>
          <h2 className="text-3xl font-bold text-foreground">
            Trusted by <span className="gradient-text">Thousands</span> of Users
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">Real reviews from real people discovering AI tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-lg transition-all duration-200 relative"
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-4 right-4 w-6 h-6 opacity-10"
                style={{ color: testimonial.color }}
              />

              {/* Rating */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: testimonial.color }}
                >
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
