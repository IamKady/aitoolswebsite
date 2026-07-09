"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const STATS: StatItem[] = [
  { value: 500, suffix: "+", label: "AI Tools", description: "Curated & verified" },
  { value: 30, suffix: "+", label: "Categories", description: "Every use case covered" },
  { value: 50, suffix: "K+", label: "Monthly Users", description: "Discovering AI tools" },
  { value: 10, suffix: "K+", label: "Reviews", description: "From real users" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Statistics() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-border bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-semibold text-foreground text-sm sm:text-base">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
