import { NextResponse } from "next/server";
const hits = new Map(); // per-instance limiter; use Upstash/Redis in production
const esc = (s) => String(s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const now = Date.now(), recent = (hits.get(ip) || []).filter((t) => now - t < 3600e3);
  if (recent.length >= 5) return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  hits.set(ip, [...recent, now]);
  let d; try { d = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (d.website) return NextResponse.json({ ok: true }); // honeypot: pretend success
  if (!(d.elapsed > 2500)) return NextResponse.json({ error: "Please take a moment to complete the form." }, { status: 400 });
  const need = ["name", "company", "email", "phone", "from", "to", "volume", "weight", "service"];
  if (need.some((k) => !d[k] || String(d[k]).length > 200) || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email) || !d.consent)
    return NextResponse.json({ error: "Please complete all fields and accept the privacy notice." }, { status: 400 });
  if (process.env.TURNSTILE_SECRET_KEY) {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: d["cf-turnstile-response"] || "", remoteip: ip }) });
    if (!(await r.json()).success) return NextResponse.json({ error: "Bot check failed. Please retry." }, { status: 400 });
  }
  const rows = need.map((k) => `<tr><td><b>${k}</b></td><td>${esc(d[k])}</td></tr>`).join("");
  if (process.env.RESEND_API_KEY) {
    const r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.LEADS_FROM_EMAIL, to: process.env.LEADS_TO_EMAIL, reply_to: d.email, subject: `New lead: ${esc(d.company)} (${esc(d.volume)}/mo)`, html: `<table>${rows}</table>` }) });
    if (!r.ok) return NextResponse.json({ error: "Could not send. Please WhatsApp us instead." }, { status: 502 });
  } else console.log("LEAD", d);
  return NextResponse.json({ ok: true });
}
