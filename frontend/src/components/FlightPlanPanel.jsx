const FlightPlanPanel = ({ flightplans }) => (
  <div className="panel">
    <h2>Flight Plans</h2>
    <table>
      <thead>
        <tr>
          <th>Callsign</th>
          <th>Aircraft</th>
          <th>Departure</th>
          <th>Arrival</th>
          <th>FL</th>
          <th>Route</th>
        </tr>
      </thead>
      <tbody>
        {flightplans.map((fp) => (
          <tr key={`${fp.callsign}-${fp.route}`}>
            <td>{fp.callsign}</td>
            <td>{fp.aircraft}</td>
            <td>{fp.departing}</td>
            <td>{fp.arriving}</td>
            <td>{fp.flightlevel}</td>
            <td>{fp.route}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default FlightPlanPanel;
