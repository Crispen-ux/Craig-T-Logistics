import { Container, Section } from "@/components/section";
import QuoteCta from "@/components/quote-cta";
import { PageHeader } from "@/components/page-parts";
import { brand } from "@/lib/config";

export const metadata = {
  title: "Conditions of Carriage",
  description:
    "The terms under which Craig-T Logistics quotes, carries and delivers goods by road in South Africa — bookings, liability, claims, payment and cross-border loads.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        crumbs={[["Conditions of carriage"]]}
        title="Conditions of carriage"
        lead="The terms that apply to every quotation, booking and load we carry for you."
      />

      <Section className="py-16">
        <Container>
          <article className="prose-site">
            <p className="rounded-2xl border-l-4 border-amber bg-card p-5 text-sm text-muted-foreground">
              This document is a working template for {brand.name}. Have a legal practitioner review and adapt it to
              your actual trading terms, insurance arrangements and operating permits before launch.
            </p>

            <h2>1. Application</h2>
            <p>
              These conditions apply to all goods carried by road for you by {brand.name}, whether carried occasionally or
              under a regular trading arrangement. Any quotation we issue and any booking you accept is subject to these
              conditions. Terms you put on your own order or purchase documents do not apply unless we accept them in
              writing.
            </p>

            <h2>2. Quotations and bookings</h2>
            <p>
              A quotation is based on the details you give us: addresses, cargo description, weight, volume, number of
              units, loading and offloading arrangements and the required delivery date. If any of those details change,
              the price and the transit time may change with them. A booking is confirmed only when we accept it in
              writing.
            </p>

            <h2>3. Your obligations</h2>
            <ul>
              <li>Describe the goods accurately, including any dangerous, fragile, perishable or high-value nature.</li>
              <li>Package and secure the goods so that they survive normal handling, stacking and transit movement.</li>
              <li>Load and secure the cargo safely, or tell us in advance if you need us to arrange loading or securing.</li>
              <li>Supply correct consignee details, delivery windows and access information before collection.</li>
              <li>Provide export or cross-border documentation in good time where the load crosses a border.</li>
            </ul>

            <h2>4. Delivery times</h2>
            <p>
              Transit times and delivery dates are estimates until confirmed in a booking. We are not liable for delay
              caused by weather, road closures, strikes, port or terminal congestion, government action, mechanical
              failure or any other event beyond our reasonable control. We will tell you as soon as we know a delivery
              will be late, and we will propose a recovery plan.
            </p>

            <h2>5. Loading, waiting and demurrage</h2>
            <p>
              A booking includes a standard allowance for loading and offloading. Time beyond that allowance, including
              waiting at a terminal, a site or a border post, is charged at the hourly rate stated in the quotation or,
              if none is stated, at our published waiting rate. Terminal, toll and border charges are for your account
              unless the quotation says otherwise.
            </p>

            <h2>6. Insurance and liability</h2>
            <p>
              Our liability is limited as permitted under the laws applicable to road carriage in South Africa, including
              the legal liability of a carrier. This is not all-risks insurance. Comprehensive cover can be arranged on
              request when you declare the full value of the cargo at the time of booking; if no cover is purchased, you
              remain responsible for your own cargo risk.
            </p>

            <h2>7. Claims</h2>
            <ul>
              <li>Visible damage or loss must be noted on the consignment note or proof of delivery at the time of delivery.</li>
              <li>Written notice of any claim must reach us within the period stated in the applicable carriage legislation.</li>
              <li>Photographs, packing lists and values must be supplied with the claim so it can be assessed.</li>
              <li>Freight charges must be paid up to date before a claim is settled.</li>
            </ul>

            <h2>8. Cross-border loads</h2>
            <p>
              For loads crossing a South African border you are the importer or exporter of record unless we agree
              otherwise in writing. Customs duties, VAT, clearing fees, certificates of origin and permits are your
              responsibility, and you must supply the documents early enough for a licensed clearing agent to lodge the
              entry before collection.
            </p>

            <h2>9. Payment</h2>
            <p>
              Accounts are settled according to the terms on the invoice. One-off shippers may be required to pay a
              deposit before collection or the balance before delivery. Late payment carries interest at the prescribed
              rate, and we may suspend accounts that fall into arrears.
            </p>

            <h2>10. Lien</h2>
            <p>
              We may retain any goods in our possession until all charges due to us for that consignment and for other
              loads have been paid, and may sell retained goods after giving notice if the charges remain unpaid.
            </p>

            <h2>11. Data protection</h2>
            <p>
              We process personal information in line with the Protection of Personal Information Act. Our privacy
              notice explains what we collect, why we collect it and how you can ask us to correct or delete it.
            </p>

            <h2>12. Governing law</h2>
            <p>
              These conditions are governed by the law of South Africa, and the courts of Gauteng have jurisdiction over
              any dispute arising from them.
            </p>
          </article>
        </Container>
      </Section>

      <QuoteCta title="Ready to book?" lead="Send the load details and we will confirm the price, the vehicle and the delivery window in writing." showPoints={false} />
    </>
  );
}
