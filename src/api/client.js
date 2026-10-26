const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function apiUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (API_BASE) return `${API_BASE}${normalized}`;
  return normalized;
}

async function parseJson(response) {
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `HTTP ${response.status}`);
  }
  return response.json();
}

export async function fetchBootstrap() {
  return parseJson(await fetch(apiUrl("/api/v1/bootstrap/")));
}

export async function fetchStats() {
  return parseJson(await fetch(apiUrl("/api/v1/stats/")));
}

export async function fetchOfferings() {
  return parseJson(await fetch(apiUrl("/api/v1/offerings/")));
}

export async function fetchSocials() {
  return parseJson(await fetch(apiUrl("/api/v1/socials/")));
}

/** Trusted by Our Customers — quote slider */
export async function fetchTestimonials() {
  return parseJson(await fetch(apiUrl("/api/v1/testimonials/")));
}

/** Partner companies marquee */
export async function fetchPartners() {
  return parseJson(await fetch(apiUrl("/api/v1/partners/")));
}

/** Our Customers logo strip */
export async function fetchCustomers() {
  return parseJson(await fetch(apiUrl("/api/v1/customers/")));
}

export async function fetchCatalogDetail(kind, slug) {
  const segment = kind === "service" ? "services" : "solutions";
  return parseJson(await fetch(apiUrl(`/api/v1/content/${segment}/${slug}/`)));
}

export async function fetchBlogPost(slug) {
  return parseJson(await fetch(apiUrl(`/api/v1/content/blog/${slug}/`)));
}

export async function submitEnquiry(payload) {
  const response = await fetch(apiUrl("/api/v1/enquiries/"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson(response);
}
