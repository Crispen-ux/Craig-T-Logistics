"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, MessageCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { services } from "@/lib/data";
import { wa } from "@/lib/config";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme-toggle";

const links = [
  { label: "Corridors", href: "/corridors" },
  { label: "Fleet guide", href: "/fleet" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className={cn("sticky top-0 z-50 border-b border-white/10 bg-ink text-white transition-all duration-300", scrolled ? "shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)]" : "")}>
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="Craig-T Logistics — home" className="flex shrink-0 items-center">
          <img src="/logo-reversed.svg" alt="Craig-T Logistics" className="h-10 w-auto sm:h-11" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <div className="group relative">
            <Link
              href="/services"
              className={cn(
                "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-white/10",
                isActive("/services") && "bg-white/10 text-amber"
              )}
            >
              Services <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute left-0 top-full w-[340px] translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="mt-2 grid gap-1 rounded-2xl border border-white/10 bg-[#0c1c27] p-2 shadow-lift">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="rounded-xl px-3 py-2.5 text-sm leading-tight transition-colors hover:bg-white/10"
                  >
                    <span className="block font-semibold">{s.title}</span>
                    <span className="block text-xs text-white/55">{s.short}</span>
                  </Link>
                ))}
                <Link href="/services" className="rounded-xl bg-white/5 px-3 py-2.5 text-sm font-bold text-amber hover:bg-white/10">
                  View all services →
                </Link>
              </div>
            </div>
          </div>

          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-white/10",
                isActive(l.href) && "bg-white/10 text-amber"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={wa()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "hidden h-9 w-9 rounded-full text-white hover:bg-white/10 sm:inline-flex")}
          >
            <MessageCircle className="h-[18px] w-[18px]" />
          </a>
          <ThemeToggle />
          <Link href="/#quote" className={cn(buttonVariants({ variant: "default", size: "sm" }), "hidden sm:inline-flex")}>
            Get a quote
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full text-white hover:bg-white/10 lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-ink text-white data-[state=open]:duration-300">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <img src="/logo-reversed.svg" alt="Craig-T Logistics" className="mt-1 h-10 w-auto" />
              <nav className="mt-4 grid gap-1 overflow-y-auto">
                <span className="px-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">Services</span>
                {services.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-lg px-2 py-2 text-[15px] font-semibold hover:bg-white/10">
                    {s.title}
                  </Link>
                ))}
                <Separator className="my-3 bg-white/10" />
                <span className="px-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">Explore</span>
                {[...links, { label: "Industries", href: "/industries" }, { label: "FAQ", href: "/faq" }, { label: "Resources", href: "/resources" }].map((l) => (
                  <Link key={l.href} href={l.href} className="rounded-lg px-2 py-2 text-[15px] font-semibold hover:bg-white/10">
                    {l.label}
                  </Link>
                ))}
                <Separator className="my-3 bg-white/10" />
                <div className="grid gap-2 px-2">
                  <Link href="/#quote" className={buttonVariants({ variant: "default" })}>
                    Get a quote
                  </Link>
                  <a href={wa()} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>
                    Chat on WhatsApp
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
