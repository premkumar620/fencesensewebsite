import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { useEnquiry } from "../context/EnquiryContext";
import { useSite } from "../context/SiteContext";

const DEFAULT_CAPABILITIES = [
  "Cybersecurity Solutions",
  "Network Solution",
  "Application Delivery Solution",
  "On Demand Resource",
  "Automation & Orchestration",
];

export default function About() {
  const { offerings, pages, phoneHref, stats } = useSite();
  const about = pages.about ?? {};
  const capabilities = about.capabilities?.length ? about.capabilities : DEFAULT_CAPABILITIES;
  const { openEnquiry } = useEnquiry();
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    document.title = "About Us | Fencesense";
  }, []);

  useEffect(() => {
    const node = document.getElementById("about-stats");
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page about-page">
      <section className="about-hero">
        <div
          className="about-hero-bg"
          aria-hidden="true"
          style={{ "--detail-hero-image": 'url("/about/about-banner.jpeg")' }}
        />
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <h1>{about.title ?? "About Us"}</h1>
            <p className="about-hero-lede">
              {about.heroLede ??
                "At Fencesense Technologies Pvt Ltd, we provide cutting-edge cybersecurity, network management, application delivery, DevOps, and cloud security solutions, helping businesses navigate complex digital landscapes with tailored strategies for success."}
            </p>
            <div className="about-hero-actions">
              <button type="button" className="btn about-hero-btn" onClick={openEnquiry}>
                Ask Experts
              </button>
              <a className="btn about-hero-btn" href={phoneHref}>
                Schedule Call
                <PhoneIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="band about-shield-band">
        <div className="container about-shield-grid">
          <figure className="about-shield-media">
            <div className="about-shield-frame">
              <img src="/about/digital-shield.png" alt="Security analyst monitoring systems" />
            </div>
          </figure>

          <div className="about-shield-copy">
            <SectionHeading
              kicker={about.shieldKicker ?? "Leading the charge in cyber defence innovation"}
              title={about.shieldTitle ?? "Digital Shield*"}
              align="left"
            />
            <p className="about-shield-lede">
              {about.shieldLede ??
                "At Fencesense, we are committed to securing your digital world. Our expertise in cutting-edge cybersecurity solutions ensures your business remains protected against evolving threats."}
            </p>
            <ul className="about-capability-grid">
              {capabilities.map((item) => (
                <li key={item} className="about-capability-pill">
                  <span className="about-capability-check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="about-map-band" id="about-stats">
        <div className="about-map-band-bg" aria-hidden="true" />
        <div className="container about-map-band-inner">
          <div className="about-impact-head">
            <h2>{about.impactTitle ?? "Security monitoring and malware protection for businesses."}</h2>
            <p>
              {about.impactBody ??
                "At Fencesense, we are committed to securing your digital world. Our expertise in cutting-edge cybersecurity solutions ensures your business remains protected against evolving threats."}
            </p>
          </div>

          <div className="about-impact-stats">
            {stats.map((item) => (
              <div key={item.label}>
                <strong>
                  <AboutStat value={item.value} suffix={item.suffix} run={statsVisible} />
                </strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="about-managed-intro">
            <SectionHeading kicker="Managed services" title="Manage and monitor digital footprint" align="left" />
            <blockquote className="about-quote about-quote-left">
              Effectively manage and monitor your digital footprint to enhance security, ensure compliance, and protect
              your organization&apos;s online presence.
            </blockquote>
          </div>

          <ul className="chip-list about-map-chips">
            {offerings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="detail-cta-panel about-managed-cta">
            <div>
              <p className="kicker">Get in touch</p>
              <h2>Get in touch with our experts</h2>
              <p>Share your goals and timeline—we will respond with a practical plan and next steps.</p>
            </div>
            <button type="button" className="btn" onClick={openEnquiry}>
              Ask experts
            </button>
          </div>
          <p className="about-contact-link">
            Prefer email? <Link to="/contact">Contact us</Link>
          </p>
        </div>
      </section>
    </div>
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

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 6l2.2 2.2L9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AboutStat({ value, suffix, run }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!run) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCurrent(value);
      return undefined;
    }
    const start = performance.now();
    const duration = 1200;
    let frame = 0;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setCurrent(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, value]);

  return (
    <>
      {current}
      {suffix}
    </>
  );
}
