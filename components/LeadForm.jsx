"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
const SITE = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
export default function LeadForm() {
  const [s, setS] = useState({ t: "idle", m: "" });
  const router = useRouter();
  const t0 = useRef(Date.now());
  useEffect(() => {
    if (!SITE) return;
    const el = document.createElement("script"); el.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"; el.async = true; document.body.appendChild(el);
  }, []);
  async function submit(e) {
    e.preventDefault(); const f = e.target; setS({ t: "busy", m: "" });
    const body = Object.fromEntries(new FormData(f)); body.elapsed = Date.now() - t0.current;
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Something went wrong.");
      f.reset(); router.push("/thank-you");
    } catch (x) { setS({ t: "err", m: x.message }); }
  }
  const sel = (n, l, o) => <label>{l}<select name={n} required defaultValue=""><option value="" disabled>Select</option>{o.map((x) => <option key={x}>{x}</option>)}</select></label>;
  return (
    <form onSubmit={submit}>
      <label>Full name<input name="name" required autoComplete="name" /></label>
      <label>Company<input name="company" required autoComplete="organization" /></label>
      <label>Work email<input name="email" type="email" required autoComplete="email" /></label>
      <label>Mobile / WhatsApp<input name="phone" type="tel" required placeholder="082 123 4567" autoComplete="tel" /></label>
      <label>Collection town<input name="from" required placeholder="Johannesburg" /></label>
      <label>Delivery town / country<input name="to" required placeholder="Durban" /></label>
      {sel("volume", "Shipments per month", ["1–10", "11–50", "51–200", "200+"])}
      {sel("weight", "Average load", ["Under 1 ton", "1–5 tons", "5–20 tons", "Full truck (20+ tons)"])}
      {sel("service", "Service", ["Long-distance haulage", "Short-distance & local", "Full truck loads", "Part loads", "Not sure yet"])}
      <div className="hp" aria-hidden="true"><label>Leave blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {SITE && <div className="cf-turnstile full" data-sitekey={SITE} />}
      <label className="chk full"><input type="checkbox" name="consent" required /><span>I agree to Craig-T Logistics processing my details to prepare a quote, as set out in the <a href="/privacy">privacy notice</a>.</span></label>
      <button className="btn full" disabled={s.t === "busy"}>{s.t === "busy" ? "Sending…" : "Request my quote"}</button>
      {s.m && <p className={`msg ${s.t === "ok" ? "ok" : "err"}`} role="status">{s.m}</p>}
    </form>);
}
