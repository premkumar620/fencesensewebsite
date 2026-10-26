import { useEffect, useState } from "react";
import { useSite } from "../context/SiteContext";

export default function StatsBand() {
  const { stats } = useSite();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = document.getElementById("stats");
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" id="stats">
      <div className="container stats-row">
        {stats.map((item) => (
          <div key={item.label}>
            <strong>
              <CountUp value={item.value} run={visible} />
              {item.suffix}
            </strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountUp({ value, run }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!run) return undefined;
    const start = performance.now();
    const duration = 1400;
    let frame = 0;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setCurrent(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, value]);

  return current;
}
