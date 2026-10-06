import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import Reveal from "@/components/reveal";
import QuoteCta from "@/components/quote-cta";
import CorridorMap from "@/components/corridor-map";
import { PageHeader } from "@/components/page-parts";
import { Badge } from "@/components/ui/badge";
import { corridors } from "@/lib/corridors";
import { towns } from "@/lib/places";
import { formatKm } from "@/lib/utils";

export const metadata = {
  title: "Corridor Guides",
  description:
    "Distances, transit times, tolls and planning notes for the main freight corridors in South Africa — N1, N2, N3 and N4.",
};

const ids = [...new Set(corridors.flatMap((c) => [c.from, c.to]))];
const points = ids.map((id) => {
  const t = towns.find((x) => x.id === id);
  return t ? { name: t.name, lat: t.lat, lng: t.lng } : null;
}).filter(Boolean);

export default function CorridorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Network"
        crumbs={[["Corridors"]]}
        title="Corridor guides"
        lead="The routes we run every week: real distances, realistic transit, toll sections, pinch points and the departure timing that keeps them on schedule."
      />

      <Section tone="muted">
        <Container className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <ul className="grid gap-5">
            {corridors.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 60}>
                <Link href={`/corridors/${c.slug}`} className="card-hover group flex flex-col gap-3 rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl">{c.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {c.route} · {formatKm(c.km)} · {c.drive} driving
                      </p>
                    </div>
                    <Badge variant="secondary">{c.band}</Badge>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{c.highlights[0]}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold">
                    Open guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <div className="lg:sticky lg:top-28">
            <CorridorMap points={points} label="Map of freight corridors in South Africa" />
            <div className="mt-6 rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h2 className="text-lg">Reading these numbers</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li>
                  <strong className="text-foreground">Driving time</strong> assumes a loaded truck at normal highway
                  speeds, before statutory rest breaks.
                </li>
                <li>
                  <strong className="text-foreground">Transit</strong> adds the required breaks, an overnight rest where
                  the law requires one, and normal loading windows.
                </li>
                <li>
                  <strong className="text-foreground">Band</strong> is the planning promise we quote against — your
                  booking confirms the exact date.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Planning"
            title="Five things that decide whether a corridor runs on time"
            lead="Distance is the easy part. These are the variables that actually move a delivery date."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Departure timing", "Leaving after the afternoon peak and before the early-morning delivery rush removes hours from a metro-to-metro run."],
              ["Weather on the passes", "Van Reenen's, Hex River and the Free State storm season are checked before dispatch, not on the road."],
              ["Statutory rest", "Drivers take a break after every 4.5 hours. We plan it into the transit time instead of pretending it does not exist."],
              ["Terminal and depot slots", "Port and customer slots dictate arrival windows. We work backwards from the slot to set the departure."],
              ["Holiday capacity", "The days around a public holiday fill up first — our holiday planner shows the dates that matter."],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={i * 60}>
                <li className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <span className="font-display text-3xl font-extrabold text-amber">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <QuoteCta />
    </>
  );
}
