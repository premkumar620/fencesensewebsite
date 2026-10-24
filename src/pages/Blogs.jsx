import { useEffect } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { posts } from "../data";

export default function Blogs() {
  useEffect(() => {
    document.title = "Blogs | Fencesense";
  }, []);

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <p className="kicker">Cyber security insight</p>
          <h1>Latest news and articles</h1>
          <p>Notes on cloud protection, platforms our clients ask about, and advisories worth acting on.</p>
        </div>
      </section>
      <section className="band">
        <div className="container">
          <SectionHeading kicker="From the team" title="Insights" />
          <div className="card-grid">
            {posts.map((post) => (
              <article className="article-card" key={post.slug}>
                <Link to={`/blogs/${post.slug}`} className="article-media">
                  <img src={post.image} alt="" />
                  <span>
                    {post.day}
                    <br />
                    {post.month}
                  </span>
                </Link>
                <div className="article-body">
                  <p className="meta">
                    <span>{post.date}</span>
                    <span>By {post.author}</span>
                  </p>
                  <h3>
                    <Link to={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
