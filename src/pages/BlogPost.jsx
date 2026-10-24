import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { posts } from "../data";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((entry) => entry.slug === slug);

  useEffect(() => {
    document.title = post ? `${post.title} | Fencesense` : "Article | Fencesense";
  }, [post]);

  if (!post) {
    return (
      <div className="page">
        <section className="page-hero">
          <div className="container">
            <h1>That article is not available.</h1>
            <Link className="btn" to="/blogs">
              All articles
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <article className="post">
        <div className="container narrow">
          <p className="kicker">
            {post.date} · {post.author}
          </p>
          <h1>{post.title}</h1>
          <img className="post-image" src={post.image} alt="" />
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link className="text-link" to="/blogs">
            Back to articles
          </Link>
        </div>
      </article>
    </div>
  );
}
