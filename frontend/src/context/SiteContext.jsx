import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchBootstrap } from "../api/client";
import * as fallback from "../data";

const SiteContext = createContext(null);

function primaryOffice(offices) {
  return offices.find((entry) => entry.primary) ?? offices[0] ?? null;
}

function buildFromFallback() {
  const offices = fallback.offices;
  const primary = primaryOffice(offices);
  return {
    source: "static",
    company: {
      name: primary?.title || "Fencesense Technologies Pvt. Ltd.",
      phone: fallback.phone,
      phoneHref: fallback.phoneHref,
      email: fallback.email,
      cin: fallback.cin,
    },
    site: {
      stats: fallback.stats,
      offerings: fallback.offerings,
      partner_logos: fallback.partnerLogos,
      customer_logos: fallback.customerLogos,
      testimonials: fallback.testimonials,
      socials: fallback.socials,
      pages: {},
    },
    offices,
    services: fallback.services,
    solutions: fallback.solutions,
    posts: fallback.posts,
  };
}

function logoPaths(entries, legacyPaths) {
  if (legacyPaths?.length) return legacyPaths;
  if (!entries?.length) return [];
  return entries.map((row) => (typeof row === "string" ? row : row.image)).filter(Boolean);
}

function offeringTitles(entries, legacyList) {
  if (legacyList?.length) return legacyList;
  if (!entries?.length) return [];
  return entries.map((row) => (typeof row === "string" ? row : row.title)).filter(Boolean);
}

function normalizeBootstrap(data) {
  const site = data.site ?? {};
  const stats = data.stats ?? site.stats ?? [];
  const offerings = offeringTitles(data.offerings, site.offerings);
  const socials = data.socials ?? site.socials ?? [];
  const testimonials = data.testimonials ?? site.testimonials ?? [];
  const partnerLogos = logoPaths(data.partners, site.partner_logos);
  const customerLogos = logoPaths(data.customers, site.customer_logos);

  return {
    company: data.company ?? {},
    site: {
      stats,
      offerings,
      partner_logos: partnerLogos,
      customer_logos: customerLogos,
      testimonials,
      socials,
      pages: site.pages ?? {},
    },
    stats,
    offerings,
    socials,
    testimonials,
    partners: data.partners ?? [],
    customers: data.customers ?? [],
    offices: data.offices ?? [],
    services: data.services ?? [],
    solutions: data.solutions ?? [],
    posts: data.posts ?? [],
  };
}

export function SiteProvider({ children }) {
  const [payload, setPayload] = useState(buildFromFallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBootstrap();
      setPayload({ ...normalizeBootstrap(data), source: "api" });
    } catch (err) {
      setPayload(buildFromFallback());
      setError(err instanceof Error ? err.message : "Could not reach API");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [refresh]);

  const value = useMemo(() => {
    const primary = primaryOffice(payload.offices || []);
    const addressLines = primary?.lines || fallback.addressLines;
    const site = payload.site ?? {};
    return {
      loading,
      error,
      source: payload.source,
      isApiLive: payload.source === "api" && !error,
      refresh,
      company: payload.company,
      site,
      offices: payload.offices,
      services: payload.services,
      solutions: payload.solutions,
      posts: payload.posts,
      pages: site.pages ?? {},
      phone: payload.company?.phone ?? fallback.phone,
      phoneHref: payload.company?.phoneHref ?? fallback.phoneHref,
      email: payload.company?.email ?? fallback.email,
      cin: payload.company?.cin ?? fallback.cin,
      stats: site.stats ?? fallback.stats,
      offerings: site.offerings ?? fallback.offerings,
      partnerLogos: site.partner_logos ?? fallback.partnerLogos,
      customerLogos: site.customer_logos ?? fallback.customerLogos,
      testimonials: site.testimonials ?? fallback.testimonials,
      socials: site.socials ?? fallback.socials,
      addressLines,
      mapsHref: primary?.mapsHref ?? fallback.mapsHref,
      mapsEmbedSrc: primary?.mapsEmbedSrc ?? fallback.mapsEmbedSrc,
    };
  }, [payload, loading, error, refresh]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
