import { Link } from "react-router-dom";
import { useSite } from "../context/SiteContext";

export default function Footer() {
  const { addressLines, cin, company, email, mapsHref, phone, phoneHref, services, socials, solutions } =
    useSite();
  const companyLegal = company?.name || "Fencesense Technologies Pvt. Ltd.";

  return (
    <footer className="site-footer">
      <div className="footer-accent-bar" aria-hidden="true" />
      <div className="footer-glow footer-glow--left" aria-hidden="true" />
      <div className="footer-glow footer-glow--right" aria-hidden="true" />

      <div className="container">
        <div className="footer-brand-panel">
          <Link to="/" className="footer-brand-lockup">
            <span className="footer-logo-frame">
              <img src="/logo.png" alt="" className="footer-logo" width={52} height={52} />
            </span>
            <span className="footer-brand-copy">
              <span className="footer-brand-line">
                <span className="footer-brand-name">Fencesense</span>
                <span className="footer-brand-legal">Technologies Pvt. Ltd.</span>
              </span>
              <span className="footer-tagline">
                Cybersecurity, cloud, network, and digital solutions — built for enterprise estates.
              </span>
            </span>
          </Link>

          <div className="footer-brand-aside">
            <Link className="footer-cta-link" to="/contact">
              Talk to our team
              <ArrowIcon />
            </Link>
            <ul className="footer-socials">
              {socials.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                    <SocialIcon name={item.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h2 className="footer-col-title">Quick Links</h2>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h2 className="footer-col-title">Services</h2>
            <ul className="footer-links">
              {services.map((item) => (
                <li key={item.slug}>
                  <Link to={`/services/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h2 className="footer-col-title">Solutions</h2>
            <ul className="footer-links">
              {solutions.map((item) => (
                <li key={item.slug}>
                  <Link to={`/solutions/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col footer-col--contact">
            <h2 className="footer-col-title">Get in Touch</h2>
            <ul className="footer-links footer-contact-list">
              <li>
                <a href={phoneHref}>
                  <span className="footer-contact-label">Phone</span>
                  {phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`}>
                  <span className="footer-contact-label">Email</span>
                  {email}
                </a>
              </li>
              <li>
                <a href={mapsHref} target="_blank" rel="noreferrer" className="footer-address-link">
                  <span className="footer-contact-label">Registered office</span>
                  {addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </a>
              </li>
              {cin ? (
                <li className="footer-cin">
                  <span className="footer-contact-label">CIN</span>
                  {cin}
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="footer-bottom-brand">{companyLegal}</span>. All rights reserved.
            {cin ? ` CIN: ${cin}` : ""}
          </p>
          <nav className="footer-legal" aria-label="Legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/sitemap">Sitemap</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialIcon({ name }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.65,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name === "Facebook") {
    return (
      <svg {...common}>
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v9h4v-9h3l1-4h-4V7a1 1 0 011-1h3V2z" />
      </svg>
    );
  }
  if (name === "X") {
    return (
      <svg {...common}>
        <path d="M5 5l14 14M19 5L5 19" strokeWidth="2" />
      </svg>
    );
  }
  if (name === "Instagram") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "LinkedIn") {
    return (
      <svg {...common}>
        <path d="M5 9v11M5 5.5v.5M9 20v-7a3 3 0 016 0v7M9 9v11M18 20v-5.2a3.2 3.2 0 00-6.4 0V20" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="M11 9.5v5l4.5-2.5L11 9.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}
