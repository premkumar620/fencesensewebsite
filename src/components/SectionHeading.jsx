export default function SectionHeading({ kicker, title, align = "center" }) {
  return (
    <div className={`section-heading align-${align}`}>
      <p className="kicker">{kicker}</p>
      <span className="accent-line" aria-hidden="true" />
      <h2>{title}</h2>
    </div>
  );
}
