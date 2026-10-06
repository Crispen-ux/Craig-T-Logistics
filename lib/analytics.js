export function consentState() {
  try { const c = JSON.parse(localStorage.getItem("cookie-consent") || "null"); return c ? !!c.analytics : false; } catch { return false; }
}
export function track(name, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  if (typeof window.gtag === "function") window.gtag("event", name, params);
}
