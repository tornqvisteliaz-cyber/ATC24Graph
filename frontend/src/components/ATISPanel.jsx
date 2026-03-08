import { useMemo, useState } from "react";

const ATISPanel = ({ atis }) => {
  const [airport, setAirport] = useState("");

  const filtered = useMemo(() => {
    if (!airport.trim()) return atis;
    return atis.filter((item) => item.airport.toLowerCase().includes(airport.toLowerCase()));
  }, [airport, atis]);

  return (
    <div className="panel">
      <h2>ATIS</h2>
      <input
        value={airport}
        onChange={(event) => setAirport(event.target.value)}
        placeholder="Search airport"
      />
      <div className="atis-list">
        {filtered.map((item) => (
          <article key={`${item.airport}-${item.letter}`}>
            <h3>
              {item.airport} ({item.letter})
            </h3>
            <p>{item.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ATISPanel;
