const ControllerPanel = ({ controllers }) => (
  <div className="panel">
    <h2>Controllers</h2>
    <table>
      <thead>
        <tr>
          <th>Airport</th>
          <th>Position</th>
          <th>Holder</th>
          <th>Queue</th>
        </tr>
      </thead>
      <tbody>
        {controllers.map((controller) => (
          <tr key={`${controller.airport}-${controller.position}`}>
            <td>{controller.airport}</td>
            <td>{controller.position}</td>
            <td>{controller.holder || "-"}</td>
            <td>{controller.queue.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ControllerPanel;
