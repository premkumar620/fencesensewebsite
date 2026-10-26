import { Link } from "react-router-dom";
import { useSite } from "../context/SiteContext";

export default function Footer() {
  const { addressLines, cin, email, mapsHref, phone, phoneHref, services, socials, solutions } = useSite();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <p className="footer-wordmark">
            <Link to="/">Fencesense</Link>
            <span>Technologies Pvt. Ltd.</span>
          </p>
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

        <div className="footer-grid">
          <div>
            <h2>Quick Links</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
            </ul>
          </div>
          <div>
            <h2>Services</h2>
            <ul>
              {services.map((item) => (
                <li key={item.slug}>
                  <Link to={`/services/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Solutions</h2>
            <ul>
              {solutions.map((item) => (
                <li key={item.slug}>
                  <Link to={`/solutions/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Get in Touch</h2>
            <ul>
              <li><a href={phoneHref}>Call us: {phone}</a></li>
              <li><a href={`mailto:${email}`}>Email us: {email}</a></li>
              <li>
                <a href={mapsHref} target="_blank" rel="noreferrer">
                  {addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </a>
              </li>
              <li>CIN: {cin}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-row">
          <p>
            © {new Date().getFullYear()} Fencesense Technologies Pvt. Ltd. All rights reserved. CIN: {cin}
          </p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }) {
  const common = {
    width: 20,
    height: 20,
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
