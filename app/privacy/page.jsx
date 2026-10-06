import { Container, Section } from "@/components/section";
import { PageHeader } from "@/components/page-parts";
import { brand } from "@/lib/config";

export const metadata = {
  title: "Privacy Notice (POPIA)",
  description: `How ${brand.name} collects, uses and protects personal information under POPIA, including cookies and analytics.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        crumbs={[["Privacy notice"]]}
        title="Privacy notice"
        lead="How we collect, use and protect your personal information under the Protection of Personal Information Act."
      />

      <Section className="py-16">
        <Container>
          <article className="prose-site">
            <p className="rounded-2xl border-l-4 border-amber bg-card p-5 text-sm text-muted-foreground">
              {brand.name} is a responsible party under the Protection of Personal Information Act 4 of 2013 (POPIA).
              Replace the placeholders below with your registered details and have a legal practitioner review this
              notice before launch.
            </p>

            <h2>What we collect</h2>
            <p>
              Name, company, email address, phone number, collection and delivery locations, cargo details and anything
              else you tell us in the quote form or on WhatsApp. We also keep basic technical data — IP address,
              browser and the pages you visit — for security and to understand how the site is used.
            </p>

            <h2>Why we collect it</h2>
            <ul>
              <li>To prepare and send freight quotes and to perform a booking you accept</li>
              <li>To contact you about an enquiry, a delivery or a claim</li>
              <li>To invoice you and keep the financial records the law requires</li>
              <li>To prevent spam, abuse and fraudulent submissions</li>
            </ul>

            <h2>Cookies and analytics</h2>
            <p>
              Necessary cookies keep the site working, remember your consent choice and protect the quote form from
              spam. Analytics cookies load only if you accept them in the banner that appears on your first visit, and
              they stop if you withdraw consent. You can change your choice at any time by clearing this site's data in
              your browser.
            </p>

            <h2>Sharing and retention</h2>
            <p>
              We share information only with service providers who help us respond — email delivery, hosting and, where
              a load crosses a border, licensed clearing agents. We do not sell personal information. Enquiry data is
              deleted when it is no longer needed for the purpose it was collected for, or when the law requires it.
            </p>

            <h2>Your rights</h2>
            <p>
              You may ask us to access, correct or delete your information, or object to its processing. Contact our{" "}
              {brand.officer} at <a href={`mailto:${brand.email}`}>{brand.email}</a>. You may also lodge a complaint with
              the Information Regulator at inforeg.org.za.
            </p>

            <h2>Security</h2>
            <p>
              Access to enquiry data is limited to the people who need it to answer you. Transmissions to this site are
              encrypted, and the quote form includes rate limiting and bot protection.
            </p>
          </article>
        </Container>
      </Section>
    </>
  );
}
