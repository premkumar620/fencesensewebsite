import { Link } from "react-router-dom";
import { addressLines, cin, email, mapsHref, phone, phoneHref, services, socials, solutions } from "../data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-brand-row">
          <Link to="/" className="brand" aria-label="Fencesense home">
            <img src="/logo.png" alt="Fencesense" />
          </Link>
          <div className="socials">
            {socials.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                <SocialIcon name={item.label} />
              </a>
            ))}
          </div>
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
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };
  if (name === "Facebook") {
    return (
      <svg {...common}>
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
      </svg>
    );
  }
  if (name === "X") {
    return (
      <svg {...common}>
        <path d="M17.6 3H20l-6.2 7.1L21 21h-5.6l-4.4-5.8L6 21H3.6l6.6-7.6L3 3h5.7l4 5.3L17.6 3zm-1 16.2h1.6L7.5 4.7H5.8l10.8 14.5z" />
      </svg>
    );
  }
  if (name === "Instagram") {
    return (
      <svg {...common}>
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM17.4 6.6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
      </svg>
    );
  }
  if (name === "LinkedIn") {
    return (
      <svg {...common}>
        <path d="M6.5 9H3.7v11h2.8V9zM5.1 3.6A1.7 1.7 0 1 0 5.1 7a1.7 1.7 0 0 0 0-3.4zM20.3 13.3c0-3-1.6-4.4-3.7-4.4a3.2 3.2 0 0 0-2.9 1.6h-.1V9H11v11h2.8v-5.5c0-1.4.3-2.8 2-2.8s1.8 1.6 1.8 2.9V20h2.7v-6.7z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M23 12.2a10.7 10.7 0 0 0-10.7-7.6c-4 0-7.5 1.6-9.2 4.1A8.4 8.4 0 0 0 1.4 14c.3 2.6 1.8 4.8 4 6.1 2 .8 4.3 1.1 6.6 1.1 2.4 0 4.7-.4 6.7-1.2 2.2-1.3 3.7-3.5 4-6.1.1-.6.2-1.1.3-1.7zM10 16.6V9.8l6 3.4-6 3.4z" />
    </svg>
  );
}
