"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { towns } from "@/lib/places";
import { services } from "@/lib/data";

const SITE = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const volumes = ["1–10", "11–50", "51–200", "200+"];
const weights = ["Under 1 ton", "1–5 tons", "5–20 tons", "Full truck (20+ tons)"];

export default function LeadForm() {
  const router = useRouter();
  const t0 = useRef(Date.now());
  const [state, setState] = useState({ t: "idle", m: "" });
  const [d, setD] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    volume: "",
    weight: "",
    service: "",
    notes: "",
  });
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");

  useEffect(() => {
    if (!SITE) return;
    const el = document.createElement("script");
    el.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    el.async = true;
    document.body.appendChild(el);
    return () => el.remove();
  }, []);

  const upd = (e) => setD((p) => ({ ...p, [e.target.name]: e.target.value }));
  const setSel = (k) => (v) => setD((p) => ({ ...p, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    if (!consent) return;
    setState({ t: "busy", m: "" });
    const payload = {
      ...d,
      consent,
      website: hp,
      elapsed: Date.now() - t0.current,
      ...(typeof document !== "undefined" && document.querySelector("[name=cf-turnstile-response]")
        ? { "cf-turnstile-response": document.querySelector("[name=cf-turnstile-response]").value }
        : {}),
    };
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Something went wrong.");
      router.push("/thank-you");
    } catch (x) {
      setState({ t: "err", m: x.message });
    }
  }

  const busy = state.t === "busy";

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-3xl bg-white p-6 text-ink shadow-lift sm:p-8 dark:bg-card dark:text-card-foreground">
      <datalist id="towns">
        {towns.map((t) => (
          <option key={t.id} value={t.name} />
        ))}
      </datalist>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <Input name="name" required autoComplete="name" value={d.name} onChange={upd} placeholder="Your name" />
        </Field>
        <Field label="Company">
          <Input name="company" required autoComplete="organization" value={d.company} onChange={upd} placeholder="Company name" />
        </Field>
        <Field label="Work email">
          <Input name="email" type="email" required autoComplete="email" value={d.email} onChange={upd} placeholder="you@company.co.za" />
        </Field>
        <Field label="Mobile / WhatsApp">
          <Input name="phone" type="tel" required autoComplete="tel" value={d.phone} onChange={upd} placeholder="082 123 4567" />
        </Field>
        <Field label="Collection town">
          <Input name="from" required list="towns" value={d.from} onChange={upd} placeholder="Johannesburg" />
        </Field>
        <Field label="Delivery town / country">
          <Input name="to" required list="towns" value={d.to} onChange={upd} placeholder="Durban" />
        </Field>
        <Field label="Shipments per month">
          <Select value={d.volume} onValueChange={setSel("volume")}>
            <SelectTrigger aria-label="Shipments per month">
              <SelectValue placeholder="Select volume" />
            </SelectTrigger>
            <SelectContent>
              {volumes.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Average load">
          <Select value={d.weight} onValueChange={setSel("weight")}>
            <SelectTrigger aria-label="Average load">
              <SelectValue placeholder="Select load size" />
            </SelectTrigger>
            <SelectContent>
              {weights.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Service needed">
        <Select value={d.service} onValueChange={setSel("service")}>
          <SelectTrigger aria-label="Service needed">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.slug} value={s.title}>
                {s.title}
              </SelectItem>
            ))}
            <SelectItem value="Not sure yet">Not sure yet</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field label="Anything we should know? (optional)">
        <Textarea name="notes" rows={3} value={d.notes} onChange={upd} placeholder="Pallet count, delivery date, access constraints, fork-on-site…" />
      </Field>

      <div className="sr-only" aria-hidden="true">
        <label>
          Leave blank
          <input name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      {SITE && <div className="cf-turnstile" data-sitekey={SITE} />}

      <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-3.5">
        <Checkbox id="consent" checked={consent} onCheckedChange={setConsent} className="mt-0.5" />
        <Label htmlFor="consent" className="font-normal leading-relaxed text-muted-foreground">
          I agree to Craig-T Logistics processing my details to prepare a quote, as set out in the{" "}
          <a href="/privacy" className="font-semibold text-ink underline decoration-amber decoration-2 underline-offset-2 dark:text-amber">
            privacy notice
          </a>
          .
        </Label>
      </div>

      <Button type="submit" size="lg" disabled={busy || !consent} className="w-full">
        {busy ? (
          <>
            <Loader2 className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Request my quote <Send className="h-4 w-4" />
          </>
        )}
      </Button>

      {state.m && (
        <p role="status" className="text-center text-sm font-semibold text-destructive">
          {state.m}
        </p>
      )}
      <p className="text-center text-xs text-muted-foreground">We reply with a priced quote within one working day.</p>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <Label className="grid gap-1.5 text-ink dark:text-foreground">
      <span className="text-[13px] font-bold">{label}</span>
      {children}
    </Label>
  );
}
