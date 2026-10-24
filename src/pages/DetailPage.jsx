import { useEffect, useId, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { buildFallbackContent, getDetailContent } from "../detailContent";
import { useEnquiry } from "../context/EnquiryContext";
import { phoneHref, services, solutions } from "../data";

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
  const content = getDetailContent(kind, slug) ?? buildFallbackContent(item);
  const intro = item.summary || item.paragraphs[0];
  const heroImage = item.heroImage || "/home-banner.jpeg";

  return (
    <div className="page detail-page">
      <section className="detail-hero">
        <div
          key={slug}
          className="detail-hero-bg"
          aria-hidden="true"
          style={{ "--detail-hero-image": `url("${heroImage}")` }}
        />
        <div className="container detail-hero-grid">
          <div className="detail-hero-copy">
            <p className="kicker">{kind === "service" ? "Services" : "Solutions"}</p>
            <h1>{item.title}</h1>
            <p className="detail-lede">{intro}</p>
            <div className="detail-hero-actions">
              <button type="button" className="btn" onClick={openEnquiry}>
                Ask experts
              </button>
              <a className="btn detail-btn-outline" href={phoneHref}>
                Schedule call
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="band detail-section detail-benefits-section">
        <div className="container">
          <header className="detail-section-head">
            <p className="detail-section-kicker">Benefits</p>
            <h2>{content.benefitsTitle}</h2>
            <p className="detail-section-lede">
              Structured capabilities delivered through consulting, implementation, and ongoing support.
            </p>
          </header>
          <div className="detail-benefits-grid">
            {content.benefits.map((benefit, index) => (
              <article className="detail-benefit-card" key={benefit.title}>
                <div className="detail-benefit-top">
                  <span className="detail-benefit-index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{benefit.title}</h3>
                {benefit.description ? (
                  <p>{benefit.description}</p>
                ) : (
                  <ul>
                    {benefit.items.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                )}
                {benefit.actionLabel ? (
                  <button type="button" className="detail-benefit-action" onClick={openEnquiry}>
                    <span>{benefit.actionLabel}</span>
                    <BenefitArrow />
                  </button>
                ) : (
                  <span className="detail-benefit-spacer" aria-hidden="true" />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band detail-cta-band">
        <div className="container">
          <div className="detail-cta-panel">
            <div>
              <p className="kicker">Get in touch</p>
              <h2>Get in touch with our experts</h2>
              <p>Tell us what you are trying to protect or build. We will come back with a practical next step.</p>
            </div>
            <button type="button" className="btn" onClick={openEnquiry}>
              Ask experts
            </button>
          </div>
        </div>
      </section>

      <section className="band detail-section">
        <div className="container">
          <SectionHeading kicker="Approach and methodology" title={content.methodologyTitle} />
          <MethodologySteps steps={content.methodology} />
        </div>
      </section>

      <section className="band detail-section detail-faq-section">
        <div className="container detail-faq-layout">
          <SectionHeading kicker="FAQ" title="Frequently asked questions" align="left" />
          <FaqList items={content.faqs} />
        </div>
      </section>

      <section className="band detail-section">
        <div className="container detail-layout">
          <article className="detail-overview">
            <h2>Overview</h2>
            {item.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
          <aside className="side-card detail-side">
            <h2>More {kind === "service" ? "services" : "solutions"}</h2>
            <ul>
              {others.map((entry) => (
                <li key={entry.slug}>
                  <Link to={`${base}/${entry.slug}`}>{entry.title}</Link>
                </li>
              ))}
            </ul>
            <Link className="text-link" to="/contact">
              Contact us
              <Arrow />
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}

function MethodologySteps({ steps }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = document.getElementById("methodology-track");
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <ol className={`detail-methodology ${visible ? "is-visible" : ""}`} id="methodology-track">
      {steps.map((step, index) => (
        <li key={step.step} style={{ "--step-index": index }}>
          <span className="detail-step-no">{step.step}</span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function FaqList({ items }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="detail-faq">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.question} className={`detail-faq-item ${open ? "is-open" : ""}`}>
            <button
              id={buttonId}
              type="button"
              className="detail-faq-trigger"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span>{item.question}</span>
              <Chevron open={open} />
            </button>
            <div id={panelId} className="detail-faq-panel" role="region" aria-labelledby={buttonId}>
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Chevron({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className={open ? "is-open" : ""}>
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BenefitArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
