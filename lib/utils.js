import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatKm = (km) => `${Math.round(km).toLocaleString("en-ZA")} km`;

export const formatDuration = (hours) => {
  const h = Math.max(0, hours);
  if (h < 1) return `${Math.round(h * 60)} min`;
  const days = Math.floor(h / 24);
  const rest = Math.round(h % 24);
  if (days === 0) return `${rest} h`;
  return rest ? `${days} d ${rest} h` : `${days} d`;
};
