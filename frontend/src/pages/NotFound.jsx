import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page not found | Fencesense";
  }, []);

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <p className="kicker">404</p>
          <h1>That page is not on this site.</h1>
          <Link className="btn" to="/">
            Back home
          </Link>
        </div>
      </section>
    </div>
  );
}
