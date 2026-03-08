import { Marker, Polyline, Tooltip } from "react-leaflet";
import { DivIcon } from "leaflet";

const createAircraftIcon = (aircraft) =>
  new DivIcon({
    className: "aircraft-icon-wrapper",
    html: `<div class="aircraft-icon ${aircraft.isEmergencyOccuring ? "emergency" : "normal"}" style="transform: rotate(${aircraft.heading}deg)">▲</div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

const AircraftLayer = ({ aircraft }) => (
  <>
    {aircraft.map((item) => {
      const position = [item.position.nmY, item.position.nmX];
      const radians = (item.heading * Math.PI) / 180;
      const lineEnd = [
        item.position.nmY + Math.cos(radians) * 2,
        item.position.nmX + Math.sin(radians) * 2,
      ];

      return (
        <Marker key={item.callsign} position={position} icon={createAircraftIcon(item)}>
          <Tooltip direction="top" offset={[0, -12]}>
            <div>
              <strong>{item.callsign}</strong>
              <br />
              {item.altitude} ft • {item.groundSpeed || item.speed} kt
            </div>
          </Tooltip>
          <Polyline positions={[position, lineEnd]} color={item.isEmergencyOccuring ? "#ff3b30" : "#ffffff"} />
        </Marker>
      );
    })}
  </>
);

export default AircraftLayer;
