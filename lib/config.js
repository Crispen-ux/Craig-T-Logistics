export const brand = { name: "Craig-T Logistics", email: "sales@craigtlogistics.co.za", phone: "+27 11 000 0000", address: "Johannesburg, Gauteng, South Africa", officer: "Information Officer" };
export const wa = (t = "Hi Craig-T Logistics, I'd like a freight quote.") => `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "27821234567"}?text=${encodeURIComponent(t)}`;
