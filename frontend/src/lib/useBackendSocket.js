import { useEffect, useMemo, useState } from "react";

const DEFAULT_STATE = {
  aircraft: {},
  flightplans: [],
  controllers: [],
  atis: [],
};

const useBackendSocket = (url) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    let ws;
    let reconnectTimer;

    const connect = () => {
      ws = new WebSocket(url);

      ws.addEventListener("open", () => setStatus("connected"));

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

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      ws?.close();
    };
  }, [url]);

  const aircraftList = useMemo(() => Object.values(state.aircraft), [state.aircraft]);

  return {
    ...state,
    aircraftList,
    status,
  };
};

export { useBackendSocket };
