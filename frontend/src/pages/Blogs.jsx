import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useEnquiry } from "../context/EnquiryContext";
import { useSite } from "../context/SiteContext";

function postSortKey(post) {
  const match = String(post.date || "").match(/(\d{1,2})\s+(\w+)/);
  if (!match) return 0;
  const months = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  };
  const month = months[match[2].toLowerCase()] || 0;
  return month * 100 + Number(match[1]);
}

export default function Blogs() {
  const { posts, phoneHref } = useSite();
  const { openEnquiry } = useEnquiry();

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => postSortKey(b) - postSortKey(a)),
    [posts],
  );

  useEffect(() => {
    document.title = "Blogs | Fencesense";
  }, []);

  return (
    <div className="page blogs-live-page">
      <section
        className="blogs-live-hero"
        style={{ "--blogs-hero-image": 'url("/blogs/blogs-banner.jpg")' }}
      >
        <div className="blogs-live-hero-bg" aria-hidden="true" />
        <div className="container blogs-live-hero-inner">
          <div className="blogs-live-hero-copy">
            <h1>Blogs and Articles</h1>
            <p className="blogs-live-lede">
              Explore our insightful blogs and articles for the latest trends, best practices, and expert tips on
              cybersecurity and technology.
            </p>
            <div className="blogs-live-actions">
              <button type="button" className="blogs-live-btn" onClick={openEnquiry}>
                Ask Experts
              </button>
              <a className="blogs-live-btn" href={phoneHref}>
                Schedule Call
                <PhoneIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="band blogs-live-catalog">
        <div className="container">
          <div className="card-grid blogs-live-grid">
            {sortedPosts.map((post) => (
              <article className="article-card blogs-live-card" key={post.slug}>
                <Link to={`/blogs/${post.slug}`} className="article-media">
                  <img src={post.image} alt="" />
                  <span className="blogs-live-date-badge">
                    {post.day}
                    <br />
                    {post.month}
                  </span>
                </Link>
                <div className="article-body blogs-live-card-body">
                  <p className="meta blogs-live-meta">
                    <span>{post.date}</span>
                    <span>By {post.author}</span>
                  </p>
                  <h3 className="blogs-live-card-title">
                    <Link to={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="blogs-live-card-excerpt">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>

          {!sortedPosts.length ? (
            <p className="blogs-live-empty">No articles published yet. Check back soon.</p>
          ) : null}
        </div>
      </section>

      <section className="blogs-live-cta-band" aria-labelledby="blogs-live-cta-title">
        <div className="container blogs-live-cta-inner">
          <div className="blogs-live-cta-copy">
            <h2 id="blogs-live-cta-title">Get in touch with our experts</h2>
            <p>
              Questions about an advisory or how it applies to your environment? Our consultants respond with practical
              guidance—not generic sales copy.
            </p>
          </div>
          <button type="button" className="btn blogs-live-cta-btn" onClick={openEnquiry}>
            Ask Experts
          </button>
        </div>
      </section>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path
        d="M5 4h3l2 5-2 1a13 13 0 006 6l1-2 5 2v3a2 2 0 01-2 2A16 16 0 015 6a2 2 0 012-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
