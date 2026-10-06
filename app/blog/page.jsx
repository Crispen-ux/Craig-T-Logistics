import Link from "next/link";
import { posts } from "../../lib/data";
export const metadata = { title: "Logistics Blog", description: "Practical freight and logistics advice for South African businesses." };
export default function Page() {
  return (<><div className="pagehead"><div className="wrap"><h1>Logistics blog</h1><p style={{marginTop:12,color:"#C9D6DE"}}>Practical freight advice for South African businesses.</p></div></div>
    <div className="wrap" style={{padding:"56px 24px 88px"}}><div className="res">{posts.map((p) => <Link key={p.slug} href={`/blog/${p.slug}`}><small>{p.date}</small><h3>{p.title}</h3><span>{p.excerpt}</span></Link>)}</div></div></>);
}
