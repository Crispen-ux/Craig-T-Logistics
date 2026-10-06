import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import QuoteCta from "@/components/quote-cta";
import Reveal from "@/components/reveal";
import { PageHeader } from "@/components/page-parts";
import { Icon } from "@/components/icon";
import Photo from "@/components/photo";
import { services } from "@/lib/data";

export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export const generateMetadata = ({ params }) => {
  const s = services.find((x) => x.slug === params.slug);
  return s ? { title: s.title, description: s.short } : {};
};

export default function ServicePage({ params }) {
  const s = services.find((x) => x.slug === params.slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHeader
        eyebrow="Service"
        crumbs={[["Services", "/services"], [s.title]]}
        title={s.title}
        lead={s.intro}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/#quote" className="inline-flex h-12 items-center rounded-full bg-primary px-7 text-[15px] font-bold text-primary-foreground transition hover:brightness-105">
            Get a {s.title.toLowerCase()} quote
          </Link>
          <Link href="/tools" className="inline-flex h-12 items-center rounded-full border-2 border-white/30 px-7 text-[15px] font-bold text-white transition hover:border-white">
            Plan the load
          </Link>
        </div>
      </PageHeader>

      <Section>
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader eyebrow="What you get" title="Included as standard" />
            <ul className="mt-8 grid gap-4">
              {s.pts.map((p) => (
                <li key={p} className="flex items-start gap-3.5 text-[17px] leading-relaxed">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <Reveal delay={80}>
            <Photo alt={s.title} label={`${s.title.toLowerCase()} photo`} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeader eyebrow="How it works" title="Four steps from enquiry to POD" align="center" />
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {s.steps.map((step, i) => (
              <Reveal key={step} delay={i * 70}>
                <li className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <span className="font-display text-4xl font-extrabold text-amber">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Explore" title="Other services" cta="All services" ctaHref="/services" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={(i % 3) * 70}>
                <Link href={`/services/${o.slug}`} className="card-hover group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-port text-white dark:bg-amber dark:text-ink">
                    <Icon name={o.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg">{o.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{o.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold">
                    View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCta title={`Get a ${s.title.toLowerCase()} quote`} lead="Send the route, load details and the date you need it delivered. We reply with a vehicle type, a transit time and a price within one working day." />
    </>
  );
}
