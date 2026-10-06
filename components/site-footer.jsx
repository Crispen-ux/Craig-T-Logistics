import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { services } from "@/lib/data";
import { brand, wa } from "@/lib/config";

const company = [
  ["About us", "/about"],
  ["Industries we serve", "/industries"],
  ["Blog", "/blog"],
  ["Resources", "/resources"],
  ["Frequently asked questions", "/faq"],
  ["Contact", "/contact"],
];

const guides = [
  ["Corridor guides", "/corridors"],
  ["Vehicle & fleet guide", "/fleet"],
  ["Transit & load tools", "/tools"],
  ["All services", "/services"],
  ["Site map", "/sitemap"],
  ["Conditions of carriage", "/terms"],
  ["Privacy notice (POPIA)", "/privacy"],
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="container grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <img src="/logo-reversed.svg" alt="Craig-T Logistics" className="h-12 w-auto" />
          <p className="mt-5 text-sm leading-relaxed text-white/60">
            Long-distance and short-distance road freight across South Africa, with scheduled departures, tracked vehicles
            and a quoted price before anything moves.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              {brand.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-amber" />
              <a href={brand.phoneHref} className="hover:text-amber">
                {brand.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-amber" />
              <a href={`mailto:${brand.email}`} className="hover:text-amber">
                {brand.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/#quote" className={buttonVariants({ variant: "default", size: "sm" })}>
              Get a quote
            </Link>
            <a href={wa()} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <FooterColumn title="Services" items={services.map((s) => [s.title, `/services/${s.slug}`])} />
        <FooterColumn title="Company" items={company} />
        <FooterColumn title="Guides & tools" items={guides} />
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-4 py-6 pb-24 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p className="max-w-xl">
            Distances and transit times shown on this site are indicative planning estimates and are confirmed per load.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber">{title}</h3>
      <ul className="mt-4 space-y-1 text-sm text-white/70">
        {items.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="flex min-h-[44px] items-center transition-colors hover:text-amber">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
