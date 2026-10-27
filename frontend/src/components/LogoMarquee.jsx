export default function LogoMarquee({ logos, label }) {
  const base = [];
  while (base.length < 14) base.push(...logos);
  const track = [...base, ...base];

  return (
    <section className="marquee-section">
      <div className="container">
        {label ? <p className="marquee-label">{label}</p> : null}
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {track.map((src, index) => (
            <div className="logo-chip" key={`${src}-${index}`}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
