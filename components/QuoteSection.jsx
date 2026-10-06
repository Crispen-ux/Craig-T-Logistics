import LeadForm from "./LeadForm";
export default function QuoteSection({ title = "Tell us what you move" }) {
  return (<section id="quote" className="quote"><div className="wrap"><div><h2>{title}</h2>
    <p className="lead">Share your route, load size and monthly volume. We reply with a priced quote within one working day.</p></div><LeadForm /></div></section>);
}
