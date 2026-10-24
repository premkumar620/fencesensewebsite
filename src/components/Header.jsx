import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { services, solutions } from "../data";
import { useEnquiry } from "../context/EnquiryContext";

export default function Header() {
  const { openEnquiry } = useEnquiry();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  const solid = scrolled || pathname !== "/" || menuOpen;

  return (
    <header className={`site-header ${solid ? "is-solid" : ""}`}>
      <div className="container header-bar">
        <Link to="/" className="brand" aria-label="Fencesense home">
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
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>

          <div
            className={`nav-drop ${dropdown === "services" ? "is-open" : ""}`}
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
              {services.map((item) => (
                <Link key={item.slug} to={`/services/${item.slug}`}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div
            className={`nav-drop ${dropdown === "solutions" ? "is-open" : ""}`}
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
              {solutions.map((item) => (
                <Link key={item.slug} to={`/solutions/${item.slug}`}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/contact">Contact us</NavLink>

          <button type="button" className="btn btn-small nav-cta" onClick={openEnquiry}>
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
