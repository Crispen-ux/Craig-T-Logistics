import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/icon";

const tones = {
  default: "bg-background",
  muted: "bg-white dark:bg-card",
  dark: "bg-ink text-white dark:bg-[#08141c]",
  port: "bg-port text-white",
  amber: "bg-primary text-primary-foreground",
  line: "border-y border-border bg-muted/50",
};

export function Section({ id, tone = "default", className, children, ...props }) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-24", tones[tone] || tones.default, className)} {...props}>
      {children}
    </section>
  );
}

export function Container({ className, children }) {
  return <div className={cn("container", className)}>{children}</div>;
}

export function SectionHeader({ eyebrow, title, lead, cta, ctaHref, align = "left", tone = "default", className }) {
  const dark = tone === "dark" || tone === "port";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <span className={dark ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</span>}
      <h2 className={cn("mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]", dark ? "text-white" : "text-foreground")}>{title}</h2>
      {lead && <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-white/70" : "text-muted-foreground")}>{lead}</p>}
      {cta && (
        <div className="mt-7">
          <Link href={ctaHref} className={buttonVariants({ variant: dark ? "default" : "ink", size: "lg" })}>
            {cta} <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Section;
