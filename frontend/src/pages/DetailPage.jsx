import { useEffect, useId, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LogoMarquee from "../components/LogoMarquee";
import { fetchCatalogDetail } from "../api/client";
import { buildFallbackContent, getDetailContent } from "../detailContent";
import { useEnquiry } from "../context/EnquiryContext";
import { useSite } from "../context/SiteContext";

const DEFAULT_CTA_TEXT =
  "Tell us what you are protecting and when you need results. Our consultants respond with a scoped plan—not a generic pitch.";

const BENEFIT_ICONS = [
  "/icons/icon-1.png",
  "/icons/icon-2.png",
  "/icons/icon-3.png",
  "/icons/icon-4.png",
  "/icons/icon-5.png",
  "/icons/icon-6.png",
];

function benefitBody(benefit) {
  if (benefit.description) return benefit.description;
  if (benefit.items?.length) {
    return benefit.items
      .map((entry) => (entry.endsWith(".") ? entry : `${entry}.`))
      .join(" ");
  }
  return "";
}

export default function DetailPage({ kind }) {
  const { slug } = useParams();
  const { openEnquiry } = useEnquiry();
  const { loading, partnerLogos, phone, phoneHref, services, solutions, source } = useSite();
  const items = kind === "service" ? services : solutions;
  const [apiItem, setApiItem] = useState(null);
  const listItem = items.find((entry) => entry.slug === slug);
  const item = apiItem ?? listItem;

  useEffect(() => {
    let cancelled = false;
    setApiItem(null);
    fetchCatalogDetail(kind, slug)
      .then((data) => {
        if (!cancelled) setApiItem(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [kind, slug]);
  const others = items.filter((entry) => entry.slug !== slug).slice(0, 4);
  const base = kind === "service" ? "/services" : "/solutions";

  useEffect(() => {
    document.title = item ? `${item.title} | Fencesense` : "Not found | Fencesense";
  }, [item]);

  if (!item && loading) {
    return null;
  }

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

  const staticDetail = getDetailContent(kind, slug);
  const content =
    apiItem?.detailContent ??
    (source === "api" ? buildFallbackContent(item) : staticDetail ?? buildFallbackContent(item));
  const intro = item.summary || item.paragraphs?.[0] || "";
  const heroImage = item.heroImage || "/home-banner.jpeg";
  const ctaText = content.ctaText ?? DEFAULT_CTA_TEXT;

  return (
    <div className={`page detail-page detail-page--${kind}`}>
      <section className="hero detail-hero-home" key={slug}>
        <div
          className="hero-media"
          aria-hidden="true"
          style={{ "--hero-media-image": `url("${heroImage}")` }}
        />
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="hero-heading">
              {item.kicker ? <p className="hero-kicker hero-kicker--static">{item.kicker}</p> : null}
              <h1>{item.title}</h1>
            </div>
            <p>
              {slug === "professional-services" ? (
                <>
                  <strong>Fencesense Professional Services</strong>
                  {intro.replace(/^Fencesense Professional Services/, "")}
                </>
              ) : (
                intro
              )}
            </p>
            <div className="hero-actions-row">
              <button type="button" className="hero-demo" onClick={openEnquiry}>
                <span>
                  Ask Experts
                  <CircleChevron />
                </span>
              </button>
              <a className="hero-demo hero-demo-secondary" href={phoneHref}>
                <span>
                  Schedule Call
                  <PhoneIcon />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="detail-partners-wrap">
        <div className="container detail-partners-head">
          <div>
            <p className="detail-partners-kicker">Company partners</p>
            <h2 className="detail-partners-title">Trusted by organizations worldwide</h2>
          </div>
          <span className="detail-partners-accent" aria-hidden="true" />
        </div>
        <LogoMarquee logos={partnerLogos} label="" />
      </div>

      <section className="detail-section detail-benefits-section" id="benefits">
        <div className="container">
          <DetailSectionHead kicker="Benefits" title={content.benefitsTitle} />
          <div className="detail-benefits-grid">
            {content.benefits.map((benefit, index) => (
              <article className="info-card detail-benefit-info-card" key={benefit.title}>
                <div className="card-title">
                  <img
                    className="card-icon"
                    src={benefit.icon || BENEFIT_ICONS[index % BENEFIT_ICONS.length]}
                    alt=""
                  />
                  <h3>{benefit.title}</h3>
                </div>
                <div className="card-rule" aria-hidden="true" />
                <p>{benefitBody(benefit)}</p>
                {benefit.actionLabel ? (
                  <button type="button" className="detail-benefit-action" onClick={openEnquiry}>
                    <span>{benefit.actionLabel}</span>
                    <BenefitArrow />
                  </button>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-expert-cta-band" aria-labelledby="detail-expert-cta-heading">
        <div className="container detail-expert-cta-bar">
          <div className="detail-expert-cta-copy">
            <p className="detail-expert-cta-eyebrow">Expert consultation</p>
            <h2 id="detail-expert-cta-heading">{content.ctaTitle ?? "Get in touch with our experts"}</h2>
            <p className="detail-expert-cta-lede">{ctaText}</p>
          </div>
          <button type="button" className="detail-expert-cta-btn" onClick={openEnquiry}>
            Ask Experts
          </button>
        </div>
      </section>

      <section className="detail-section detail-methodology-section" id="methodology">
        <div className="container">
          <DetailSectionHead kicker="Approach and methodology" title={content.methodologyTitle} />
          <MethodologySteps steps={content.methodology} />
        </div>
      </section>

      <section className="detail-section detail-faq-section" id="faq">
        <div className="container detail-faq-stack">
          <DetailSectionHead kicker="FAQ" title="Frequently Asked Questions" />
          <FaqList items={content.faqs} />
          <p className="detail-faq-footnote">
            Still have questions?{" "}
            <a href={phoneHref}>{phone}</a>
            {" · "}
            <button type="button" className="text-link detail-faq-footnote-link" onClick={openEnquiry}>
              Send an enquiry
            </button>
          </p>
        </div>
      </section>

      {others.length > 0 ? (
        <section className="band detail-related-section">
          <div className="container">
            <DetailSectionHead
              kicker={kind === "service" ? "More services" : "More solutions"}
              title={`Explore other ${kind === "service" ? "services" : "solutions"}`}
            />
            <ul className="detail-related-grid">
              {others.map((entry) => (
                <li key={entry.slug}>
                  <Link to={`${base}/${entry.slug}`} className="detail-related-card">
                    <span className="detail-related-label">{entry.kicker || entry.title}</span>
                    <strong>{entry.title}</strong>
                    <span className="detail-related-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function DetailSectionHead({ kicker, title }) {
  return (
    <header className="detail-section-head">
      <p className="detail-section-kicker">{kicker}</p>
      <span className="accent-line" aria-hidden="true" />
      <h2>{title}</h2>
    </header>
  );
}

function MethodologySteps({ steps }) {
  const [index, setIndex] = useState(0);
  const step = steps[index];

  const go = (next) => {
    const total = steps.length;
    setIndex(((next % total) + total) % total);
  };

  return (
    <div className="detail-methodology" id="methodology-track">
      <div className="detail-step-track" role="tablist" aria-label="Methodology steps">
        {steps.map((entry, entryIndex) => (
          <button
            key={entry.step}
            type="button"
            role="tab"
            aria-selected={entryIndex === index}
            className={`detail-step-tab ${entryIndex === index ? "is-active" : ""}`}
            onClick={() => setIndex(entryIndex)}
          >
            <span className="detail-step-tab-num">{entryIndex + 1}.</span>
            <span className="detail-step-tab-label">{entry.title}</span>
          </button>
        ))}
      </div>

      <div className="detail-step-panel-wrap">
        <article className="detail-step-panel" key={step.step}>
          <span className="detail-step-watermark" aria-hidden="true">
            {step.step}
          </span>
          <div className="detail-step-panel-copy">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </article>
        <div className="detail-step-footer">
          <p className="detail-step-progress">
            Step {index + 1} of {steps.length}
          </p>
          <div className="detail-step-controls">
            <button type="button" className="detail-step-next" aria-label="Previous step" onClick={() => go(index - 1)}>
              <StepArrow direction="left" />
            </button>
            <button type="button" className="detail-step-next" aria-label="Next step" onClick={() => go(index + 1)}>
              <StepArrow direction="right" />
            </button>
          </div>
        </div>
      </div>
    </div>
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
              <span className="detail-faq-q">{item.question}</span>
              <span className="detail-faq-icon" aria-hidden="true">
                <Chevron open={open} />
              </span>
            </button>
            <div id={panelId} className="detail-faq-panel" role="region" aria-labelledby={buttonId}>
              <div className="detail-faq-panel-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StepArrow({ direction = "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true" style={direction === "left" ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CircleChevron() {
  return (
    <svg width="18" height="18" viewBox="0 0 512 512" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.6 3.5c.4-.9 1.5-1.2 2.3-.7l2.2 1.3c.7.4.9 1.3.5 2l-1 1.7c.8 1.6 2.2 3 3.8 3.8l1.7-1c.7-.4 1.6-.2 2 .5l1.3 2.2c.5.8.2 1.9-.7 2.3l-1.5.6c-2.5 1-5.3-.2-7.4-2.3S2.6 9.6 3.6 7.1l.6-1.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chevron({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className={open ? "is-open" : ""}>
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
