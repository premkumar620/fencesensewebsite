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

      <section className="band about-band">
        <div className="container">
          <div className="about-head">
            <div className="about-kicker-wrap">
              <span className="accent-line" aria-hidden="true" />
              <p className="kicker">
                About
                <br />
                Fencesense
              </p>
            </div>
            <div>
              <h2>About Fencesense</h2>
              <p>Leading the charge in cyber defence innovation.</p>
            </div>
          </div>

          <div className="about-grid">
            <div className="word-stack" aria-label="Focus areas">
              <span className="solid">Cyber Security</span>
              <span className="stroke">Network</span>
              <span className="muted">Application Delivery</span>
              <span className="stroke wrap">Cloud, Identity and Access Management</span>
            </div>

            <figure className="about-photo">
              <img src="/about/analyst.jpg" alt="Analyst reviewing live network and threat data" />
            </figure>

            <div className="about-side">
              <figure className="about-photo">
                <img src="/about/operations.jpg" alt="Security specialist in the operations centre" />
              </figure>
              <ul className="check-list">
                {offerings.map((item) => (
                  <li key={item}>
                    <CircleCheck />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link className="hero-demo" to="/about">
                <span>
                  More about us
                  <CircleChevron />
                </span>
              </Link>
            </div>
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

function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(3);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 980px)");
    const apply = () => setCount(query.matches ? 1 : 3);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((value) => (value + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const visible = Array.from({ length: count }, (_, offset) => testimonials[(index + offset) % testimonials.length]);
  const highlight = count === 3 ? 1 : 0;

  return (
    <div>
      <div className={`quote-grid quotes-${count}`}>
        {visible.map((item, offset) => (
          <blockquote key={item.name + item.role} className={offset === highlight ? "is-active" : ""}>
            <p>{item.quote}</p>
            <footer>
              <div>
                <img src={item.logo} alt="" />
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
              <img className="quote-mark" src="/icon-quote.svg" alt="" />
            </footer>
          </blockquote>
        ))}
      </div>
      <div className="dots" role="tablist" aria-label="Testimonials">
        {testimonials.map((item, itemIndex) => (
          <button
            key={item.name}
            type="button"
            className={itemIndex === index ? "is-active" : ""}
            aria-label={`Show testimonial from ${item.name}`}
            onClick={() => setIndex(itemIndex)}
          />
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

