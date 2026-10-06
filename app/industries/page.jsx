import { Check } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import Reveal from "@/components/reveal";
import QuoteCta from "@/components/quote-cta";
import { PageHeader } from "@/components/page-parts";
import { Icon } from "@/components/icon";
import { industries } from "@/lib/data";

export const metadata = {
  title: "Industries We Serve",
  description:
    "Freight for retail and FMCG, mining and aggregate, agriculture, construction, automotive and manufacturing in South Africa.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        crumbs={[["Industries"]]}
        title="Freight that understands your cargo"
        lead="The same truck can be perfect for one business and a disaster for another. We plan around the constraint that actually matters for your sector."
      />

      <Section tone="muted" className="py-16">
        <Container className="grid gap-7 lg:grid-cols-2">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 2) * 70}>
              <article id={ind.slug} className="card-hover h-full scroll-mt-24 rounded-3xl border border-border bg-card p-8 shadow-soft">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-port text-white dark:bg-amber dark:text-ink">
                  <Icon name={ind.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-2xl">{ind.title}</h2>
                <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">{ind.blurb}</p>
                <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                  {ind.pts.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" strokeWidth={3} />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="How we quote"
            title="Sector detail goes into the price"
            lead="Whether it is a delivery window, a temperature record or a site that only accepts deliveries after 14:00, the constraint is priced up front — not invoiced later as a surprise."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              ["Tell us the constraint", "Windows, temperature, height limits, offloading equipment, security clearance."],
              ["We plan around it", "Vehicle choice, departure timing and the route are set with that constraint in mind."],
              ["You get it in writing", "The quote states what is included, what is not and the delivery window we commit to."],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <span className="font-display text-4xl font-extrabold text-amber">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCta title="Tell us about your cargo" lead="Sector, commodity, handling requirements and delivery windows — the more we know, the tighter the price." />
    </>
  );
}
