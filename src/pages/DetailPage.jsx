import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useEnquiry } from "../context/EnquiryContext";
import { services, solutions } from "../data";

export default function DetailPage({ kind }) {
  const { slug } = useParams();
  const { openEnquiry } = useEnquiry();
  const items = kind === "service" ? services : solutions;
  const item = items.find((entry) => entry.slug === slug);
  const others = items.filter((entry) => entry.slug !== slug);

  useEffect(() => {
    document.title = item ? `${item.title} | Fencesense` : "Not found | Fencesense";
  }, [item]);

  if (!item) {
    return (
      <div className="page">
        <section className="page-hero">
          <div className="container">
            <h1>We could not find that page.</h1>
            <Link className="btn" to="/">
              Back home
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const base = kind === "service" ? "/services" : "/solutions";

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <p className="kicker">{kind === "service" ? "Services" : "Solutions"}</p>
          <h1>{item.title}</h1>
          <p>{item.kicker}</p>
        </div>
      </section>
      <section className="band">
        <div className="container detail-layout">
          <article>
            {item.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="check-list">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <button type="button" className="btn" onClick={openEnquiry}>
              Schedule a Demo
            </button>
          </article>
          <aside className="side-card">
            <h2>More {kind === "service" ? "services" : "solutions"}</h2>
            <ul>
              {others.map((entry) => (
                <li key={entry.slug}>
                  <Link to={`${base}/${entry.slug}`}>{entry.title}</Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
