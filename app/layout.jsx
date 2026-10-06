import "./globals.css";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import Link from "next/link";
import Nav from "../components/Nav";
import CookieConsent from "../components/CookieConsent";
import Analytics from "../components/Analytics";
import { brand, wa } from "../lib/config";
const d = Bricolage_Grotesque({ subsets: ["latin"], variable: "--display" });
const b = DM_Sans({ subsets: ["latin"], variable: "--body" });
export const metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://craigtlogistics.co.za"), title: { default: "Craig-T Logistics | Long & Short Distance Freight South Africa", template: "%s | Craig-T Logistics" },
  description: "Long-distance and short-distance road freight across South Africa. Full loads, part loads and reliable delivery. Get a quote in one working day.", openGraph: { siteName: "Craig-T Logistics", locale: "en_ZA", type: "website" },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }, { url: "/icon.png", type: "image/png", sizes: "512x512" }], apple: "/apple-icon.png" } };
export default function Root({ children }) {
  return (<html lang="en-ZA" className={`${d.variable} ${b.variable}`}><body>
    <Nav /><main>{children}</main>
    <footer><div className="wrap"><div><img className="logoimg" src="/logo-reversed.svg" alt="Craig-T Logistics" /><br/>{brand.address}<br/>{brand.phone} · {brand.email}</div>
      <div><Link href="/about">About</Link><br/><Link href="/blog">Blog</Link><br/><Link href="/contact">Contact</Link><br/><Link href="/privacy">Privacy &amp; POPIA</Link><br/>© {new Date().getFullYear()} {brand.name}</div></div></footer>
    <a className="wabtn" href={wa()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm4.800 13.600c-.2.600-1.200 1.100-1.700 1.200-.5.100-1 .1-3.100-.7-2.600-1.100-4.300-3.800-4.400-4-.1-.2-1-1.400-1-2.600s.6-1.800.9-2.100c.2-.2.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 1.900c.1.200.1.400 0 .5l-.4.600c-.1.200-.3.300-.1.600.2.300.8 1.200 1.600 2 1.100.9 2 1.200 2.300 1.400.3.100.5.100.6-.1l.9-1c.2-.2.400-.2.600-.1l1.800.9c.3.100.5.200.5.300.1.200.1.700-.1 1.200Z"/></svg></a>
    <CookieConsent /><Analytics /></body></html>);
}
