import { MapContainer, TileLayer } from "react-leaflet";
import AircraftLayer from "./AircraftLayer.jsx";
import "leaflet/dist/leaflet.css";

const RadarMap = ({ aircraft }) => (
  <MapContainer className="radar-map" center={[0, 0]} zoom={4} minZoom={2} maxZoom={10}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <AircraftLayer aircraft={aircraft} />
  </MapContainer>
);

export default RadarMap;
