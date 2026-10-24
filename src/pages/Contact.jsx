import { useEffect, useState } from "react";
import { addressLines, cin, email, mapsHref, phone, phoneHref } from "../data";

export default function Contact() {
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
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <p className="kicker">Contact</p>
          <h1>Get in Touch</h1>
          <p>
            Get in touch with Fencesense Technologies for enquiries, support, or a consultation. We are here to help
            with cybersecurity, cloud, network, and digital work.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="container contact-layout">
          <div>
            <h2>Get in touch with our experts</h2>
            <p className="lede">
              Share a short note about your environment and what you want to improve. We will follow up with a practical
              next step.
            </p>
            <ul className="contact-points">
              <li>
                <span>Call us</span>
                <a href={phoneHref}>{phone}</a>
              </li>
              <li>
                <span>Email us</span>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <span>Registered office</span>
                <a href={mapsHref} target="_blank" rel="noreferrer">
                  {addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </a>
              </li>
              <li>
                <span>CIN</span>
                <strong>{cin}</strong>
              </li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <h2>Make an Enquiry</h2>
            {sent ? (
              <p className="form-success" role="status">
                Your email app should open with this enquiry addressed to {email}. If nothing opens, send the note
                directly.
              </p>
            ) : null}
            <label>
              Full name
              <input name="name" type="text" required autoComplete="name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              Phone
              <input name="phone" type="tel" required autoComplete="tel" />
            </label>
            <label>
              Message
              <textarea name="message" rows={5} required />
            </label>
            <button className="btn" type="submit">
              Send a Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
