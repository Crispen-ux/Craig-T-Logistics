import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/section";
import Reveal from "@/components/reveal";
import QuoteCta from "@/components/quote-cta";
import { PageHeader } from "@/components/page-parts";
import { posts } from "@/lib/data";

export const metadata = {
  title: "Logistics Blog",
  description: "Practical freight and logistics advice for South African businesses — loads, routes, documents and planning.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        crumbs={[["Blog"]]}
        title="Practical freight advice"
        lead="Loads, routes, documents and planning — written for the people who actually book the trucks."
      />

      <Section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 70}>
                <Link href={`/blog/${p.slug}`} className="card-hover group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <time className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground" dateTime={p.date}>
                    {new Date(`${p.date}T12:00:00`).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                  <h2 className="mt-3 text-xl">{p.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold">
                    Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCta title="Got a load to plan?" lead="Use what you have read — send the route, the cargo and the date, and we will price it." />
    </>
  );
}
