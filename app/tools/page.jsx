import Link from "next/link";
import { ArrowRight, CalendarDays, Calculator, Boxes } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import QuoteCta from "@/components/quote-cta";
import { PageHeader } from "@/components/page-parts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import TransitCalculator from "@/components/transit-calculator";
import LoadPlanner from "@/components/load-planner";
import { holidays, nextHoliday, daysUntil, weekdayName } from "@/lib/holidays";
import { Icon } from "@/components/icon";

export const metadata = {
  title: "Free Freight Planning Tools",
  description:
    "Free transit time and distance calculator, load and pallet planner, and South African public holiday calendar for freight planning.",
};

const years = [...new Set(holidays.map((h) => h.date.slice(0, 4)))];

export default function ToolsPage() {
  const upcoming = nextHoliday();

  return (
    <>
      <PageHeader
        eyebrow="Free tools"
        crumbs={[["Tools"]]}
        title="Plan the load before you ask for a quote"
        lead="Three calculators built for South African shippers. No sign-up, no API key, no cost — and they work offline in your browser."
      />

      <Section className="py-16">
        <Container>
          <Tabs defaultValue="transit">
            <TabsList className="flex h-auto flex-wrap justify-start gap-1 rounded-full bg-transparent p-0">
              <TabsTrigger value="transit" className="border border-border bg-card">
                <Calculator className="h-4 w-4" /> Transit & distance
              </TabsTrigger>
              <TabsTrigger value="load" className="border border-border bg-card">
                <Boxes className="h-4 w-4" /> Load planner
              </TabsTrigger>
              <TabsTrigger value="holidays" className="border border-border bg-card">
                <CalendarDays className="h-4 w-4" /> Holiday planner
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transit">
              <div className="mb-6 max-w-3xl">
                <h2 className="text-2xl sm:text-3xl">Transit time & distance</h2>
                <p className="lead mt-3">
                  Pick two towns and get the road distance, driving time and a realistic door-to-door estimate — built
                  with the same rest-break assumptions we quote against.
                </p>
              </div>
              <TransitCalculator />
            </TabsContent>

            <TabsContent value="load">
              <div className="mb-6 max-w-3xl">
                <h2 className="text-2xl sm:text-3xl">Load & pallet planner</h2>
                <p className="lead mt-3">
                  Enter pallet count, weight and stack height. We match it against every vehicle class we run and tell
                  you whether a part load or a full truck makes more sense.
                </p>
              </div>
              <LoadPlanner />
            </TabsContent>

            <TabsContent value="holidays">
              <div className="mb-6 max-w-3xl">
                <h2 className="text-2xl sm:text-3xl">South African public holidays</h2>
                <p className="lead mt-3">
                  Public holidays change delivery weeks. Observed dates are included where a holiday falls on a Sunday.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                {upcoming && (
                  <div className="rounded-3xl border-2 border-amber bg-primary/10 p-7">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Next public holiday</span>
                    <p className="mt-2 font-display text-3xl font-extrabold">{upcoming.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {weekdayName(upcoming.observed || upcoming.date)} ·{" "}
                      {new Date(`${upcoming.observed || upcoming.date}T12:00:00`).toLocaleDateString("en-ZA", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="mt-4 font-display text-5xl font-extrabold text-amber">
                      {daysUntil(upcoming.observed || upcoming.date)} days
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Book time-critical loads before it, not after. Border posts and depots run reduced capacity either
                      side of a holiday.
                    </p>
                    <Link
                      href="/faq"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold underline decoration-amber decoration-2 underline-offset-4"
                    >
                      Planning questions <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}

                <div className="space-y-6">
                  {years.map((y) => (
                    <div key={y} className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                      <div className="flex items-center justify-between border-b border-border px-6 py-4">
                        <h3 className="font-display text-xl font-extrabold">{y}</h3>
                        <Badge variant="secondary">{holidays.filter((h) => h.date.startsWith(y)).length} holidays</Badge>
                      </div>
                      <ul className="divide-y divide-border">
                        {holidays
                          .filter((h) => h.date.startsWith(y))
                          .map((h) => (
                            <li key={h.date + h.name} className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 text-sm">
                              <span className="flex items-center gap-3">
                                <span className="font-bold tabular-nums">
                                  {new Date(`${h.date}T12:00:00`).toLocaleDateString("en-ZA", {
                                    day: "2-digit",
                                    month: "short",
                                  })}
                                </span>
                                <span className="font-semibold">{h.name}</span>
                              </span>
                              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                                {h.observed && <Badge variant="ink">Observed {h.observed}</Badge>}
                                {h.note && <span>{h.note}</span>}
                                <span className="hidden sm:inline">{weekdayName(h.date)}</span>
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Dates follow the South African Public Holidays Act and include observed dates where a holiday falls on
                    a Sunday. Election days are announced separately and are not listed here.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Container>
      </Section>

      <Section tone="muted" className="pt-16">
        <Container>
          <SectionHeader eyebrow="Keep going" title="More planning resources" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { icon: "truck", title: "Vehicle capacity guide", body: "Payload, volume and pallet counts for every class we run.", href: "/fleet" },
              { icon: "route", title: "Corridor guides", body: "Distances, tolls and pinch points for six main routes.", href: "/corridors" },
              { icon: "book", title: "Resource library", body: "Free regulators, industry bodies, news and mapping tools.", href: "/resources" },
            ].map((r, i) => (
              <Link key={r.href} href={r.href} className="card-hover flex flex-col gap-3 rounded-3xl border border-border bg-card p-7 shadow-soft">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-port text-white dark:bg-amber dark:text-ink">
                  <Icon name={r.icon} className="h-5 w-5" />
                </span>
                <h3 className="text-lg">{r.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold">
                  Open <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCta />
    </>
  );
}
