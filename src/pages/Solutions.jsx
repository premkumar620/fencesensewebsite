import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoMarquee from "../components/LogoMarquee";
import SectionHeading from "../components/SectionHeading";
import StatsBand from "../components/StatsBand";
import { useEnquiry } from "../context/EnquiryContext";
import { useSite } from "../context/SiteContext";

const solutionPillars = [
  {
    title: "Security & identity",
    text: "SOC, threat intelligence, IAM, and controls aligned to how users and workloads actually access data.",
  },
  {
    title: "Network & delivery",
    text: "Enterprise networking and application delivery designed for uptime, segmentation, and safe change.",
  },
  {
    title: "Cloud & digital",
    text: "Landing zones, cloud security, and digital experiences that scale without outrunning your platform.",
  },
  {
    title: "Operate with proof",
    text: "Monitoring, reporting, and handover so internal teams can run what we help you build.",
  },
];

export default function Solutions() {
  const { customerLogos, offerings, pages, partnerLogos, solutions } = useSite();
  const home = pages.home ?? {};
  const { openEnquiry } = useEnquiry();
  const [kicker, title] = useBannerTypewriter("Built for enterprise estates", "Our Solutions");

  useEffect(() => {
    document.title = "Solutions | Fencesense";
  }, []);

  return (
    <div className="home-page solutions-page">
      <section className="hero solutions-hero">
        <div className="hero-media" aria-hidden="true" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="hero-heading">
              <p className="hero-kicker">{kicker}</p>
              <h1>{title}</h1>
            </div>
            <p>
              Security, network, application delivery, IAM, cloud, and digital solutions from Fencesense—designed to
              protect operations, simplify access, and keep critical services available as you grow.
            </p>
            <button type="button" className="hero-demo" onClick={openEnquiry}>
              <span>
                Schedule a Demo
                <CircleChevron />
              </span>
            </button>
          </div>
        </div>
      </section>

      <LogoMarquee logos={partnerLogos} label="Partners companies worldwide" />

      <section className="band about-band">
        <div className="container">
          <header className="about-intro">
            <p className="about-eyebrow">Solution areas</p>
            <div className="about-intro-copy">
              <h2>Your trusted IT security and digital platform partner.</h2>
              <p>
                Our solution lines mirror how enterprises actually run: protect the estate, move traffic safely, govern
                identity, and modernize cloud and digital channels—with designs your teams can operate after go-live.
              </p>
            </div>
          </header>

          <div className="about-layout">
            <div className="about-main">
              <div className="about-focus-grid">
                {solutionPillars.map((item) => (
                  <article className="about-focus-card" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
              <ul className="about-highlights">
                {solutions.slice(0, 4).map((item) => (
                  <li key={item.slug}>
                    <CircleCheck />
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
              <div className="about-actions">
                <button type="button" className="btn" onClick={openEnquiry}>
                  Ask our experts
                  <CircleChevron />
                </button>
                <Link className="about-link" to="/contact">
                  Contact us
                </Link>
              </div>
            </div>

            <div className="about-media">
              <figure className="about-frame primary">
                <img src="/solutions/banners/security-solution.jpg" alt="Security operations and monitoring" />
                <figcaption>Security platform</figcaption>
              </figure>
              <figure className="about-frame secondary">
                <img src="/solutions/banners/digital-solutions.png" alt="Digital products and experiences" />
                <figcaption>Digital solutions</figcaption>
              </figure>
            </div>
          </div>

          <div className="about-capabilities">
            <p>Capabilities we cover</p>
            <ul>
              {offerings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="band solutions-band" id="solutions-list">
        <div className="solutions-glow" aria-hidden="true" />
        <div className="container">
          <SectionHeading kicker="Your trusted IT security solution" title="Explore Our Solutions" />
          <div className="card-grid services-card-grid">
            {solutions.map((item) => (
              <article className="info-card service-list-card" key={item.slug}>
                <Link to={`/solutions/${item.slug}`} className="service-list-card-media">
                  <img src={item.heroImage} alt="" />
                </Link>
                <div className="service-list-card-body">
                  <p className="service-list-card-kicker">{item.kicker}</p>
                  <div className="card-title service-list-card-title">
                    <h3>
                      <Link to={`/solutions/${item.slug}`}>{item.title}</Link>
                    </h3>
                  </div>
                  <div className="card-rule" aria-hidden="true" />
                  <p>{item.summary}</p>
                  <Link className="read-more" to={`/solutions/${item.slug}`}>
                    Read more
                    <CircleChevron />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band testimonials-band">
        <div className="container">
          <SectionHeading
            kicker={home.testimonialsKicker ?? "Testimonial"}
            title={home.testimonialsTitle ?? "Trusted by Our Customers"}
          />
          <TestimonialSlider />
        </div>
      </section>

      <LogoMarquee logos={customerLogos} label={home.customersMarqueeLabel ?? "Our Customers"} />
    </div>
  );
}

const TESTIMONIAL_INTERVAL_MS = 7000;

function TestimonialSlider() {
  const { testimonials = [] } = useSite();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const safeIndex = count ? ((index % count) + count) % count : 0;

  const go = (next) => {
    if (!count) return;
    setIndex(((next % count) + count) % count);
  };

  useEffect(() => {
    if (!count || paused) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % count);
    }, TESTIMONIAL_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  useEffect(() => {
    if (!count) return undefined;
    const onKey = (event) => {
      if (event.key === "ArrowLeft") go(safeIndex - 1);
      if (event.key === "ArrowRight") go(safeIndex + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [safeIndex, count]);

  if (!count) return null;

  const item = testimonials[safeIndex];

  return (
    <div
      className="testimonial-shell"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="testimonial-stage">
        <div className="testimonial-stage-top">
          <p className="testimonial-label">Client note</p>
          <div className="testimonial-nav">
            <button type="button" className="testimonial-arrow" aria-label="Previous testimonial" onClick={() => go(safeIndex - 1)}>
              <ArrowBack />
            </button>
            <button type="button" className="testimonial-arrow" aria-label="Next testimonial" onClick={() => go(safeIndex + 1)}>
              <ArrowForward />
            </button>
          </div>
        </div>

        <blockquote key={safeIndex} className="testimonial-card" aria-live="polite">
          <img className="testimonial-quote-icon" src="/icon-quote.svg" alt="" />
          <p>{item.quote}</p>
          <footer>
            <img src={item.logo} alt="" />
            <div>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </div>
          </footer>
        </blockquote>

        <div className="testimonial-progress" aria-hidden="true">
          <span
            key={`${safeIndex}-${paused ? "paused" : "run"}`}
            className={`testimonial-progress-bar ${paused ? "is-paused" : ""}`}
          />
        </div>
        <p className="testimonial-counter">
          <span>{String(safeIndex + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
        </p>
      </div>

      <div className="testimonial-rail" role="tablist" aria-label="Customer testimonials">
        {testimonials.map((entry, entryIndex) => (
          <button
            key={entry.name + entry.role}
            type="button"
            role="tab"
            aria-selected={entryIndex === safeIndex}
            className={entryIndex === safeIndex ? "is-active" : ""}
            onClick={() => go(entryIndex)}
          >
            <img src={entry.logo} alt="" />
            <span>
              <strong>{entry.name}</strong>
              <small>{entry.role}</small>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function useBannerTypewriter(line1, line2) {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setFirst(line1);
      setSecond(line2);
      return undefined;
    }

    let timer = 0;
    let cancelled = false;
    const wait = (ms) =>
      new Promise((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    const type = async (text, setter) => {
      for (let i = 1; i <= text.length; i += 1) {
        if (cancelled) return;
        setter(text.slice(0, i));
        await wait(100);
      }
    };

    const erase = async (text, setter) => {
      for (let i = text.length - 1; i >= 0; i -= 1) {
        if (cancelled) return;
        setter(text.slice(0, i));
        await wait(50);
      }
    };

    const loop = async () => {
      while (!cancelled) {
        setFirst("");
        setSecond("");
        await type(line1, setFirst);
        if (cancelled) return;
        await wait(1000);
        await type(line2, setSecond);
        if (cancelled) return;
        await wait(2000);
        await erase(line2, setSecond);
        await erase(line1, setFirst);
      }
    };

    loop();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [line1, line2]);

  return [first, second];
}

function CircleCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 512 512" aria-hidden="true">
      <path
        fill="currentColor"
        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
      />
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

function ArrowBack() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowForward() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
