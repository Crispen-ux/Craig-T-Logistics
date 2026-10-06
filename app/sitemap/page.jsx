import Link from "next/link";
import { ArrowRight, FileCode } from "lucide-react";
import { Container, Section } from "@/components/section";
import Reveal from "@/components/reveal";
import QuoteCta from "@/components/quote-cta";
import { PageHeader } from "@/components/page-parts";
import { services, industries, posts } from "@/lib/data";
import { corridors } from "@/lib/corridors";
import { formatKm } from "@/lib/utils";

export const metadata = {
  title: "Site Map",
  description: "Every page on the Craig-T Logistics website — services, corridor guides, tools, articles and legal notices.",
};

const explore = [
  ["Home", "/"],
  ["Get a quote", "/#quote"],
  ["Services overview", "/services"],
  ["Corridor guides", "/corridors"],
  ["Vehicle & fleet guide", "/fleet"],
  ["Planning tools", "/tools"],
  ["Industries we serve", "/industries"],
  ["Frequently asked questions", "/faq"],
];

const company = [
  ["About us", "/about"],
  ["Contact us", "/contact"],
  ["Blog", "/blog"],
  ["Resources", "/resources"],
];

const legal = [
  ["Conditions of carriage", "/terms"],
  ["Privacy notice (POPIA)", "/privacy"],
  ["XML sitemap (for crawlers)", "/sitemap.xml"],
];

export default function SitemapPage() {
  const groups = [
    { title: "Explore", items: explore },
    { title: "Services", items: services.map((s) => [s.title, `/services/${s.slug}`]) },
    { title: "Corridor guides", items: corridors.map((c) => [`${c.title} · ${formatKm(c.km)}`, `/corridors/${c.slug}`]) },
    { title: "Industries", items: industries.map((i) => [i.title, `/industries#${i.slug ?? ""}`]) },
    { title: "Company", items: company },
    { title: "Articles", items: posts.map((p) => [p.title, `/blog/${p.slug}`]) },
    { title: "Legal", items: legal },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Site map"
        crumbs={[["Site map"]]}
        title="Every page on this site"
        lead="A full directory of services, corridor guides, tools, articles and legal notices — or grab the machine-readable XML sitemap."
      >
        <div className="mt-8">
          <Link href="/sitemap.xml" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-bold text-white hover:bg-white/10">
            <FileCode className="h-4 w-4 text-amber" /> XML sitemap
          </Link>
        </div>
      </PageHeader>

      <Section className="py-16">
        <Container>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g, gi) => (
              <Reveal key={g.title} delay={(gi % 3) * 60} className="min-w-0">
                <div className="min-w-0">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-port dark:text-amber">{g.title}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {g.items.map(([label, href]) => (
                      <li key={href + label}>
                        <Link
                          href={href}
                          className="group flex min-h-[44px] max-w-full items-center gap-1.5 text-[15px] text-foreground/85 transition-colors hover:text-amber"
                        >
                          <span className="min-w-0 truncate">{label}</span>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCta showPoints={false} title="Found what you need?" lead="Send the route and the load once — we will come back with the vehicle, the transit time and a price." />
    </>
  );
}
