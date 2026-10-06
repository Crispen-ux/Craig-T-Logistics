"use client";
import { useEffect } from "react";
import Link from "next/link";
import { wa } from "../../lib/config";
import { track } from "../../lib/analytics";
export default function Page() {
  useEffect(() => { track("lead_submitted"); }, []);
  return (<><div className="pagehead"><div className="wrap"><h1>Thank you. We have your request.</h1></div></div>
    <article className="prose"><p>A member of our team will send your quote within one working day.</p>
      <h2>What happens next</h2><ul><li>We review your route and load details</li><li>We contact you by email or WhatsApp with a price</li><li>You approve and we schedule collection</li></ul>
      <p style={{marginTop:28}} className="row"><a className="btn" href={wa("Hi, I just submitted a quote request.")} target="_blank" rel="noopener noreferrer">Speak to us on WhatsApp</a><Link className="btn ghost" style={{color:"#10222E"}} href="/blog">Read our blog</Link></p></article></>);
}
