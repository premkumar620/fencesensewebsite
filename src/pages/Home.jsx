import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoMarquee from "../components/LogoMarquee";
import SectionHeading from "../components/SectionHeading";
import { useEnquiry } from "../context/EnquiryContext";
import {
  customerLogos,
  offerings,
  partnerLogos,
  posts,
  solutions,
  stats,
  testimonials,
} from "../data";

const focusAreas = [
  {
    title: "Cyber Security",
    text: "Monitoring, threat intelligence, and incident response aligned to your estate.",
  },
  {
    title: "Network",
    text: "Design and operations that keep connectivity reliable when pressure hits.",
  },
  {
    title: "Application Delivery",
    text: "Performance, deployment, and protection for business-critical apps.",
  },
  {
    title: "Cloud & IAM",
    text: "Platforms and access controls that leadership can audit and teams can run.",
  },
];

export default function Home() {
  const { openEnquiry } = useEnquiry();
  const [kicker, title] = useBannerTypewriter("Your Security, Our Passion", "Welcome to Fencesense");

  useEffect(() => {
    document.title = "Fencesense | Cybersecurity Solutions";
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-media" aria-hidden="true" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="hero-heading">
              <p className="hero-kicker">{kicker}</p>
              <h1>{title}</h1>
            </div>
            <p>
              Fencesense Technologies Pvt. Ltd. specializes in cybersecurity and digital solutions, offering network
              delivery, automation, and transformation, along with threat intelligence, cloud security, SOC services,
              and incident response for data protection.
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

      <section className="band about-band" id="about">
        <div className="container">
          <header className="about-intro">
            <p className="about-eyebrow">About Fencesense</p>
            <div className="about-intro-copy">
              <h2>Leading the charge in cyber defence innovation.</h2>
              <p>
                Fencesense Technologies Pvt. Ltd. helps organisations secure networks, cloud platforms, and applications
                with consulting, managed SOC, and specialist delivery. We stay after launch so controls keep working as
                the business changes.
              </p>
            </div>
          </header>

          <div className="about-layout">
            <div className="about-main">
              <div className="about-focus-grid">
                {focusAreas.map((item) => (
                  <article className="about-focus-card" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
              <ul className="about-highlights">
                {offerings.slice(0, 4).map((item) => (
                  <li key={item}>
                    <CircleCheck />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="about-actions">
                <Link className="btn" to="/about">
                  More about us
                  <CircleChevron />
                </Link>
                <button type="button" className="about-link" onClick={openEnquiry}>
                  Talk to our team
                </button>
              </div>
            </div>

            <div className="about-media">
              <figure className="about-frame primary">
                <img src="/about/analyst.jpg" alt="Analyst reviewing live network and threat data" />
                <figcaption>Detection &amp; response</figcaption>
              </figure>
              <figure className="about-frame secondary">
                <img src="/about/operations.jpg" alt="Security specialist in the operations centre" />
                <figcaption>Operations support</figcaption>
              </figure>
            </div>
          </div>

          <div className="about-capabilities">
            <p>What we deliver</p>
            <ul>
              {offerings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Stats />

      <section className="band solutions-band">
        <div className="solutions-glow" aria-hidden="true" />
        <div className="container">
          <SectionHeading kicker="Your trusted IT security solution" title="Your Trusted IT Security Solution" />
          <div className="card-grid">
            {solutions.map((item) => (
              <article className="info-card" key={item.slug}>
                <div className="card-title">
                  <img className="card-icon" src={item.icon} alt="" />
                  <h3>{item.title}</h3>
                </div>
                <div className="card-rule" aria-hidden="true" />
                <p>{item.summary}</p>
                <Link className="read-more" to={`/solutions/${item.slug}`}>
                  Read more
                  <CircleChevron />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band testimonials-band">
        <div className="container">
          <SectionHeading kicker="Testimonial" title="Trusted by Our Customers" />
          <TestimonialSlider />
        </div>
      </section>

      <LogoMarquee logos={customerLogos} label="Our Customers" />

      <section className="band">
        <div className="container">
          <SectionHeading kicker="Cyber security insight" title="Latest News & Articles" />
          <div className="card-grid">
            {posts.map((post) => (
              <article className="article-card" key={post.slug}>
                <Link to={`/blogs/${post.slug}`} className="article-media">
                  <img src={post.image} alt="" />
                  <span>
                    {post.day}
                    <br />
                    {post.month}
                  </span>
                </Link>
                <div className="article-body">
                  <p className="meta">
                    <span>{post.date}</span>
                    <span>By {post.author}</span>
                  </p>
                  <h3>
                    <Link to={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Stats() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = document.getElementById("stats");
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" id="stats">
      <div className="container stats-row">
        {stats.map((item) => (
          <div key={item.label}>
            <strong>
              <CountUp value={item.value} run={visible} />
              {item.suffix}
            </strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountUp({ value, run }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!run) return undefined;
    const start = performance.now();
    const duration = 1400;
    let frame = 0;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setCurrent(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, value]);

  return current;
}

const TESTIMONIAL_INTERVAL_MS = 7000;

function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const item = testimonials[index];

  const go = (next) => {
    const total = testimonials.length;
    setIndex(((next % total) + total) % total);
  };

  useEffect(() => {
    if (paused) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % testimonials.length);
    }, TESTIMONIAL_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, index]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowLeft") go(index - 1);
      if (event.key === "ArrowRight") go(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

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
            <button type="button" className="testimonial-arrow" aria-label="Previous testimonial" onClick={() => go(index - 1)}>
              <ArrowBack />
            </button>
            <button type="button" className="testimonial-arrow" aria-label="Next testimonial" onClick={() => go(index + 1)}>
              <ArrowForward />
            </button>
          </div>
        </div>

        <blockquote key={index} className="testimonial-card" aria-live="polite">
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
            key={`${index}-${paused ? "paused" : "run"}`}
            className={`testimonial-progress-bar ${paused ? "is-paused" : ""}`}
          />
        </div>
        <p className="testimonial-counter">
          <span>{String(index + 1).padStart(2, "0")}</span> / {String(testimonials.length).padStart(2, "0")}
        </p>
      </div>

      <div className="testimonial-rail" role="tablist" aria-label="Customer testimonials">
        {testimonials.map((entry, entryIndex) => (
          <button
            key={entry.name + entry.role}
            type="button"
            role="tab"
            aria-selected={entryIndex === index}
            className={entryIndex === index ? "is-active" : ""}
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
      for (let index = 1; index <= text.length; index += 1) {
        if (cancelled) return;
        setter(text.slice(0, index));
        await wait(100);
      }
    };

    const erase = async (text, setter) => {
      for (let index = text.length - 1; index >= 0; index -= 1) {
        if (cancelled) return;
        setter(text.slice(0, index));
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

