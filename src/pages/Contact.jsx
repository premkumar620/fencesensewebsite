import { useEffect, useState } from "react";
import { addressLines, cin, email, mapsEmbedSrc, mapsHref, phone, phoneHref, socials } from "../data";
import { useEnquiry } from "../context/EnquiryContext";

const reachOutPoints = [
  "Security, cloud, and network specialists on every enquiry",
  "Practical next steps — assessment, scope, or managed support",
  "Confidential handling of your environment details",
];

export default function Contact() {
  const { openEnquiry } = useEnquiry();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Contact us | Fencesense";
  }, []);

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const mail = String(data.get("email") || "").trim();
    const mobile = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = `Name: ${name}\nEmail: ${mail}\nPhone: ${mobile}\n\n${message}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Website enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className="page contact-page">
      <section className="contact-hero">
        <div
          className="contact-hero-bg"
          aria-hidden="true"
          style={{ "--detail-hero-image": 'url("/about/about-banner.jpeg")' }}
        />
        <div className="container contact-hero-inner">
          <div className="contact-hero-copy">
            <p className="kicker">Contact us</p>
            <span className="accent-line" aria-hidden="true" />
            <h1>Get in touch with our experts</h1>
            <p>
              Enquiries, support, or a consultation — tell us about your environment and goals. We help organizations
              strengthen cybersecurity, cloud, network, and digital operations.
            </p>
            <div className="detail-hero-actions contact-hero-actions">
              <a className="btn" href="#contact-form">
                Send a message
              </a>
              <button type="button" className="btn detail-btn-outline" onClick={openEnquiry}>
                Quick enquiry
              </button>
              <a className="text-link" href={phoneHref}>
                Call {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-channels" aria-label="Contact channels">
        <div className="container contact-channels-grid">
          <a className="contact-channel-card" href={phoneHref}>
            <span className="contact-channel-icon" aria-hidden="true">
              <PhoneIcon />
            </span>
            <span className="contact-channel-label">Call us</span>
            <strong>{phone}</strong>
            <span className="contact-channel-hint">Mon–Sat, business hours</span>
          </a>
          <a className="contact-channel-card" href={`mailto:${email}`}>
            <span className="contact-channel-icon" aria-hidden="true">
              <MailIcon />
            </span>
            <span className="contact-channel-label">Email us</span>
            <strong>{email}</strong>
            <span className="contact-channel-hint">We reply within one business day</span>
          </a>
          <a className="contact-channel-card" href={mapsHref} target="_blank" rel="noreferrer">
            <span className="contact-channel-icon" aria-hidden="true">
              <PinIcon />
            </span>
            <span className="contact-channel-label">Visit us</span>
            <strong>New Delhi, 110071</strong>
            <span className="contact-channel-hint">Open directions in Google Maps</span>
          </a>
        </div>
      </section>

      <section className="band contact-main">
        <div className="container contact-main-shell">
          <form className="contact-form-panel" id="contact-form" onSubmit={onSubmit}>
            <header className="contact-form-head">
              <p className="contact-form-kicker">Make an enquiry</p>
              <h2>Tell us what you need</h2>
              <p className="contact-form-lede">
                Share a short note about your stack, compliance drivers, or incidents. We will follow up with a clear
                next step.
              </p>
            </header>

            {sent ? (
              <p className="form-success" role="status">
                Your email app should open with this enquiry addressed to {email}. If nothing opens, send the note
                directly.
              </p>
            ) : null}

            <div className="contact-form-grid">
              <label className="contact-field">
                <span>Full name</span>
                <input name="name" type="text" required autoComplete="name" placeholder="Your name" />
              </label>
              <label className="contact-field">
                <span>Email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
              </label>
              <label className="contact-field contact-field-full">
                <span>Phone</span>
                <input name="phone" type="tel" required autoComplete="tel" placeholder="+91 …" />
              </label>
              <label className="contact-field contact-field-full">
                <span>Message</span>
                <textarea name="message" rows={5} required placeholder="Briefly describe your goals or challenge…" />
              </label>
            </div>

            <div className="contact-form-foot">
              <button className="btn contact-submit" type="submit">
                Send message
                <ArrowIcon />
              </button>
              <p className="contact-form-note">
                By submitting, you agree we may contact you about this request. We do not share your details with third
                parties.
              </p>
            </div>
          </form>

          <aside className="contact-aside">
            <div className="contact-aside-card contact-aside-highlight">
              <p className="contact-aside-kicker">Why Fencesense</p>
              <h3>Enterprise-grade support, direct access</h3>
              <ul className="contact-aside-list">
                {reachOutPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="contact-aside-card">
              <p className="contact-aside-kicker">Registered office</p>
              <address className="contact-aside-address">
                {addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <p className="contact-aside-meta">
                <span>CIN</span>
                <strong>{cin}</strong>
              </p>
              <a className="text-link" href={mapsHref} target="_blank" rel="noreferrer">
                Get directions
              </a>
            </div>

            <div className="contact-aside-card contact-aside-social">
              <p className="contact-aside-kicker">Connect</p>
              <ul className="contact-social-list">
                {socials.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="band contact-map-section" aria-labelledby="contact-map-heading">
        <div className="container">
          <header className="contact-map-head">
            <p className="kicker">Location</p>
            <span className="accent-line" aria-hidden="true" />
            <h2 id="contact-map-heading">Find us on the map</h2>
            <p className="lede">
              Our registered office is in South West Delhi. Use the map for directions or open the full view in Google
              Maps.
            </p>
          </header>

          <div className="contact-map-shell">
            <aside className="contact-map-card">
              <p className="contact-map-card-kicker">Registered office</p>
              <h3>Fencesense Technologies Pvt. Ltd.</h3>
              <address className="contact-map-address">
                {addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <ul className="contact-map-actions">
                <li>
                  <a className="btn" href={mapsHref} target="_blank" rel="noreferrer">
                    Open in Google Maps
                  </a>
                </li>
                <li>
                  <a className="text-link" href={phoneHref}>
                    Call {phone}
                  </a>
                </li>
              </ul>
            </aside>

            <div className="contact-map-frame">
              <iframe
                title="Fencesense Technologies office location on Google Maps"
                src={mapsEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 3.5c.4-.9 1.5-1.2 2.3-.7l2.2 1.3c.7.4.9 1.3.5 2l-1 1.7c.8 1.6 2.2 3 3.8 3.8l1.7-1c.7-.4 1.6-.2 2 .5l1.3 2.2c.5.8.2 1.9-.7 2.3l-1.5.6c-2.5 1-5.3-.2-7.4-2.3S2.6 9.6 3.6 7.1l.6-1.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
