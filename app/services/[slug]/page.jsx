import { notFound } from "next/navigation";
import Link from "next/link";
import Photo from "../../../components/Photo";
import QuoteSection from "../../../components/QuoteSection";
import { services } from "../../../lib/data";
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));
export const generateMetadata = ({ params }) => { const s = services.find((x) => x.slug === params.slug); return s ? { title: `${s.title} South Africa`, description: s.intro } : {}; };
export default function Page({ params }) {
  const s = services.find((x) => x.slug === params.slug); if (!s) notFound();
  return (<><div className="pagehead"><div className="wrap"><h1>{s.title}</h1><p style={{marginTop:12,color:"#C9D6DE",maxWidth:"56ch"}}>{s.intro}</p></div></div>
    <section><div className="wrap cols"><div><h2>What you get</h2><ul className="tick">{s.pts.map((p) => <li key={p}>{p}</li>)}</ul></div><Photo alt={s.title} label={`${s.title} photo`} /></div></section>
    <section style={{paddingTop:0}}><div className="wrap"><h2>Other services</h2><div className="svc two">{services.filter((x) => x.slug !== s.slug).map((o) => <Link href={`/services/${o.slug}`} key={o.slug}><h3>{o.title}</h3><p>{o.short}</p></Link>)}</div></div></section>
    <QuoteSection title={`Get a ${s.title.toLowerCase()} quote`} /></>);
}
