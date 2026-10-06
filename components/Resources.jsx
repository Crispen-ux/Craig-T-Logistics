"use client";
import { useState } from "react";
const items = [
 ["Regulation", "SARS Customs & Excise", "Import/export rules, tariffs and clearing procedures.", "https://www.sars.gov.za/customs-and-excise/"],
 ["Regulation", "Ports Regulator of South Africa", "Port tariffs, performance and regulation.", "https://www.portsregulator.org/"],
 ["Industry", "Road Freight Association", "Advocacy, compliance and training for road hauliers.", "https://www.rfa.co.za/"],
 ["Industry", "SAAFF", "South African Association of Freight Forwarders.", "https://www.saaff.org.za/"],
 ["News", "Freight News", "Daily South African freight, port and rail news.", "https://www.freightnews.co.za/"],
 ["News", "Engineering News", "Coverage of transport and infrastructure.", "https://www.engineeringnews.co.za/"],
 ["Research", "CSIR", "Home of the annual State of Logistics report.", "https://www.csir.co.za/"],
 ["Infrastructure", "Transnet", "Rail, port and pipeline operator.", "https://www.transnet.net/"],
 ["Infrastructure", "SANRAL", "National road network and live conditions.", "https://www.sanral.co.za/"]];
export default function Resources() {
  const cats = ["All", ...new Set(items.map((i) => i[0]))], [c, setC] = useState("All");
  return (<><div className="filters">{cats.map((x) => <button key={x} className={c === x ? "on" : ""} onClick={() => setC(x)}>{x}</button>)}</div>
    <div className="res">{items.filter((i) => c === "All" || i[0] === c).map(([k, t, d, u]) => <a key={u} href={u} target="_blank" rel="noopener noreferrer"><small>{k}</small><h3>{t}</h3><span>{d}</span></a>)}</div></>);
}
