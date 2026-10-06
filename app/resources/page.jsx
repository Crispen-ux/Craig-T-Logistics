import Resources from "../../components/Resources";
export const metadata = { title: "Logistics Resources South Africa | Craig-T Logistics" };
export default function Page() {
  return (<><div className="pagehead"><div className="wrap"><h1>Logistics resources</h1><p style={{marginTop:12,color:"#C9D6DE"}}>Regulators, industry bodies, news and research we rely on every day.</p></div></div>
    <div className="wrap" style={{padding:"16px 24px 88px"}}>
      <div className="res" style={{marginTop:16}}>
        <a href="/downloads/freight-checklist-south-africa.pdf" download><small>Free download · PDF</small><h3>Freight checklist for South African businesses</h3><span>The details to have ready before you ask for a quote: route, load, access and timing.</span></a>
      </div>
      <Resources />
    </div></>);
}
