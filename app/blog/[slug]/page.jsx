import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import QuoteCta from "@/components/quote-cta";
import Reveal from "@/components/reveal";
import { PageHeader } from "@/components/page-parts";
import { posts } from "@/lib/data";

export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export const generateMetadata = ({ params }) => {
  const p = posts.find((x) => x.slug === params.slug);
  return p ? { title: p.title, description: p.excerpt } : {};
};

export default function PostPage({ params }) {
  const p = posts.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const related = posts.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        crumbs={[["Blog", "/blog"], [p.title]]}
        title={p.title}
        lead={p.excerpt}
      >
        <time className="mt-5 block text-sm font-semibold text-white/60" dateTime={p.date}>
          {new Date(`${p.date}T12:00:00`).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
        </time>
      </PageHeader>

      <Section className="py-16">
        <Container>
          <article className="prose-site mx-auto">
            {p.body.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
            <div className="not-prose mt-10 rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h2 className="text-2xl">Put it into practice</h2>
              <p className="mt-2 text-muted-foreground">
                Send us the route, the load and the date — we will come back with the vehicle, the transit time and a
                price within one working day.
              </p>
              <Link
                href="/#quote"
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground hover:brightness-105"
              >
                Get a quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </Container>
      </Section>

      <Section tone="muted" className="pt-4">
        <Container>
          <SectionHeader eyebrow="Keep reading" title="More from the blog" cta="All articles" ctaHref="/blog" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 70}>
                <Link href={`/blog/${r.slug}`} className="card-hover flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <time className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{r.date}</time>
                  <h3 className="mt-3 text-lg">{r.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{r.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold">
                    Read <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCta showPoints={false} />
    </>
  );
}
