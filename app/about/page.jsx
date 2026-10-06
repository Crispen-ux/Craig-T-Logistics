import Photo from "../../components/Photo";
import QuoteSection from "../../components/QuoteSection";
export const metadata = { title: "About Us", description: "Craig-T Logistics is a South African road freight company moving cargo over long and short distances." };
const fleet = [["Rigid trucks", "Short-distance, local and multi-drop delivery"], ["Side-tipper & flatbed", "Bulk and oversize loads"], ["Super-link & tautliner trucks", "Long-distance full loads"], ["Bakkies & panel vans", "Urgent and small deliveries"]];
const team = ["Managing Director", "Operations Manager", "Dispatch Lead", "Customer Service"];
export default function Page() {
  return (<><div className="pagehead"><div className="wrap"><h1>About Craig-T Logistics</h1></div></div>
    <section><div className="wrap cols"><div><h2>Our story</h2><p className="lead">Replace this with your real story: when Craig-T Logistics started, who founded it and what you set out to do differently. For example, a short paragraph on the first truck, the first client and where you operate today.</p>
      <p className="lead" style={{marginTop:14}}>We move freight over long and short distances across South Africa, and we treat every load as if it were our own.</p></div><Photo alt="Craig-T Logistics depot" label="depot photo" /></div></section>
    <section style={{paddingTop:0}}><div className="wrap"><h2>Our fleet</h2><div className="svc two">{fleet.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div><p className="lead" style={{marginTop:16}}>Fleet types are placeholders. Update them to match your trucks.</p></div></section>
    <section style={{paddingTop:0}}><div className="wrap"><h2>The team</h2><div className="res team" style={{marginTop:24}}>{team.map((r) => <div key={r}><Photo alt={r} label="team photo" /><h3>Name Surname</h3><small>{r}</small></div>)}</div></div></section>
    <QuoteSection title="Ready to ship with us?" /></>);
}
