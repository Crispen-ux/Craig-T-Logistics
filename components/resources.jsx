"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { resources } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Resources() {
  const cats = ["All", ...new Set(resources.map((r) => r[0]))];
  const [active, setActive] = useState("All");
  const shown = resources.filter((r) => active === "All" || r[0] === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all",
              active === c
                ? "border-ink bg-ink text-white dark:border-amber dark:bg-amber dark:text-ink"
                : "border-border bg-card text-muted-foreground hover:border-ink hover:text-foreground dark:hover:border-white/40 dark:hover:text-foreground"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map(([cat, title, desc, href]) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover group flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{cat}</span>
            <span className="flex items-center gap-1.5 font-display text-lg font-extrabold leading-snug">
              {title}
              <ArrowUpRight className="h-4 w-4 shrink-0 text-amber transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground">{desc}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
