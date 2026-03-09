import { Link } from "react-router-dom";

const quickStats = [
  { label: "Active Flights", value: "12" },
  { label: "Avg Dispatch Time", value: "18s" },
  { label: "Today Landings", value: "36" },
  { label: "ATC Coverage", value: "74%" }
];

const HomePage = () => {
  return (
    <section className="page">
      <article className="glass hero">
        <p className="tag">Dispatch + Airport Intel + Taxi + Live Support</p>
        <h2>Plan. Fly. Review.</h2>
        <p>
          VectorOps combines your core MSFS 2024 workflow in one cockpit-ready interface for VATSIM, ATC24 and
          virtual airline operations.
        </p>
        <div className="cta-row">
          <Link className="button" to="/planner">
            Generate Dispatch
          </Link>
          <Link className="button secondary" to="/live">
            Open Live Dashboard
          </Link>
        </div>
      </article>

      <div className="metric-grid">
        {quickStats.map((item) => (
          <article key={item.label} className="glass metric-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HomePage;
