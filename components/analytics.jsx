"use client";
import { useEffect } from "react";
import { consentState } from "../lib/analytics";
const GA = process.env.NEXT_PUBLIC_GA_ID;
export default function Analytics() {
  useEffect(() => {
    if (!GA) return;
    window.dataLayer = window.dataLayer || [];
    const gtag = function () { window.dataLayer.push(arguments); };
    window.gtag = gtag;
    gtag("consent", "default", { ad_storage: "denied", analytics_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    let loaded = false;
    const apply = (ok) => {
      gtag("consent", "update", { ad_storage: ok ? "granted" : "denied", analytics_storage: ok ? "granted" : "denied", ad_user_data: ok ? "granted" : "denied", ad_personalization: ok ? "granted" : "denied" });
      if (ok && !loaded) {
        loaded = true;
        const s = document.createElement("script");
        s.src = `https://www.googletagmanager.com/gtag/js?id=${GA}`;
        s.async = true;
        document.head.appendChild(s);
        gtag("js", new Date());
        gtag("config", GA, { anonymize_ip: true });
      }
    };
    apply(consentState());
    const onChange = () => apply(consentState());
    window.addEventListener("consent-updated", onChange);
    return () => window.removeEventListener("consent-updated", onChange);
  }, []);
  return null;
}
