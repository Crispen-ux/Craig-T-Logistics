import QuoteSection from "../../components/QuoteSection";
import { brand, wa } from "../../lib/config";
import { branches, hours } from "../../lib/data";
export const metadata = { title: "Contact Us", description: "Contact Craig-T Logistics for freight quotes, branch details and operating hours." };
export default function Page() {
  return (<><div className="pagehead"><div className="wrap"><h1>Contact us</h1></div></div>
    <section><div className="wrap cols"><div>{branches.map((b) => <div key={b.name} style={{marginBottom:24}}><h3>{b.name}</h3><p>{b.addr}<br/>{b.phone}<br/>{brand.email}</p></div>)}
      <h3>Operating hours</h3><table className="tbl"><tbody>{hours.map(([d, h]) => <tr key={d}><td>{d}</td><td>{h}</td></tr>)}</tbody></table>
      <p style={{marginTop:20}}><a className="btn" href={wa()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></p></div>
      <iframe className="map" title="Map of Johannesburg" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Johannesburg+South+Africa&output=embed" /></div></section>
    <QuoteSection /></>);
}
