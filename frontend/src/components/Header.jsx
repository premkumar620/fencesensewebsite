import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSite } from "../context/SiteContext";
import { useEnquiry } from "../context/EnquiryContext";

export default function Header() {
  const { services, solutions } = useSite();
  const { openEnquiry } = useEnquiry();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header className={`site-header site-header--premium ${solid ? "is-solid" : "is-transparent"} ${mounted ? "is-mounted" : ""}`}>
      <div className="site-header-glow" aria-hidden="true" />
      <div className="container header-bar">
        <Link to="/" className="brand header-reveal" aria-label="Fencesense home">
          <img src="/logo.png" alt="Fencesense" />
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
          <NavLink to="/" end className="header-reveal" style={{ animationDelay: "0.05s" }}>
            Home
          </NavLink>
          <NavLink to="/about" className="header-reveal" style={{ animationDelay: "0.1s" }}>
            About
          </NavLink>

          <div
            className={`nav-drop header-reveal ${dropdown === "services" ? "is-open" : ""}`}
            style={{ animationDelay: "0.15s" }}
            onMouseEnter={() => setDropdown("services")}
            onMouseLeave={() => setDropdown(null)}
          >
            <button
              type="button"
              className={pathname.startsWith("/services") ? "active" : ""}
              aria-expanded={dropdown === "services"}
              onClick={() => setDropdown((value) => (value === "services" ? null : "services"))}
            >
              Services
              <Chevron />
            </button>
            <div className="drop-panel">
              <Link to="/services" className="drop-panel-overview">
                All services
              </Link>
              {services.map((item) => (
                <Link key={item.slug} to={`/services/${item.slug}`}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div
            className={`nav-drop header-reveal ${dropdown === "solutions" ? "is-open" : ""}`}
            style={{ animationDelay: "0.2s" }}
            onMouseEnter={() => setDropdown("solutions")}
            onMouseLeave={() => setDropdown(null)}
          >
            <button
              type="button"
              className={pathname.startsWith("/solutions") ? "active" : ""}
              aria-expanded={dropdown === "solutions"}
              onClick={() => setDropdown((value) => (value === "solutions" ? null : "solutions"))}
            >
              Solutions
              <Chevron />
            </button>
            <div className="drop-panel">
              <Link to="/solutions" className="drop-panel-overview">
                All solutions
              </Link>
              {solutions.map((item) => (
                <Link key={item.slug} to={`/solutions/${item.slug}`}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/blogs" className="header-reveal" style={{ animationDelay: "0.25s" }}>
            Blogs
          </NavLink>
          <NavLink to="/contact" className="header-reveal" style={{ animationDelay: "0.3s" }}>
            Contact us
          </NavLink>

          <button
            type="button"
            className="btn btn-small nav-cta header-reveal header-cta-glow"
            style={{ animationDelay: "0.35s" }}
            onClick={openEnquiry}
          >
            Schedule a Demo
          </button>
        </nav>
      </div>
    </header>
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 4.2 6 8l4-3.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
