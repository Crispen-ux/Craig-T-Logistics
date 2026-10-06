import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "../../../lib/data";
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));
export const generateMetadata = ({ params }) => { const p = posts.find((x) => x.slug === params.slug); return p ? { title: p.title, description: p.excerpt } : {}; };
export default function Page({ params }) {
  const p = posts.find((x) => x.slug === params.slug); if (!p) notFound();
  return (<><div className="pagehead"><div className="wrap"><small>{p.date}</small><h1 style={{marginTop:8}}>{p.title}</h1></div></div>
    <article className="prose">{p.body.map((t, i) => <p key={i} style={{marginBottom:18}}>{t}</p>)}
      <p><Link href="/#quote" className="btn">Get a quote</Link></p></article></>);
}
