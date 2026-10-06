import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import Reveal from "@/components/reveal";
import QuoteCta from "@/components/quote-cta";
import { PageHeader } from "@/components/page-parts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { vehicles, vehicleNotes } from "@/lib/fleet";

export const metadata = {
  title: "Vehicle & Fleet Capacity Guide",
  description:
    "Payload, volume and pallet capacity for panel vans, rigid trucks, tautliners, super links, flatbeds and containers used for road freight in South Africa.",
};

export default function FleetPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fleet guide"
        crumbs={[["Fleet guide"]]}
        title="Which truck actually fits your load?"
        lead="Payload, volume and pallet positions for every vehicle class we book — so you can size a load before you ask for a price."
      />

      <Section className="py-16">
        <Container>
          <div className="rounded-3xl border border-border bg-card shadow-soft">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle class</TableHead>
                  <TableHead>Payload</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Pallets (single deck)</TableHead>
                  <TableHead className="hidden lg:table-cell">Best for</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((v) => (
                  <TableRow key={v.key}>
                    <TableCell>
                      <span className="font-display font-extrabold">{v.type}</span>
                      <span className="mt-0.5 block max-w-xs text-xs leading-relaxed text-muted-foreground">{v.notes}</span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-semibold tabular-nums">{v.payload}</TableCell>
                    <TableCell className="whitespace-nowrap tabular-nums">{v.volume}</TableCell>
                    <TableCell className="min-w-[160px] text-sm">{v.pallets}</TableCell>
                    <TableCell className="hidden max-w-[240px] text-sm text-muted-foreground lg:table-cell">{v.best}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {vehicleNotes.map((n) => (
              <li key={n} className="rounded-2xl border border-border bg-muted/50 p-4 text-xs leading-relaxed text-muted-foreground">
                {n}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow="How to choose"
            title="Match the vehicle to the constraint, not the habit"
            lead="Loads are limited by mass and by space, and the two rarely run out at the same time."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["Mass-limited", "Dense cargo — beverages, steel, aggregates — runs out of payload first. Choose the smallest vehicle that legally carries the weight and keep the volume as a bonus."],
              ["Volume-limited", "Insulation, empty packaging and light goods run out of space first. A larger vehicle at part load usually costs less than paying twice to move the remainder."],
              ["Both close", "When pallets and weight are both near the limit, send both numbers. We check axle ratings and route mass limits before we commit to a vehicle class."],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber text-ink">
                    <Lightbulb className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 rounded-3xl border border-border bg-card p-7 shadow-soft">
            <Badge variant="ink">Try it</Badge>
            <p className="flex-1 text-sm text-muted-foreground">
              Enter your pallet count and weight in the load planner and get a recommendation in seconds.
            </p>
            <Link href="/tools" className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground hover:brightness-105">
              Open the load planner <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </Section>

      <QuoteCta title="Need a vehicle for this load?" lead="Send the pallet count, weight and both addresses. We confirm the vehicle class, the transit time and the price — usually the same working day." />
    </>
  );
}
