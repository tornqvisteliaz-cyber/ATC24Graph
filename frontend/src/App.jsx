import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import FlightPlannerPage from "./components/FlightPlannerPage.jsx";
import AirportIntelPage from "./components/AirportIntelPage.jsx";
import TaxiPlannerPage from "./components/TaxiPlannerPage.jsx";
import LiveDashboardPage from "./components/LiveDashboardPage.jsx";
import LogbookPage from "./components/LogbookPage.jsx";

const App = () => {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <p className="brand-kicker">MSFS 2024 OPS</p>
          <h1>VectorOps</h1>
          <p className="brand-copy">One tab for planning, flying and debriefing every mission.</p>
        </div>
        <nav className="menu">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/planner">Flight Planner</NavLink>
          <NavLink to="/airports">Airport Intel</NavLink>
          <NavLink to="/taxi">Taxi</NavLink>
          <NavLink to="/live">Live Dashboard</NavLink>
          <NavLink to="/logbook">Logbook</NavLink>
        </nav>
      </aside>
      <main className="main-view">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planner" element={<FlightPlannerPage />} />
          <Route path="/airports" element={<AirportIntelPage />} />
          <Route path="/taxi" element={<TaxiPlannerPage />} />
          <Route path="/live" element={<LiveDashboardPage />} />
          <Route path="/logbook" element={<LogbookPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
