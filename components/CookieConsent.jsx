"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function CookieConsent() {
  const [open, setOpen] = useState(false), [prefs, setPrefs] = useState(false), [an, setAn] = useState(false);
  useEffect(() => { try { if (!localStorage.getItem("cookie-consent")) setOpen(true); } catch { setOpen(true); } }, []);
  const save = (analytics) => { try { localStorage.setItem("cookie-consent", JSON.stringify({ necessary: true, analytics, at: new Date().toISOString() })); } catch {} window.dispatchEvent(new Event("consent-updated")); setOpen(false); };
  if (!open) return null;
  return (<div className="cc" role="dialog" aria-labelledby="cch"><h3 id="cch">Your privacy, your choice</h3>
    <p>We use necessary cookies to run this site. With your permission we also use analytics cookies to improve it. See our <Link href="/privacy">privacy notice</Link>.</p>
    {prefs && <p><label className="chk"><input type="checkbox" checked disabled /> Necessary (always on)</label><label className="chk"><input type="checkbox" checked={an} onChange={(e) => setAn(e.target.checked)} /> Analytics</label></p>}
    <div className="row"><button className="btn" onClick={() => save(true)}>Accept all</button><button className="btn ghost" onClick={() => save(false)}>Reject non-essential</button>
      {prefs ? <button className="btn ghost" onClick={() => save(an)}>Save choices</button> : <button className="btn ghost" onClick={() => setPrefs(true)}>Customise</button>}</div></div>);
}
