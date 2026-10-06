import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/section";
import Resources from "@/components/resources";
import QuoteCta from "@/components/quote-cta";
import Reveal from "@/components/reveal";
import { PageHeader } from "@/components/page-parts";
import { buttonVariants } from "@/components/ui/button";
import { downloads } from "@/lib/data";

export const metadata = {
  title: "Logistics Resources South Africa",
  description:
    "Free regulators, industry bodies, news, research and mapping tools used by South African freight shippers — plus our freight checklist PDF.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        crumbs={[["Resources"]]}
        title="Free tools, references and checklists"
        lead="Everything we use to plan, quote and run freight in South Africa — regulators, industry bodies, news, research and free mapping tools."
      />

      <Section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {downloads.map((d, i) => (
              <Reveal key={d.href} delay={i * 70}>
                <div className="flex h-full flex-col rounded-3xl border-2 border-amber bg-primary/10 p-8">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-ink">
                    <Download className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-2xl">{d.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <a href={d.href} download className={buttonVariants({ variant: "ink" })}>
                      <Download className="h-4 w-4" /> Download
                    </a>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{d.meta}</span>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={140}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-soft">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-port text-white">
                  <ArrowRight className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-2xl">Planning calculators</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  Transit times, load sizing and South African public holidays — three free tools that answer most
                  first-pass questions before you contact us.
                </p>
                <div className="mt-6">
                  <Link href="/tools" className={buttonVariants({ variant: "default" })}>
                    Open the tools <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="muted" className="pt-4">
        <Container>
          <SectionHeader
            eyebrow="Directory"
            title="Where we look things up"
            lead="Regulators, industry bodies, newsrooms, research and free geospatial tools — all free to access."
          />
          <div className="mt-10">
            <Resources />
          </div>
        </Container>
      </Section>

      <QuoteCta showPoints={false} />
    </>
  );
}
