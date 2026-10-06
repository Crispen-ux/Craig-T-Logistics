import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container, Section, SectionHeader } from "./section";
import Reveal from "./reveal";
import { stats } from "@/lib/data";

export function PageHeader({ eyebrow, title, lead, children, crumbs }) {
  return (
    <header className="relative overflow-hidden bg-ink text-white glow-top">
      <div className="grid-lines absolute inset-0 opacity-70" />
      <Container className="relative py-16 sm:py-20">
        {crumbs && (
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/50" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-amber">
              Home
            </Link>
            {crumbs.map(([label, href]) => (
              <span key={label} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                {href ? (
                  <Link href={href} className="hover:text-amber">
                    {label}
                  </Link>
                ) : (
                  <span className="text-white/80">{label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <span className="eyebrow-dark">{eyebrow}</span>}
        <h1 className="mt-5 max-w-4xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{lead}</p>}
        {children}
      </Container>
    </header>
  );
}

export function StatBand({ items = stats, tone = "amber" }) {
  return (
    <section aria-label="Key figures" className={cn("border-y", tone === "amber" ? "bg-primary text-primary-foreground" : "bg-muted")}>
      <Container className="grid divide-y divide-current/15 py-8 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {items.map((s, i) => (
          <Reveal key={s.label} delay={i * 70} className="px-0 py-5 text-center sm:px-6 lg:py-0">
            <p className="font-display text-4xl font-extrabold tracking-tight">{s.value}</p>
            <p className={cn("mt-1 text-sm font-semibold", tone === "amber" ? "text-primary-foreground/75" : "text-muted-foreground")}>
              {s.label}
            </p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

export function CtaBand({ title, lead, primary = ["Get a quote", "/#quote"], secondary, tone = "port" }) {
  return (
    <Section tone={tone} className="glow-top">
      <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl text-white">{title}</h2>
          {lead && <p className="mt-3 text-lg text-white/70">{lead}</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={primary[1]} className="inline-flex h-12 items-center rounded-full bg-primary px-8 text-[15px] font-bold text-primary-foreground transition hover:brightness-105">
            {primary[0]}
          </Link>
          {secondary && (
            <Link
              href={secondary[1]}
              className="inline-flex h-12 items-center rounded-full border-2 border-white/30 px-8 text-[15px] font-bold text-white transition hover:border-white"
            >
              {secondary[0]}
            </Link>
          )}
        </div>
      </Container>
    </Section>
  );
}

export function SectionIntro({ eyebrow, title, lead, cta, ctaHref, align }) {
  return <SectionHeader eyebrow={eyebrow} title={title} lead={lead} cta={cta} ctaHref={ctaHref} align={align} />;
}
