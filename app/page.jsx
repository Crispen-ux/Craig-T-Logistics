import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import Reveal from "@/components/reveal";
import QuoteCta from "@/components/quote-cta";
import Photo from "@/components/photo";
import FaqList from "@/components/faq-list";
import CorridorMap from "@/components/corridor-map";
import { Icon } from "@/components/icon";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatBand } from "@/components/page-parts";
import { services, industries, features, faqs, posts } from "@/lib/data";
import { corridors } from "@/lib/corridors";
import { towns } from "@/lib/places";
import { wa } from "@/lib/config";
import { formatKm } from "@/lib/utils";

const mapPoints = ["johannesburg", "durban", "cape-town", "gqeberha", "bloemfontein", "polokwane"]
  .map((id) => towns.find((t) => t.id === id))
  .filter(Boolean)
  .map((t) => ({ name: t.name, lat: t.lat, lng: t.lng }));

const trust = ["Quote in one working day", "Live tracking on every load", "POPIA-aware data handling"];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-lines absolute inset-0" />
        <div className="glow-top absolute inset-0" />
        <Container className="relative grid gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div>
            <span className="eyebrow-dark">Nationwide road freight · South Africa</span>
            <h1 className="mt-7 text-[clamp(2.6rem,7vw,4.75rem)] leading-[0.98]">
              Freight that arrives when <span className="text-amber">we say it will</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Long-distance and short-distance road freight across South Africa. Full loads, part loads, cross-border and
              container haulage — with a vehicle type, a transit time and a price before anything moves.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#quote" className={buttonVariants({ variant: "default", size: "lg" })}>
                Get a quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={wa()} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "lg" })}>
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-white/60">
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber" strokeWidth={3} />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a1a24]/90 shadow-lift">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-amber">Scheduled corridors</h2>
                <Badge variant="outline" className="border-white/20 text-white/60">Indicative transit</Badge>
              </div>
              <ul>
                {corridors.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/corridors/${c.slug}`}
                      className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-white/[0.07] px-6 py-4 text-sm transition-colors last:border-0 hover:bg-white/5"
                    >
                      <span className="font-semibold">
                        {c.title}
                        <span className="ml-2 text-xs font-medium text-white/40">{c.route}</span>
                      </span>
                      <span className="tabular-nums text-white/55">{formatKm(c.km)}</span>
                      <span className="font-bold text-amber">{c.band}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/corridors" className="flex items-center justify-between px-6 py-4 text-sm font-bold text-white/80 transition-colors hover:text-amber">
                All corridor guides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <StatBand />

      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow="Services"
            title="Whether it's 50 km or 1 500 km"
            lead="One carrier for local runs, national corridors, cross-border loads and container moves — priced the same way, tracked the same way."
            cta="All services"
            ctaHref="/services"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <Link href={`/services/${s.slug}`} className="card-hover group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-ink transition-colors group-hover:bg-primary dark:bg-amber/15 dark:text-amber dark:group-hover:bg-primary dark:group-hover:text-ink">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-foreground">
                    View service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={160}>
              <Link href="#quote" className="card-hover flex h-full flex-col justify-between rounded-3xl bg-ink p-7 text-white shadow-lift">
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-amber">
                    <Icon name="calculator" className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl">Not sure what you need?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    Send the route, pallet count and weight. We come back with the right vehicle and a price — usually the
                    same working day.
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-amber">
                  Request a quote <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Why Craig-T"
              title="Built on reliability, not promises"
              lead="Tracked vehicles, planned departures and one dispatcher who knows your loads. You should never have to chase us to find out where your freight is."
            />
            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 60}>
                  <div className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-port/10 text-port dark:bg-amber/15 dark:text-amber">
                      <Icon name={f.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={120}>
            <Photo alt="Craig-T Logistics truck on the road" label="truck photo" />
          </Reveal>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow="Network"
            title="Six corridors we run every week"
            lead="Distances, tolls, pinch points and best departure times for the routes South African shippers use most."
            cta="All corridor guides"
            ctaHref="/corridors"
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <ul className="divide-y divide-border rounded-3xl border border-border bg-card shadow-soft">
              {corridors.map((c, i) => (
                <Reveal as="li" key={c.slug} delay={i * 50}>
                  <Link
                    href={`/corridors/${c.slug}`}
                    className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-muted/60"
                  >
                    <span>
                      <span className="block font-display text-lg font-extrabold">{c.title}</span>
                      <span className="block text-sm text-muted-foreground">
                        {c.route} · {formatKm(c.km)} · {c.drive} driving
                      </span>
                    </span>
                    <Badge variant="secondary">{c.band}</Badge>
                  </Link>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={100}>
              <CorridorMap points={mapPoints} label="Map of the Craig-T Logistics corridor network" />
              <p className="mt-3 text-xs text-muted-foreground">
                Network map · route geometry by OSRM and OpenStreetMap contributors.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Industries"
            title="Freight that understands your cargo"
            lead="Different sectors fail in different ways. We plan around the constraint that matters for yours."
            cta="Industries we serve"
            ctaHref="/industries"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 3) * 70}>
                <Link href="/industries" className="card-hover flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-port text-white dark:bg-amber dark:text-ink">
                    <Icon name={ind.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg">{ind.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ind.blurb}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="line">
        <Container>
          <SectionHeader
            eyebrow="Free planning tools"
            title="Plan the load before you ask for a quote"
            lead="Three calculators built for South African shippers — no sign-up, no key, no cost."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: "route", title: "Transit time & distance", body: "Distance, driving time and a realistic door-to-door estimate between any two towns we serve.", href: "/tools" },
              { icon: "boxes", title: "Load & pallet planner", body: "Pallet count, weight and stack height in — recommended vehicle out, plus part-load vs full-load advice.", href: "/tools" },
              { icon: "calendar", title: "Public holiday planner", body: "Every South African public holiday for this year and next, with observed dates for delivery planning.", href: "/tools" },
            ].map((t, i) => (
              <Reveal key={t.title} delay={i * 80}>
                <Link href={t.href} className="card-hover flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-ink dark:bg-amber/15 dark:text-amber">
                    <Icon name={t.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl">{t.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold">
                    Open the tool <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader
            eyebrow="FAQ"
            title="Straight answers before you book"
            lead="If your question is not here, ask it in the quote form or on WhatsApp — a person replies."
            cta="All FAQs"
            ctaHref="/faq"
          />
          <FaqList items={faqs.slice(0, 6)} className="rounded-3xl border border-border bg-card px-6 shadow-soft" />
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeader eyebrow="From the blog" title="Practical freight advice" cta="All articles" ctaHref="/blog" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link href={`/blog/${p.slug}`} className="card-hover flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <small className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{p.date}</small>
                  <h3 className="mt-3 text-xl">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold">
                    Read article <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCta />
    </>
  );
}
