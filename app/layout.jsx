import "./globals.css";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CookieConsent from "@/components/cookie-consent";
import Analytics from "@/components/analytics";
import { brand, wa } from "@/lib/config";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  metadataBase: new URL(brand.site),
  title: { default: "Craig-T Logistics | Long & Short Distance Freight South Africa", template: "%s | Craig-T Logistics" },
  description:
    "Long-distance and short-distance road freight across South Africa. Full loads, part loads, cross-border and container haulage. Get a quote in one working day.",
  keywords: [
    "freight South Africa",
    "road freight Gauteng",
    "long distance haulage",
    "part loads",
    "cross-border freight SADC",
    "logistics Johannesburg",
  ],
  openGraph: {
    siteName: "Craig-T Logistics",
    locale: "en_ZA",
    type: "website",
    url: brand.site,
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport = { themeColor: "#10222E", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en-ZA" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-background font-body text-foreground">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only z-[100] rounded-full bg-amber px-4 py-2 text-sm font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <a
            href={wa()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Craig-T Logistics on WhatsApp"
            className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm4.8 13.6c-.2.6-1.2 1.1-1.7 1.2-.5.1-1 .1-3.1-.7-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.2 1.6 2 1.1.9 2 1.2 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.2.4-.2.6-.1l1.8.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2Z" />
            </svg>
          </a>
          <CookieConsent />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
