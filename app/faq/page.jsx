import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import QuoteCta from "@/components/quote-cta";
import FaqList from "@/components/faq-list";
import { PageHeader } from "@/components/page-parts";
import { buttonVariants } from "@/components/ui/button";
import { faqs } from "@/lib/data";
import { brand, wa } from "@/lib/config";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Quotes, pricing, tracking, cross-border freight, claims, payment terms and delivery windows — answered before you book.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        crumbs={[["FAQ"]]}
        title="Straight answers before you book"
        lead="Everything shippers ask us in the first week of working together. If yours is not here, a person will answer it on WhatsApp or by email."
      />

      <Section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeader eyebrow="Questions" title="Quotes, operations and claims" />
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={wa()} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "ink" })}>
                <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
              </a>
              <a href={`mailto:${brand.email}`} className={buttonVariants({ variant: "outline" })}>
                <Mail className="h-4 w-4" /> Email us
              </a>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Prefer the detail in writing? The conditions of carriage set out liability, claims periods and payment
              terms in full.
            </p>
            <Link
              href="/terms"
              className="mt-2 inline-block text-sm font-bold underline decoration-amber decoration-2 underline-offset-4"
            >
              Read the conditions of carriage
            </Link>
          </div>

          <FaqList items={faqs} className="rounded-3xl border border-border bg-card px-6 shadow-soft" />
        </Container>
      </Section>

      <QuoteCta />
    </>
  );
}
