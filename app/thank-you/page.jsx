"use client";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import { PageHeader } from "@/components/page-parts";
import { buttonVariants } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { wa } from "@/lib/config";

const steps = [
  ["We review the route and load", "Vehicle choice, transit time and anything unusual about the collection or delivery point."],
  ["You get a price", "A written quote with what is included, what is not and the delivery window we will commit to."],
  ["Collection is scheduled", "Once you approve, the departure is booked and you get tracking details."],
];

export default function ThankYouPage() {
  useEffect(() => {
    track("lead_submitted");
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Request received"
        crumbs={[["Thank you"]]}
        title="Thank you — we have your request."
        lead="A member of our team is reviewing the route and load now. You will have a price within one working day, usually sooner."
      />

      <Section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeader eyebrow="What happens next" title="Three steps, no chasing" />
            <ol className="mt-8 space-y-5">
              {steps.map(([title, body], i) => (
                <li key={title} className="flex gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-display text-lg font-extrabold">{title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{body}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
                Read our blog <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/tools" className={buttonVariants({ variant: "outline" })}>
                Try the planning tools
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-2xl">In a hurry?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              If the load cannot wait for an email reply, send the same details on WhatsApp and quote the reference you
              received by email. We will pick it up immediately.
            </p>
            <a href={wa("Hi, I just submitted a quote request.")} target="_blank" rel="noopener noreferrer" className={`${buttonVariants({ variant: "ink" })} mt-6`}>
              <MessageCircle className="h-4 w-4" /> Speak to us on WhatsApp
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
