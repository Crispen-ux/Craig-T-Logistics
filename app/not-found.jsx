import Link from "next/link";
import { Compass } from "lucide-react";
import { Container } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { corridors } from "@/lib/corridors";
import { formatKm } from "@/lib/utils";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="grid-lines absolute inset-0" />
      <div className="glow-top absolute inset-0" />
      <Container className="relative py-24 sm:py-32">
        <span className="eyebrow-dark">404</span>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02]">
          This route doesn&apos;t exist. Let&apos;s get you back on the road.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/70">
          The page you were looking for has moved or never existed. Pick a corridor below, or head straight to the quote
          form.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className={buttonVariants({ variant: "default", size: "lg" })}>
            Back to home
          </Link>
          <Link href="/#quote" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Get a quote
          </Link>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {corridors.slice(0, 3).map((c) => (
            <Link
              key={c.slug}
              href={`/corridors/${c.slug}`}
              className="card-hover flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <span>
                <span className="block font-display font-extrabold">{c.title}</span>
                <span className="block text-sm text-white/55">
                  {c.route} · {formatKm(c.km)}
                </span>
              </span>
              <Compass className="h-5 w-5 text-amber" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
