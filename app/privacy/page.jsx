import { brand } from "../../lib/config";
export const metadata = { title: "Privacy Notice (POPIA) | Craig-T Logistics" };
export default function Page() {
  return (<><div className="pagehead"><div className="wrap"><h1>Privacy notice</h1></div></div>
    <article className="prose">
      <p>{brand.name} is a responsible party under the Protection of Personal Information Act 4 of 2013 (POPIA). This notice explains how we handle your information. Replace placeholders and have a legal practitioner review it before launch.</p>
      <h2>What we collect</h2><p>Name, company, email, phone, route and shipment details you submit through the quote form or WhatsApp, plus basic technical data (IP address, browser) for security.</p>
      <h2>Why we collect it</h2><ul><li>To prepare and send freight quotes</li><li>To contact you about your enquiry</li><li>To prevent spam and abuse</li></ul>
      <h2>Cookies</h2><p>Necessary cookies keep the site working. Analytics cookies load only if you accept them in the cookie banner.</p>
      <h2>Sharing and retention</h2><p>We share data only with service providers who help us respond (email and hosting) and delete enquiry data when no longer needed.</p>
      <h2>Your rights</h2><p>You may ask to access, correct or delete your information, or object to processing. Contact our {brand.officer} at {brand.email}. You may also complain to the Information Regulator at inforeg.org.za.</p>
    </article></>);
}
