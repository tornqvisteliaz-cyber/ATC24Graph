import { useMemo } from "react";

const AERONAV_APP_URL = "https://aeronav.space/app";

const RadarMap = ({ aircraft }) => {
  const stats = useMemo(() => {
    const emergencyCount = aircraft.filter((item) => item.isEmergencyOccuring).length;
    const airborneCount = aircraft.filter((item) => !item.isOnGround).length;

    return {
      total: aircraft.length,
      emergencyCount,
      airborneCount,
    };
  }, [aircraft]);

  return (
    <section className="radar-shell">
      <div className="radar-topbar">
        <div>
          <h2>AeroNav Live Chart</h2>
          <p>Map and chart source: AeroNav</p>
        </div>
        <a href={AERONAV_APP_URL} target="_blank" rel="noreferrer" className="open-link">
          Open AeroNav
        </a>
      </div>

      <div className="radar-content">
        <iframe
          src={AERONAV_APP_URL}
          title="AeroNav Map"
          className="aeronav-frame"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />

        <aside className="radar-sidepanel">
          <h3>ATCgraph Live Traffic</h3>
          <div className="stats-grid">
            <article>
              <span>Total</span>
              <strong>{stats.total}</strong>
            </article>
            <article>
              <span>Airborne</span>
              <strong>{stats.airborneCount}</strong>
            </article>
            <article>
              <span>Emergency</span>
              <strong className={stats.emergencyCount > 0 ? "danger" : ""}>{stats.emergencyCount}</strong>
            </article>
          </div>

          <ul className="traffic-list">
            {aircraft.slice(0, 25).map((item) => (
              <li key={item.callsign}>
                <div>
                  <strong>{item.callsign}</strong>
                  <span>{item.aircraftType || "Unknown type"}</span>
                </div>
                <div className={item.isEmergencyOccuring ? "danger" : ""}>
                  {item.altitude} ft / {item.groundSpeed || item.speed} kt
                </div>
              </li>
            ))}
            {aircraft.length === 0 && <li className="empty">Waiting for live aircraft feed…</li>}
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default RadarMap;
