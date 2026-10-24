import { useEffect, useState } from "react";
import { email, phone, phoneHref } from "../data";
import { useEnquiry } from "../context/EnquiryContext";

export default function EnquiryDrawer() {
  const { open, closeEnquiry } = useEnquiry();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") closeEnquiry();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeEnquiry]);

  useEffect(() => {
    if (!open) setSent(false);
  }, [open]);

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
    <>
      <div
        className={`drawer-overlay ${open ? "is-open" : ""}`}
        onClick={closeEnquiry}
      />
      <aside className={`enquiry-drawer ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open ? true : undefined}>
        <button type="button" className="drawer-close" onClick={closeEnquiry} aria-label="Close">
          ×
        </button>
        <p className="kicker">Contact us</p>
        <h2>Make an Enquiry</h2>
        <p className="drawer-note">
          Tell us what you need. We will open your email app so the message goes to {email}. You can also call{" "}
          <a href={phoneHref}>{phone}</a>.
        </p>
        {sent ? (
          <p className="form-success" role="status">
            Your email app should open with the enquiry filled in. If it does not, write to {email}.
          </p>
        ) : (
          <form onSubmit={onSubmit}>
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
              <textarea name="message" required rows={5} />
            </label>
            <button className="btn" type="submit">
              Send a Message
            </button>
          </form>
        )}
      </aside>
    </>
  );
}
