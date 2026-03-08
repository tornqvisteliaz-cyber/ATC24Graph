import { useEffect, useMemo, useState } from "react";

const DEFAULT_STATE = {
  aircraft: {},
  flightplans: [],
  controllers: [],
  atis: [],
  sourceStatus: {
    status: "unknown",
  },
};

const resolveWsUrl = () => {
  if (import.meta.env.VITE_BACKEND_WS_URL) {
    return import.meta.env.VITE_BACKEND_WS_URL;
  }

  if (typeof window !== "undefined") {
    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    return `${wsProtocol}://${window.location.host}/ws`;
  }

  return "ws://localhost:8080/ws";
};

const resolveApiStateUrl = () => {
  if (import.meta.env.VITE_BACKEND_API_STATE_URL) {
    return import.meta.env.VITE_BACKEND_API_STATE_URL;
  }

  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/state`;
  }

  return "http://localhost:8080/api/state";
};

const useBackendSocket = () => {
  const [state, setState] = useState(DEFAULT_STATE);
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    let ws;
    let reconnectTimer;
    let pollTimer;

    const hydrateFromHttp = async () => {
      try {
        const response = await fetch(resolveApiStateUrl());
        if (!response.ok) return;
        const payload = await response.json();

        setState((previous) => ({
          ...previous,
          aircraft: payload.aircraftState ?? previous.aircraft,
          flightplans: payload.flightPlans ?? previous.flightplans,
          controllers: payload.controllers ?? previous.controllers,
          atis: payload.atisList ?? previous.atis,
          sourceStatus: payload.sourceStatus ?? previous.sourceStatus,
        }));
      } catch (_error) {
        // ignore poll failures in degraded mode
      }
    };

    const connect = () => {
      ws = new WebSocket(resolveWsUrl());

      ws.addEventListener("open", () => {
        setStatus("connected");
      });

      ws.addEventListener("message", (event) => {
        try {
          const message = JSON.parse(event.data);
          if (!message?.type) return;

          setState((previous) => ({
            ...previous,
            [message.type]: message.data,
          }));
        } catch (error) {
          console.error("Failed to parse backend event", error);
        }
      });

      ws.addEventListener("close", () => {
        setStatus("disconnected");
        reconnectTimer = setTimeout(connect, 2000);
      });

      ws.addEventListener("error", () => {
        ws.close();
      });
    };

    hydrateFromHttp();
    pollTimer = setInterval(hydrateFromHttp, 10000);
    connect();

    return () => {
      clearTimeout(reconnectTimer);
      clearInterval(pollTimer);
      ws?.close();
    };
  }, []);

  const aircraftList = useMemo(() => Object.values(state.aircraft), [state.aircraft]);

  return {
    ...state,
    aircraftList,
    status,
  };
};

export { useBackendSocket };
