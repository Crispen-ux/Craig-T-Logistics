import { services, posts } from "../lib/data";
import { corridors } from "../lib/corridors";

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://craigtlogistics.co.za";
  const statics = [
    "",
    "/services",
    "/corridors",
    "/fleet",
    "/tools",
    "/industries",
    "/faq",
    "/sitemap",
    "/terms",
    "/about",
    "/contact",
    "/blog",
    "/resources",
    "/privacy",
  ];
  const dynamic = [
    ...services.map((s) => `/services/${s.slug}`),
    ...corridors.map((c) => `/corridors/${c.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  return [...statics, ...dynamic].map((path) => ({
    url: base + path,
    lastModified: new Date(),
    changeFrequency: path.startsWith("/blog") || path.startsWith("/services") || path.startsWith("/corridors") ? "monthly" : "weekly",
    priority: path === "" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
