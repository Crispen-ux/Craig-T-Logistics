import { Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import QuoteCta from "@/components/quote-cta";
import CorridorMap from "@/components/corridor-map";
import { PageHeader } from "@/components/page-parts";
import { buttonVariants } from "@/components/ui/button";
import { branches, hours } from "@/lib/data";
import { brand, wa } from "@/lib/config";
import { towns } from "@/lib/places";

export const metadata = {
  title: "Contact Us",
  description: "Contact Craig-T Logistics for freight quotes, branch details and operating hours — WhatsApp, email or the quote form.",
};

const jhb = towns.find((t) => t.id === "johannesburg");

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        crumbs={[["Contact"]]}
        title="Talk to a dispatcher, not a call centre"
        lead="WhatsApp is fastest for urgent loads. For anything priced or scheduled, use the quote form and you will have an answer within one working day."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={wa()} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "default", size: "lg" })}>
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
          <a href={`mailto:${brand.email}`} className={buttonVariants({ variant: "outline", size: "lg" })}>
            <Mail className="h-4 w-4" /> {brand.email}
          </a>
        </div>
      </PageHeader>

      <Section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            {branches.map((b) => (
              <div key={b.name} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2.5 text-lg">
                  <MapPin className="h-5 w-5 text-amber" /> {b.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {b.addr}
                  <br />
                  {b.phone}
                  <br />
                  {brand.email}
                </p>
              </div>
            ))}

            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h2 className="flex items-center gap-2.5 text-lg">
                <Clock className="h-5 w-5 text-amber" /> Operating hours
              </h2>
              <ul className="mt-4 divide-y divide-border text-sm">
                {hours.map(([day, time]) => (
                  <li key={day} className="flex items-center justify-between gap-4 py-3">
                    <span className="text-muted-foreground">{day}</span>
                    <span className="font-semibold tabular-nums">{time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h2 className="flex items-center gap-2.5 text-lg">
                <Phone className="h-5 w-5 text-amber" /> Direct lines
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <a href={brand.phoneHref} className="font-semibold text-foreground hover:text-amber">
                  {brand.phone}
                </a>
                <br />
                Quotes: <a href={`mailto:${brand.email}`} className="font-semibold text-foreground hover:text-amber">{brand.email}</a>
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <CorridorMap points={[{ name: "Johannesburg head office", lat: jhb.lat, lng: jhb.lng, note: brand.address }]} label="Map showing our Johannesburg location" />
            <p className="mt-3 text-xs text-muted-foreground">
              Drop a pin on the map or send us the Google Maps link of your collection point — that removes half the
              quoting questions.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="muted" className="pt-4">
        <Container className="max-w-3xl text-center">
          <SectionHeader
            align="center"
            eyebrow="Or start here"
            title="Send the load once"
            lead="Everything we need to price your freight is in one form — route, cargo, volume and date."
          />
        </Container>
      </Section>

      <QuoteCta showPoints={false} lead="Fill in the form below and we will reply with a vehicle type, a transit time and a price within one working day." />
    </>
  );
}
