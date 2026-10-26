import { useEffect, useState } from "react";
import { useEnquiry } from "../context/EnquiryContext";
import { useSite } from "../context/SiteContext";
import { mailtoEnquiry, sendEnquiry } from "../utils/enquirySubmit";

const reachOutPoints = [
  "Security, cloud, and network specialists on every enquiry",
  "Practical next steps — assessment, scope, or managed support",
  "Confidential handling of your environment details",
];

export default function Contact() {
  const { cin, email, offices, phone, phoneHref, socials } = useSite();
  const { openEnquiry } = useEnquiry();
  const [sent, setSent] = useState(false);
  const [submitVia, setSubmitVia] = useState("api");
  const defaultOffice = offices.find((entry) => entry.primary) ?? offices[0];
  const [activeOfficeId, setActiveOfficeId] = useState(defaultOffice.id);
  const activeOffice = offices.find((entry) => entry.id === activeOfficeId) ?? defaultOffice;

  useEffect(() => {
    document.title = "Contact us | Fencesense";
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const mail = String(data.get("email") || "").trim();
    const mobile = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();
    const payload = { name, email: mail, phone: mobile, message, preferredOffice: activeOfficeId };
    const result = await sendEnquiry(payload);
    if (result.ok) {
      setSubmitVia("api");
      setSent(true);
      event.currentTarget.reset();
      return;
    }
    mailtoEnquiry(email, payload);
    setSubmitVia("mailto");
    setSent(true);
  }

  return (
    <div className="page contact-page">
      <section className="hero contact-hero-home">
        <div className="hero-media" aria-hidden="true" style={{ "--hero-media-image": 'url("/about/about-banner.jpeg")' }} />
        <div className="container hero-layout">
          <div className="hero-copy contact-hero-copy-block">
            <div className="hero-heading contact-hero-heading-compact">
              <p className="hero-kicker hero-kicker--static">Contact us</p>
              <h1>Get in touch with our experts</h1>
            </div>
            <p>
              Enquiries, support, or a consultation — tell us about your environment and goals. We help organizations
              strengthen cybersecurity, cloud, network, and digital operations across India.
            </p>
            <div className="hero-actions-row">
              <a className="hero-demo" href="#contact-form">
                <span>
                  Send a message
                  <ArrowIcon />
                </span>
              </a>
              <button type="button" className="hero-demo hero-demo-secondary" onClick={openEnquiry}>
                <span>Quick enquiry</span>
              </button>
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
          <a className="contact-channel-card" href="#our-offices">
            <span className="contact-channel-icon" aria-hidden="true">
              <PinIcon />
            </span>
            <span className="contact-channel-label">Our offices</span>
            <strong>{offices.length} locations in India</strong>
            <span className="contact-channel-hint">View addresses and maps below</span>
          </a>
        </div>
      </section>

      <section className="contact-offices-section" id="our-offices" aria-labelledby="contact-offices-heading">
        <div className="container">
          <header className="contact-offices-head">
            <p className="kicker">Locations</p>
            <span className="accent-line" aria-hidden="true" />
            <h2 id="contact-offices-heading">Visit our offices</h2>
            <p className="lede">Select a location for the full address and map. Directions open in Google Maps.</p>
          </header>

          <div className="contact-offices-grid" role="tablist" aria-label="Office locations">
            {offices.map((office) => {
              const active = office.id === activeOfficeId;
              return (
                <button
                  key={office.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`contact-office-card${active ? " is-active" : ""}`}
                  onClick={() => setActiveOfficeId(office.id)}
                >
                  <span className="contact-office-card-top">
                    <span className="contact-office-icon" aria-hidden="true">
                      <PinIcon />
                    </span>
                    <span className="contact-office-meta">
                      <span className="contact-office-label">{office.label}</span>
                      <strong className="contact-office-city">{office.city}</strong>
                      <span className="contact-office-region">{office.region}</span>
                    </span>
                  </span>
                  <address className="contact-office-address">
                    {office.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                  {office.cin ? (
                    <p className="contact-office-cin">
                      <span>CIN</span>
                      <strong>{office.cin}</strong>
                    </p>
                  ) : null}
                  {office.primary ? <span className="contact-office-badge">Primary</span> : null}
                </button>
              );
            })}
          </div>

          <div className="contact-map-shell contact-map-shell--premium" role="tabpanel" aria-live="polite">
            <aside className="contact-map-card">
              <p className="contact-map-card-kicker">{activeOffice.label}</p>
              <h3>{activeOffice.title}</h3>
              <p className="contact-map-city">
                {activeOffice.city}, {activeOffice.region}
              </p>
              <address className="contact-map-address">
                {activeOffice.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              {activeOffice.cin ? (
                <p className="contact-map-cin">
                  <span>CIN</span>
                  <strong>{activeOffice.cin}</strong>
                </p>
              ) : null}
              <ul className="contact-map-actions">
                <li>
                  <a className="btn" href={activeOffice.mapsHref} target="_blank" rel="noreferrer">
                    Open in Google Maps
                  </a>
                </li>
                <li>
                  <a className="text-link" href={phoneHref}>
                    Call {activeOffice.phone || phone}
                  </a>
                </li>
              </ul>
            </aside>

            <div className="contact-map-frame">
              <iframe
                key={activeOffice.id}
                title={`${activeOffice.city} office location on Google Maps`}
                src={activeOffice.mapsEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="contact-main">
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
                {submitVia === "api"
                  ? "Thank you — we received your message and will respond shortly."
                  : `Your email app should open with this enquiry addressed to ${email}. If nothing opens, send the note directly.`}
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
              <p className="contact-aside-kicker">Company details</p>
              <p className="contact-aside-meta">
                <span>CIN</span>
                <strong>{cin}</strong>
              </p>
              <p className="contact-aside-meta">
                <span>Email</span>
                <strong>
                  <a href={`mailto:${email}`}>{email}</a>
                </strong>
              </p>
              <a className="text-link" href="#our-offices">
                View all office locations
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
