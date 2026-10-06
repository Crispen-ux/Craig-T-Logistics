import Link from "next/link";
export const metadata = { title: "Page not found" };
export default function NotFound() {
  return (<section className="hero"><div className="wrap" style={{display:"block"}}><h1>This route doesn't exist.</h1><p>The page you were looking for has moved or never existed. Let's get you back on the road.</p>
    <div className="row"><Link className="btn" href="/">Back to home</Link><Link className="btn ghost" href="/#quote">Get a quote</Link></div></div></section>);
}
