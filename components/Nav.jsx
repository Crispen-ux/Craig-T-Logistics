import Link from "next/link";
const L = [["Services", "/#services"], ["About", "/about"], ["Blog", "/blog"], ["Resources", "/resources"], ["Contact", "/contact"]];
export default function Nav() {
  return (<header className="nav"><div className="wrap"><Link href="/" aria-label="Craig-T Logistics home"><img className="logoimg" src="/logo-reversed.svg" alt="Craig-T Logistics" /></Link>
    <nav>{L.map(([t, h]) => <Link key={h} href={h} className="dn">{t}</Link>)}<Link href="/#quote" className="btn">Get a quote</Link>
      <details className="mm"><summary>Menu</summary><div>{L.map(([t, h]) => <Link key={h} href={h}>{t}</Link>)}</div></details></nav></div></header>);
}
