export const brand = {
  name: "Craig-T Logistics",
  tagline: "Road freight that arrives when we say it will",
  email: "sales@craigtlogistics.co.za",
  phone: "+27 11 000 0000",
  phoneHref: "tel:+27110000000",
  address: "Johannesburg, Gauteng, South Africa",
  officer: "Information Officer",
  site: process.env.NEXT_PUBLIC_SITE_URL || "https://craigtlogistics.co.za",
  foundedNote: "Serving South African shippers",
};

export const wa = (t = "Hi Craig-T Logistics, I'd like a freight quote.") =>
  `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "27821234567"}?text=${encodeURIComponent(t)}`;
