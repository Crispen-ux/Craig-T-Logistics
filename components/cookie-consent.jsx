"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cookie-consent")) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const save = (withAnalytics) => {
    try {
      localStorage.setItem(
        "cookie-consent",
        JSON.stringify({ necessary: true, analytics: withAnalytics, at: new Date().toISOString() })
      );
    } catch {}
    window.dispatchEvent(new Event("consent-updated"));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      className="fixed bottom-4 left-4 right-4 z-50 max-w-lg rounded-3xl border border-border bg-card p-6 shadow-lift sm:right-auto"
    >
      <h2 id="cookie-title" className="font-display text-lg font-extrabold">
        Your privacy, your choice
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        We use necessary cookies to run this site. With your permission we also load analytics cookies so we can see what
        is useful. Read the <Link href="/privacy" className="font-semibold text-foreground underline decoration-amber decoration-2 underline-offset-2">privacy notice</Link>.
      </p>

      {prefs && (
        <div className="mt-4 space-y-2.5 rounded-xl border border-border bg-muted/50 p-3.5">
          <div className="flex items-center gap-3 text-sm">
            <Checkbox checked disabled aria-label="Necessary cookies, always on" />
            <span className="font-semibold">Necessary — always on</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Checkbox id="cc-analytics" checked={analytics} onCheckedChange={(v) => setAnalytics(!!v)} />
            <Label htmlFor="cc-analytics" className="font-semibold">
              Analytics
            </Label>
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2.5">
        <Button size="sm" onClick={() => save(true)}>
          Accept all
        </Button>
        <Button size="sm" variant="outline" onClick={() => save(false)}>
          Reject non-essential
        </Button>
        {prefs ? (
          <Button size="sm" variant="secondary" onClick={() => save(analytics)}>
            Save choices
          </Button>
        ) : (
          <Button size="sm" variant="secondary" onClick={() => setPrefs(true)}>
            Customise
          </Button>
        )}
      </div>
    </div>
  );
}
