import { useState } from "react";

const FlightPlannerPage = () => {
  const [form, setForm] = useState({ dep: "EKCH", arr: "ESSA", aircraft: "A320", altitude: "FL360" });

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value.toUpperCase() }));
  };

  return (
    <section className="page grid-two">
      <article className="glass">
        <h2>AI Dispatch Planner</h2>
        <p className="muted">Generate a realistic route card and dispatch release in seconds.</p>
        <div className="form-grid">
          <label>
            Departure
            <input name="dep" value={form.dep} onChange={onChange} />
          </label>
          <label>
            Arrival
            <input name="arr" value={form.arr} onChange={onChange} />
          </label>
          <label>
            Aircraft
            <input name="aircraft" value={form.aircraft} onChange={onChange} />
          </label>
          <label>
            Cruise Altitude
            <input name="altitude" value={form.altitude} onChange={onChange} />
          </label>
        </div>
        <button className="button">Generate Dispatch</button>
      </article>

      <article className="glass route-card">
        <h3>
          DEP {form.dep} → ARR {form.arr}
        </h3>
        <p>Aircraft {form.aircraft}</p>
        <ul>
          <li>Route: {form.dep} N872 RERPA DCT TRS M852 XILAN {form.arr}</li>
          <li>SID: ARS 3A</li>
          <li>STAR: HMR 2S</li>
          <li>Cruise: {form.altitude}</li>
          <li>Fuel: 6.1t trip + 1.8t reserve + 1.2t alternate</li>
          <li>Alternate: ESGG</li>
          <li>Step climbs: FL320 → FL340 → {form.altitude}</li>
          <li>Predicted runway: 19R</li>
        </ul>
      </article>
    </section>
  );
};

export default FlightPlannerPage;
