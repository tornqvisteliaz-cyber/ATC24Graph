import WebSocket from "ws";
import {
  setAircraftState,
  setFlightPlans,
  setControllers,
  setAtis,
} from "./stateStore.js";

const SOURCE_WS_URL = "wss://24data.ptfs.app/wss";
const RECONNECT_DELAY_MS = 5000;

const connectToAtc24 = ({ onStateChange }) => {
  let ws;
  let reconnectTimeout;

  const scheduleReconnect = () => {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = setTimeout(connect, RECONNECT_DELAY_MS);
  };

  const handleMessage = (rawMessage) => {
    try {
      const parsed = JSON.parse(rawMessage.toString());
      const type = parsed?.t;
      const data = parsed?.d;

      switch (type) {
        case "ACFT_DATA":
        case "EVENT_ACFT_DATA":
          setAircraftState(data);
          onStateChange?.("aircraft");
          break;
        case "FLIGHT_PLAN":
        case "EVENT_FLIGHT_PLAN":
          setFlightPlans(data);
          onStateChange?.("flightplans");
          break;
        case "CONTROLLERS":
          setControllers(data);
          onStateChange?.("controllers");
          break;
        case "ATIS":
          setAtis(data);
          onStateChange?.("atis");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Failed to parse ATC24 message", error);
    }
  };

  const connect = () => {
    ws = new WebSocket(SOURCE_WS_URL);

    ws.on("open", () => {
      console.log(`Connected to ATC24 source: ${SOURCE_WS_URL}`);
    });

    ws.on("message", handleMessage);

    ws.on("close", () => {
      console.warn("ATC24 source disconnected. Reconnecting...");
      scheduleReconnect();
    });

    ws.on("error", (error) => {
      console.error("ATC24 source websocket error", error);
      ws.close();
    });
  };

  connect();

  return () => {
    clearTimeout(reconnectTimeout);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  };
};

export { connectToAtc24 };
