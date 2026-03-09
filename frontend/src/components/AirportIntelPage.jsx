const AirportIntelPage = () => {
  return (
    <section className="page grid-two">
      <article className="glass">
        <h2>Airport Intelligence: ESSA</h2>
        <p className="muted">Operational runway and procedure profile.</p>
        <ul>
          <li>Runway 19R/35L usage: 60%</li>
          <li>Runway 01L/19R usage: 30%</li>
          <li>Tower online chance: 68%</li>
          <li>Approach online chance: 54%</li>
        </ul>
      </article>
      <article className="glass">
        <h3>Popular Procedures</h3>
        <div className="chip-row">
          <span className="chip">ARS SID</span>
          <span className="chip">NELLI SID</span>
          <span className="chip">HMR STAR</span>
          <span className="chip">XILAN STAR</span>
        </div>
        <h3>Traffic Heatmap</h3>
        <p>Busiest: 1700-2100Z · Quiet: 0200-0600Z</p>
      </article>
    </section>
  );
};

export default AirportIntelPage;
