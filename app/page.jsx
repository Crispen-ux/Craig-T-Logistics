import Link from "next/link";
import Photo from "../components/Photo";
import QuoteSection from "../components/QuoteSection";
import { wa } from "../lib/config";
import { services, posts } from "../lib/data";
const lanes = [["Johannesburg → Durban", "N3 · 570 km", "24h"], ["Johannesburg → Cape Town", "N1 · 1 400 km", "48h"], ["Durban → Gqeberha", "N2 · 960 km", "36h"], ["Johannesburg → Pretoria", "N1 · 60 km", "Same day"], ["Cape Town → Stellenbosch", "N1 · 50 km", "Same day"]];
export default function Home() {
  return (<>
    <section className="hero"><div className="wrap"><div>
      <h1>Freight that arrives when we say it will.</h1>
      <p>Long-distance and short-distance road freight across South Africa. Full loads, part loads and same-day runs, with a priced quote in one working day.</p>
      <div className="row"><a className="btn" href="#quote">Get a quote</a><a className="btn ghost" href={wa()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></div></div>
      <div className="board" role="table" aria-label="Sample corridors"><h3>Sample routes · indicative transit</h3>
        {lanes.map(([a, b, c]) => <div className="lane" role="row" key={a}><b>{a}</b><span>{b}</span><em>{c}</em></div>)}</div></div></section>
    <section id="services"><div className="wrap"><h2>Whether it's 50 km or 1 500 km</h2>
      <p className="lead">One carrier for your local runs and your national routes.</p>
      <div className="svc two">{services.map((s) => <Link href={`/services/${s.slug}`} key={s.slug}><h3>{s.title}</h3><p>{s.short}</p></Link>)}</div></div></section>
    <section style={{paddingTop:0}}><div className="wrap cols"><Photo alt="Craig-T Logistics truck on the road" label="truck photo" /><div><h2>Built on reliability</h2>
      <p className="lead">Tracked vehicles, planned departures and clear communication. You always know where your load is and when it lands.</p><p style={{marginTop:20}}><Link href="/about" className="btn">About us</Link></p></div></div></section>
    <section style={{paddingTop:0}}><div className="wrap"><h2>From the blog</h2><div className="res" style={{marginTop:24}}>{posts.map((p) => <Link key={p.slug} href={`/blog/${p.slug}`}><small>{p.date}</small><h3>{p.title}</h3><span>{p.excerpt}</span></Link>)}</div></div></section>
    <QuoteSection /></>);
}
