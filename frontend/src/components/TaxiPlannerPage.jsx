const TaxiPlannerPage = () => {
  return (
    <section className="page grid-two">
      <article className="glass">
        <h2>Smart Taxi System</h2>
        <p className="muted">Gate to runway guidance with turn-by-turn instructions.</p>
        <div className="form-grid">
          <label>
            Gate
            <input value="A12" readOnly />
          </label>
          <label>
            Departure Runway
            <input value="22R" readOnly />
          </label>
        </div>
        <ol>
          <li>Pushback approved facing west</li>
          <li>Taxi via A, B3, C</li>
          <li>Hold short RWY 22R</li>
        </ol>
      </article>
      <article className="glass taxi-map">
        <h3>Interactive Airport Map (MVP placeholder)</h3>
        <div className="map-placeholder">A12 → A → B3 → C → RWY 22R</div>
      </article>
    </section>
  );
};

export default TaxiPlannerPage;
