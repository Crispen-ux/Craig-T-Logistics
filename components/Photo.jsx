export default function Photo({ src, alt, label = "photo" }) {
  if (src) return <img src={src} alt={alt} className="photo" loading="lazy" />;
  return (<div className="photo ph" role="img" aria-label={alt}>
    <svg viewBox="0 0 400 190" aria-hidden="true"><rect x="0" y="164" width="400" height="5" fill="#FFB81C" opacity=".6"/><rect x="40" y="56" width="212" height="86" rx="4" fill="#0B3A5B"/><rect x="40" y="108" width="212" height="8" fill="#FFB81C"/><path d="M258 78h58l32 32v32h-90z" fill="#10222E"/><path d="M300 86h12l18 22h-30z" fill="#C9D6DE"/><g fill="#10222E" stroke="#EEF2F4" strokeWidth="4"><circle cx="86" cy="148" r="16"/><circle cx="126" cy="148" r="16"/><circle cx="300" cy="148" r="16"/></g></svg>
    <small>Add real {label}: public/photos/</small></div>);
}
