import { services, posts } from "../lib/data";
export default function sitemap() {
  const b = process.env.NEXT_PUBLIC_SITE_URL || "https://craigtlogistics.co.za";
  return ["", "/about", "/contact", "/blog", "/resources", "/privacy", ...services.map((s) => `/services/${s.slug}`), ...posts.map((p) => `/blog/${p.slug}`)].map((u) => ({ url: b + u }));
}
