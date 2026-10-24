import { useEffect } from "react";
import { Link } from "react-router-dom";
import { email, posts, services, solutions } from "../data";

export function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy | Fencesense";
  }, []);

  return (
    <Legal title="Privacy Policy">
      <p>
        Fencesense Technologies Pvt. Ltd. uses the details you send through this website — your name, email, phone
        number, and message — only to reply to your enquiry.
      </p>
      <p>
        We do not sell that information. Messages opened from the enquiry form are composed in your own email app and
        sent to {email}. If you want a copy of what you sent us, or you want it deleted, write to that address.
      </p>
      <p>This site may link to social profiles and partner sites. Those sites have their own privacy practices.</p>
    </Legal>
  );
}

export function Terms() {
  useEffect(() => {
    document.title = "Terms of Use | Fencesense";
  }, []);

  return (
    <Legal title="Terms of Use">
      <p>
        The material on this website describes services offered by Fencesense Technologies Pvt. Ltd. It is general
        information, not a commitment to a particular scope, timeline, or result. Engagements are agreed separately.
      </p>
      <p>
        You may share links to these pages. Please do not copy the site design, logo, or articles and present them as
        your own. Partner and customer marks belong to their respective owners.
      </p>
      <p>News posts summarise public advisories. Always confirm details with the vendor bulletin before you act.</p>
    </Legal>
  );
}

export function Sitemap() {
  useEffect(() => {
    document.title = "Sitemap | Fencesense";
  }, []);

  return (
    <Legal title="Sitemap">
      <ul className="sitemap">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About us</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blogs/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
        <li><Link to="/contact">Contact us</Link></li>
        {services.map((item) => (
          <li key={item.slug}>
            <Link to={`/services/${item.slug}`}>{item.title}</Link>
          </li>
        ))}
        {solutions.map((item) => (
          <li key={item.slug}>
            <Link to={`/solutions/${item.slug}`}>{item.title}</Link>
          </li>
        ))}
        <li><Link to="/privacy">Privacy Policy</Link></li>
        <li><Link to="/terms">Terms of Use</Link></li>
      </ul>
    </Legal>
  );
}

function Legal({ title, children }) {
  return (
    <div className="page">
      <article className="post">
        <div className="container narrow">
          <p className="kicker">Fencesense</p>
          <h1>{title}</h1>
          {children}
        </div>
      </article>
    </div>
  );
}
