import { cn } from "@/lib/utils";

export default function Photo({ src, alt, label = "photo", className }) {
  if (src) return <img src={src} alt={alt} className={cn("aspect-[4/3] w-full rounded-3xl object-cover", className)} loading="lazy" />;

  return (
    <figure
      role="img"
      aria-label={alt}
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[#e7eef2] via-[#f4f7f8] to-[#dce7ec] dark:from-[#12222d] dark:via-[#16303f] dark:to-[#0d1c26]",
        className
      )}
    >
      <div className="grid-lines absolute inset-0 opacity-40 dark:opacity-60" />
      <svg viewBox="0 0 400 190" className="absolute inset-x-0 bottom-10 mx-auto w-[86%]" aria-hidden="true">
        <rect x="0" y="164" width="400" height="5" fill="#FFB81C" opacity=".6" />
        <rect x="40" y="56" width="212" height="86" rx="4" fill="#0B3A5B" />
        <rect x="40" y="108" width="212" height="8" fill="#FFB81C" />
        <path d="M258 78h58l32 32v32h-90z" fill="#10222E" />
        <path d="M300 86h12l18 22h-30z" fill="#C9D6DE" />
        <g fill="#10222E" stroke="#EEF2F4" strokeWidth="4">
          <circle cx="86" cy="148" r="16" />
          <circle cx="126" cy="148" r="16" />
          <circle cx="300" cy="148" r="16" />
        </g>
      </svg>
      <figcaption className="absolute inset-x-0 bottom-4 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        Add real {label} · public/photos/
      </figcaption>
    </figure>
  );
}
