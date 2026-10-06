import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import Reveal from "@/components/reveal";
import QuoteCta from "@/components/quote-cta";
import { PageHeader } from "@/components/page-parts";
import { Icon } from "@/components/icon";
import { services } from "@/lib/data";

export const metadata = {
  title: "Freight Services",
  description:
    "Long-distance haulage, local delivery, full and part loads, cross-border freight, express runs and container haulage across South Africa.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        crumbs={[["Services"]]}
        title="Everything we move, and how we move it"
        lead="Seven services, one dispatcher and one way of working — quoted up front, tracked in transit and signed for on delivery."
      />

      <Section tone="muted">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 70}>
                <Link href={`/services/${s.slug}`} className="card-hover group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-ink dark:bg-amber/15 dark:text-amber">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-xl">{s.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold">
                    Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-2xl">Not sure which service fits?</h2>
            <p className="lead mt-3">
              Send the route, the pallet count, the weight and your required delivery date. We will recommend the vehicle
              and the service that costs you least for the date you need.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/tools" className="inline-flex h-11 items-center rounded-full border-2 border-border px-6 text-sm font-bold hover:border-ink dark:hover:border-white/40">
                Try the load planner
              </Link>
              <Link href="/fleet" className="inline-flex h-11 items-center rounded-full border-2 border-border px-6 text-sm font-bold hover:border-ink dark:hover:border-white/40">
                Vehicle capacity guide
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <QuoteCta />
    </>
  );
}
