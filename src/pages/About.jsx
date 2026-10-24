import { useEffect } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { useEnquiry } from "../context/EnquiryContext";
import { offerings, stats } from "../data";

const pillars = [
  {
    title: "Cybersecurity Solutions",
    text: "Monitoring, threat intelligence, and response so the business stays protected as threats change.",
  },
  {
    title: "Network Solution",
    text: "Design and management that keep connectivity reliable and limit how far an incident can spread.",
  },
  {
    title: "Application Delivery Solution",
    text: "Performance, deployment, and protection for applications that have to stay available.",
  },
  {
    title: "On Demand Resource",
    text: "Specialists who join for a project, a gap, or a stretch of extra demand.",
  },
  {
    title: "Automation & Orchestration",
    text: "Repeatable operations across security, cloud, and delivery so teams spend less time on manual work.",
  },
];

export default function About() {
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    document.title = "About Us | Fencesense";
  }, []);

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <p className="kicker">About us</p>
          <h1>Securing the digital work your business depends on.</h1>
          <p>
            At Fencesense Technologies Pvt. Ltd., we provide cybersecurity, network management, application delivery,
            DevOps, and cloud security so organisations can move through a complex digital landscape with a plan that
            fits them.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="container split">
          <div>
            <SectionHeading kicker="Digital shield" title="Protection that stays with the business." align="left" />
            <p className="lede">
              At Fencesense, we are committed to securing your digital world. Our work in cybersecurity is there so the
              business remains protected as threats change, and so the people running it can see what is happening.
            </p>
            <button type="button" className="btn" onClick={openEnquiry}>
              Talk to our team
            </button>
          </div>
          <ul className="pillar-list">
            {pillars.map((item) => (
              <li key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-row">
          {stats.map((item) => (
            <div key={item.label}>
              <strong>
                {item.value}
                {item.suffix}
              </strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="container">
          <SectionHeading kicker="What we deliver" title="Manage and monitor the digital footprint" />
          <p className="center-copy">
            Effectively manage and monitor your digital footprint to improve security, support compliance, and protect
            the organisation&apos;s presence online.
          </p>
          <ul className="chip-list">
            {offerings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="center-actions">
            <Link className="btn" to="/contact">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
