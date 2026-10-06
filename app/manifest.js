export default function manifest() {
  return {
    name: "Craig-T Logistics — Road Freight South Africa",
    short_name: "Craig-T Logistics",
    description:
      "Long-distance and short-distance road freight across South Africa. Full loads, part loads, cross-border and container haulage.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#10222E",
    theme_color: "#10222E",
    lang: "en-ZA",
    categories: ["business", "productivity"],
    icons: [
      { src: "/apple-icon.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
