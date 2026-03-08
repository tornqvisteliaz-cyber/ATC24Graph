import { NavLink, Route, Routes } from "react-router-dom";
import RadarMap from "./components/RadarMap.jsx";
import FlightPlanPanel from "./components/FlightPlanPanel.jsx";
import ControllerPanel from "./components/ControllerPanel.jsx";
import ATISPanel from "./components/ATISPanel.jsx";
import { useBackendSocket } from "./lib/useBackendSocket.js";

const BACKEND_URL = import.meta.env.VITE_BACKEND_WS_URL || "ws://localhost:8080/ws";

const App = () => {
  const { aircraftList, flightplans, controllers, atis, status } = useBackendSocket(BACKEND_URL);

  return (
    <div className="app-layout">
      <header>
        <h1>ATC24 Navigraph Style Radar</h1>
        <div>
          Socket: <span className={status}>{status}</span>
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
