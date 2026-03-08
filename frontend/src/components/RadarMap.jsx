import { useMemo } from "react";
import { CRS, DivIcon } from "leaflet";
import { ImageOverlay, MapContainer, Marker, Polyline, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const PROVIDED_MAP_URL =
  "https://cdn.discordapp.com/attachments/1396163583368237127/1444089062867599490/expensive.png?ex=69ae9d7e&is=69ad4bfe&hm=9970ff7e0dbe237de855a65d8693d543ec0f2141e53b3e2bf17cf8469876ae1a";

const MAP_BOUNDS = [
  [-220, -220],
  [220, 220],
];

const createAircraftIcon = (aircraft) =>
  new DivIcon({
    className: "aircraft-icon-wrapper",
    html: `<div class="aircraft-icon ${aircraft.isEmergencyOccuring ? "emergency" : "normal"}" style="transform: rotate(${aircraft.heading}deg)">▲</div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

const RadarMap = ({ aircraft }) => {
  const stats = useMemo(() => {
    const emergencyCount = aircraft.filter((item) => item.isEmergencyOccuring).length;
    const airborneCount = aircraft.filter((item) => !item.isOnGround).length;

    return {
      total: aircraft.length,
      emergencyCount,
      airborneCount,
    };
  }, [aircraft]);

  return (
    <section className="radar-fullscreen-wrap">
      <MapContainer
        className="radar-map radar-map-fullscreen"
        crs={CRS.Simple}
        bounds={MAP_BOUNDS}
        minZoom={-3}
        maxZoom={2}
        zoom={-1}
      >
        <ImageOverlay url={PROVIDED_MAP_URL} bounds={MAP_BOUNDS} />

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
              <Polyline
                positions={[position, lineEnd]}
                color={item.isEmergencyOccuring ? "#ff3b30" : "#ffffff"}
                weight={2}
              />
            </Marker>
          );
        })}
      </MapContainer>

      <aside className="radar-floating-panel">
        <h3>ATCgraph Live Traffic</h3>

        <div className="stats-grid">
          <article>
            <span>Total</span>
            <strong>{stats.total}</strong>
          </article>
          <article>
            <span>Airborne</span>
            <strong>{stats.airborneCount}</strong>
          </article>
          <article>
            <span>Emergency</span>
            <strong className={stats.emergencyCount > 0 ? "danger" : ""}>{stats.emergencyCount}</strong>
          </article>
        </div>

        <ul className="traffic-list">
          {aircraft.slice(0, 20).map((item) => (
            <li key={item.callsign}>
              <div>
                <strong>{item.callsign}</strong>
                <span>{item.aircraftType || "Unknown type"}</span>
              </div>
              <div className={item.isEmergencyOccuring ? "danger" : ""}>
                {item.altitude} ft / {item.groundSpeed || item.speed} kt
              </div>
            </li>
          ))}
          {aircraft.length === 0 && <li className="empty">Waiting for live aircraft feed…</li>}
        </ul>
      </aside>
    </section>
  );
};

export default RadarMap;
