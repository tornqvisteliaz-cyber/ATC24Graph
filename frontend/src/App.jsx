import { NavLink, Route, Routes } from "react-router-dom";
import RadarMap from "./components/RadarMap.jsx";
import FlightPlanPanel from "./components/FlightPlanPanel.jsx";
import ControllerPanel from "./components/ControllerPanel.jsx";
import ATISPanel from "./components/ATISPanel.jsx";
import { useBackendSocket } from "./lib/useBackendSocket.js";

const App = () => {
  const { aircraftList, flightplans, controllers, atis, status, sourceStatus } = useBackendSocket();

  return (
    <div className="app-layout">
      <header>
        <h1>ATCgraph</h1>
        <p className="subtitle">Live ATC24 traffic on your custom radar map</p>
        <div className="status-row">
          <span>
            Client Socket: <strong className={status}>{status}</strong>
          </span>
          <span>
            ATC24 Source: <strong className={sourceStatus?.status || "unknown"}>{sourceStatus?.status || "unknown"}</strong>
          </span>
        </div>
        <nav>
          <NavLink to="/">Radar</NavLink>
          <NavLink to="/flightplans">Flight Plans</NavLink>
          <NavLink to="/controllers">Controllers</NavLink>
          <NavLink to="/atis">ATIS</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<RadarMap aircraft={aircraftList} />} />
          <Route path="/flightplans" element={<FlightPlanPanel flightplans={flightplans} />} />
          <Route path="/controllers" element={<ControllerPanel controllers={controllers} />} />
          <Route path="/atis" element={<ATISPanel atis={atis} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
