import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { useEnquiry } from "../context/EnquiryContext";
import { offerings, phone, phoneHref, stats } from "../data";

const capabilities = [
  "Cybersecurity Solutions",
  "Network Solution",
  "Application Delivery Solution",
  "On Demand Resource",
  "Automation & Orchestration",
];

export default function About() {
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
        <div className="container about-hero-copy">
          <h1>About Us</h1>
          <p>
            At Fencesense Technologies Pvt. Ltd., we provide cutting-edge cybersecurity, network management, application
            delivery, DevOps, and cloud security solutions, helping businesses navigate complex digital landscapes with
            tailored strategies for success.
          </p>
          <div className="detail-hero-actions">
            <button type="button" className="btn" onClick={openEnquiry}>
              Ask experts
            </button>
            <a className="btn detail-btn-outline" href={phoneHref}>
              Schedule call
            </a>
          </div>
        </div>
      </section>

      <section className="band about-shield-band">
        <div className="container about-shield-grid">
          <div>
            <SectionHeading
              kicker="Leading the charge in cyber defence innovation"
              title="Digital Shield*"
              align="left"
            />
            <p className="lede">
              At Fencesense, we are committed to securing your digital world. Our expertise in cutting-edge
              cybersecurity solutions ensures your business remains protected against evolving threats.
            </p>
            <ul className="about-capability-list">
              {capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a className="about-phone" href={phoneHref}>
              Call us: {phone}
            </a>
          </div>
          <figure className="about-shield-media">
            <img src="/about/digital-shield.png" alt="Security analyst monitoring systems" />
          </figure>
        </div>
      </section>

      <section className="about-map-band" id="about-stats">
        <div className="about-map-band-bg" aria-hidden="true" />
        <div className="container about-map-band-inner">
          <div className="about-impact-head">
            <h2>Security monitoring and malware protection for businesses.</h2>
            <p>
              At Fencesense, we are committed to securing your digital world. Our expertise in cutting-edge
              cybersecurity solutions ensures your business remains protected against evolving threats.
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
