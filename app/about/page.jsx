import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import Reveal from "@/components/reveal";
import QuoteCta from "@/components/quote-cta";
import Photo from "@/components/photo";
import { PageHeader, StatBand } from "@/components/page-parts";
import { buttonVariants } from "@/components/ui/button";
import { features, teamRoles, milestones } from "@/lib/data";

export const metadata = {
  title: "About Us",
  description:
    "Craig-T Logistics is a South African road freight company moving cargo over long and short distances, with tracked vehicles and planned departures.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        crumbs={[["About"]]}
        title="A carrier you can plan around"
        lead="We move freight over long and short distances across South Africa, and we treat every load as if it were our own — because a late delivery costs you more than it costs us."
      />

      <StatBand />

      <Section>
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader eyebrow="Our story" title="Built from the first load forward" />
            <div className="prose-site mt-7">
              <p>
                Craig-T Logistics exists for one reason: shippers should know where their freight is and when it lands,
                without chasing a dispatcher for an answer.
              </p>
              <p>
                {milestones.map((m, i) => (
                  <span key={m.title} className="block">
                    <strong>{m.title}.</strong> {m.body}
                  </span>
                ))}
              </p>
            </div>
            <div className="mt-7">
              <Link href="/corridors" className={buttonVariants({ variant: "ink" })}>
                See the corridors we run <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <Reveal delay={80}>
            <Photo alt="Craig-T Logistics depot" label="depot photo" />
          </Reveal>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow="How we work"
            title="The standards behind every booking"
            lead="Nothing here is aspirational. These are the commitments your quote is built on."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 70}>
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <h3 className="text-lg">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Fleet"
            title="Vehicles matched to the load"
            lead="From a panel van for urgent spares to a super link for high-volume corridors — we book the smallest vehicle that legally and safely carries your freight."
            cta="Vehicle capacity guide"
            ctaHref="/fleet"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Panel van & bakkie", "Urgent small freight"],
              ["Rigid trucks, 3 – 10 t", "Local and regional rounds"],
              ["Tautliner & super link", "National full loads"],
              ["Flatbed, tipper & reefer", "Bulk, oversize and cold chain"],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="text-base font-bold">{title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="line">
        <Container>
          <SectionHeader
            eyebrow="The team"
            title="The people on your load"
            lead="Add names, photos and short bios — the structure below is ready for them."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamRoles.map((role, i) => (
              <Reveal key={role} delay={i * 60}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
                  <Photo alt={role} label={`${role.toLowerCase()} photo`} className="aspect-square rounded-2xl" />
                  <h3 className="mt-4 text-base font-bold">Name Surname</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCta title="Ready to ship with us?" lead="Send the route and load once — we will come back with the vehicle, the transit time and the price." />
    </>
  );
}
