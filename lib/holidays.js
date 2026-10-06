export const holidays = [
  { date: "2026-01-01", name: "New Year's Day", type: "national" },
  { date: "2026-03-21", name: "Human Rights Day", type: "national", note: "Falls on a Saturday — no shift" },
  { date: "2026-04-03", name: "Good Friday", type: "national" },
  { date: "2026-04-06", name: "Family Day", type: "national" },
  { date: "2026-04-27", name: "Freedom Day", type: "national" },
  { date: "2026-05-01", name: "Workers' Day", type: "national" },
  { date: "2026-06-16", name: "Youth Day", type: "national" },
  { date: "2026-08-09", name: "National Women's Day", type: "national", observed: "2026-08-10", note: "Observed Monday" },
  { date: "2026-09-24", name: "Heritage Day", type: "national" },
  { date: "2026-12-16", name: "Day of Reconciliation", type: "national" },
  { date: "2026-12-25", name: "Christmas Day", type: "national" },
  { date: "2026-12-26", name: "Day of Goodwill", type: "national" },
  { date: "2027-01-01", name: "New Year's Day", type: "national" },
  { date: "2027-03-21", name: "Human Rights Day", type: "national", observed: "2027-03-22", note: "Observed Monday" },
  { date: "2027-04-23", name: "Good Friday", type: "national" },
  { date: "2027-04-26", name: "Family Day", type: "national" },
  { date: "2027-04-27", name: "Freedom Day", type: "national" },
  { date: "2027-05-01", name: "Workers' Day", type: "national", note: "Falls on a Saturday — no shift" },
  { date: "2027-06-16", name: "Youth Day", type: "national" },
  { date: "2027-08-09", name: "National Women's Day", type: "national" },
  { date: "2027-09-24", name: "Heritage Day", type: "national" },
  { date: "2027-12-16", name: "Day of Reconciliation", type: "national" },
  { date: "2027-12-25", name: "Christmas Day", type: "national" },
  { date: "2027-12-26", name: "Day of Goodwill", type: "national", observed: "2027-12-27", note: "Observed Monday" },
];

const toISO = (d) => d.toISOString().slice(0, 10);

export const nextHoliday = (from = new Date()) => {
  const today = toISO(from);
  return holidays.find((h) => (h.observed || h.date) >= today) || null;
};

export const isHoliday = (iso) => holidays.some((h) => h.date === iso || h.observed === iso);

export const daysUntil = (iso, from = new Date()) => {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const target = new Date(`${iso}T00:00:00`);
  return Math.round((target - start) / 86400000);
};

export const weekdayName = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-ZA", { weekday: "long" });
