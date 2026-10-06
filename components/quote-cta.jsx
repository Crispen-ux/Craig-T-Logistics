import { CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { Section, Container, SectionHeader } from "./section";
import LeadForm from "./lead-form";

const points = [
  { icon: Clock, label: "Priced reply within one working day" },
  { icon: CheckCircle2, label: "Route, vehicle and transit confirmed before you commit" },
  { icon: MessageCircle, label: "Prefer WhatsApp? Send the same details and we will quote there" },
];

export default function QuoteCta({ id = "quote", title = "Tell us what you move", lead, showPoints = true }) {
  return (
    <Section id={id} tone="dark" className="overflow-hidden glow-top">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeader
            tone="dark"
            eyebrow="Get a quote"
            title={title}
            lead={lead || "Share your route, load size and monthly volume. We come back with a vehicle type, a transit time and a price — not a call-back request."}
          />
          {showPoints && (
            <ul className="mt-8 space-y-4">
              {points.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3 text-[15px] text-white/75">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-amber" strokeWidth={1.8} />
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <LeadForm />
      </Container>
    </Section>
  );
}
