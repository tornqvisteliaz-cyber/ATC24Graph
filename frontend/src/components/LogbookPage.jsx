const LogbookPage = () => {
  return (
    <section className="page">
      <article className="glass">
        <h2>Pilot Logbook & Post-Flight Analyzer</h2>
        <table>
          <thead>
            <tr>
              <th>Flight</th>
              <th>Landing VS</th>
              <th>Taxi Violations</th>
              <th>Fuel Margin</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>EKCH → ESSA</td>
              <td>-230 fpm</td>
              <td>2</td>
              <td>Good</td>
              <td>84</td>
            </tr>
            <tr>
              <td>ENGM → EKCH</td>
              <td>-172 fpm</td>
              <td>0</td>
              <td>Excellent</td>
              <td>93</td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default LogbookPage;
