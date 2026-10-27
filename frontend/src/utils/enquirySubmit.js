import { submitEnquiry } from "../api/client";

export async function sendEnquiry({ name, email, phone, message, preferredOffice }) {
  const payload = {
    full_name: name,
    email,
    phone,
    message,
    preferred_office: preferredOffice || "",
  };
  try {
    await submitEnquiry(payload);
    return { ok: true, via: "api" };
  } catch {
    return { ok: false, via: "api" };
  }
}

export function mailtoEnquiry(email, { name, email: mail, phone, message }) {
  const body = `Name: ${name}\nEmail: ${mail}\nPhone: ${phone}\n\n${message}`;
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Website enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
  return { ok: true, via: "mailto" };
}
