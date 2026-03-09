const items = [
  ["Fuel Remaining", "4.8 t"],
  ["Fuel @ Destination", "2.1 t"],
  ["Top of Descent", "56 nm"],
  ["Distance to TOD", "92 nm"],
  ["Descent Rate", "-1700 fpm"],
  ["Crosswind Alert", "11 kt from 240°"]
];

const LiveDashboardPage = () => {
  return (
    <section className="page">
      <article className="glass">
        <h2>Live Flight Dashboard</h2>
        <p className="muted">SimConnect-ready cockpit second screen.</p>
        <div className="metric-grid">
          {items.map(([label, value]) => (
            <article key={label} className="glass metric-card">
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
};

export default LiveDashboardPage;
