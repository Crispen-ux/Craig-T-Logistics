import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleDollarSign, Clock, MapPin, Navigation, Truck, CalendarClock } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import Reveal from "@/components/reveal";
import QuoteCta from "@/components/quote-cta";
import FaqList from "@/components/faq-list";
import CorridorMap from "@/components/corridor-map";
import { PageHeader } from "@/components/page-parts";
import { Badge } from "@/components/ui/badge";
import { corridors, getCorridor } from "@/lib/corridors";
import { towns } from "@/lib/places";
import { formatKm } from "@/lib/utils";

export const generateStaticParams = () => corridors.map((c) => ({ slug: c.slug }));

export const generateMetadata = ({ params }) => {
  const c = getCorridor(params.slug);
  return c
    ? {
        title: `${c.title} freight corridor`,
        description: `${c.title} by ${c.route}: ${formatKm(c.km)}, ${c.drive} driving, typical transit ${c.transit}. Tolls, stops and planning notes.`,
      }
    : {};
};

export default function CorridorPage({ params }) {
  const c = getCorridor(params.slug);
  if (!c) notFound();

  const points = [c.from, c.to]
    .map((id) => towns.find((t) => t.id === id))
    .filter(Boolean)
    .map((t) => ({ name: t.name, lat: t.lat, lng: t.lng }));

  const facts = [
    { icon: Navigation, label: "Road distance", value: formatKm(c.km) },
    { icon: Clock, label: "Driving time", value: c.drive },
    { icon: Truck, label: "Typical transit", value: c.transit },
    { icon: CalendarClock, label: "Planning band", value: c.band },
  ];

  const others = corridors.filter((x) => x.slug !== c.slug);

  return (
    <>
      <PageHeader
        eyebrow="Corridor guide"
        crumbs={[["Corridors", "/corridors"], [c.title]]}
        title={c.title}
        lead={`${c.route} · ${formatKm(c.km)} · ${c.drive} driving · typical transit ${c.transit}`}
      >
        <div className="mt-7 flex flex-wrap gap-2">
          <Badge>{c.band}</Badge>
          <Badge variant="outline" className="border-white/25 text-white/70">{c.route}</Badge>
          <Badge variant="outline" className="border-white/25 text-white/70">{c.km} km</Badge>
        </div>
      </PageHeader>

      <Section className="pt-14">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 60}>
                <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/15 text-ink dark:bg-amber/15 dark:text-amber">
                    <f.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{f.label}</span>
                    <span className="block font-display text-xl font-extrabold">{f.value}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <CorridorMap points={points} route label={`Map of the ${c.title} corridor`} />
        </Container>
      </Section>

      <Section tone="muted" className="pt-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="On the road" title="What to plan for" />
            <ul className="mt-8 space-y-5">
              {c.highlights.map((h) => (
                <li key={h} className="flex gap-3.5 text-[17px] leading-relaxed text-muted-foreground">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h2 className="flex items-center gap-2 text-lg">
                <CalendarClock className="h-5 w-5 text-amber" /> Best departure
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.best}</p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h2 className="flex items-center gap-2 text-lg">
                <CircleDollarSign className="h-5 w-5 text-amber" /> Tolls & charges
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.tolls}</p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h2 className="flex items-center gap-2 text-lg">
                <CalendarClock className="h-5 w-5 text-amber" /> Scheduled departures
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.departures}</p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h2 className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-amber" /> Typical waypoints
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.stops.map((s) => (
                  <span key={s} className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {c.faqs?.length > 0 && (
        <Section>
          <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeader eyebrow="Questions" title={`On the ${c.title} route`} />
            <FaqList items={c.faqs} className="rounded-3xl border border-border bg-card px-6 shadow-soft" />
          </Container>
        </Section>
      )}

      <Section tone="line" className="pt-16">
        <Container>
          <SectionHeader eyebrow="More corridors" title="Other routes we run" cta="All corridors" ctaHref="/corridors" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={(i % 3) * 70}>
                <Link href={`/corridors/${o.slug}`} className="card-hover flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="text-lg">{o.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {o.route} · {formatKm(o.km)} · {o.transit}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold">
                    Read guide <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCta
        title={`Quote the ${c.title} run`}
        lead={`Tell us the collection address, the load and the delivery date on the ${c.route}. We reply with a price within one working day.`}
      />
    </>
  );
}
