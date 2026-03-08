import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { connectToAtc24 } from "./wsClient.js";
import { getSnapshot } from "./stateStore.js";

const PORT = process.env.PORT || 8080;
const BROADCAST_RATE_MS = 100;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

const server = app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});

const wss = new WebSocketServer({ server, path: "/ws" });
let dirtyTypes = new Set();

const broadcast = (message) => {
  const payload = JSON.stringify(message);

  for (const client of wss.clients) {
    if (client.readyState === 1) {
      client.send(payload);
    }
  }
};

const broadcastSnapshotToClient = (client) => {
  const snapshot = getSnapshot();
  const messages = [
    { type: "aircraft", data: snapshot.aircraftState },
    { type: "controllers", data: snapshot.controllers },
    { type: "atis", data: snapshot.atisList },
    { type: "flightplans", data: snapshot.flightPlans },
  ];

  for (const message of messages) {
    client.send(JSON.stringify(message));
  }
};

wss.on("connection", (client) => {
  console.log("Frontend connected");
  broadcastSnapshotToClient(client);
});

setInterval(() => {
  if (dirtyTypes.size === 0) return;

  const snapshot = getSnapshot();

  if (dirtyTypes.has("aircraft")) {
    broadcast({ type: "aircraft", data: snapshot.aircraftState });
  }

  if (dirtyTypes.has("controllers")) {
    broadcast({ type: "controllers", data: snapshot.controllers });
  }

  if (dirtyTypes.has("atis")) {
    broadcast({ type: "atis", data: snapshot.atisList });
  }

  if (dirtyTypes.has("flightplans")) {
    broadcast({ type: "flightplans", data: snapshot.flightPlans });
  }

  dirtyTypes = new Set();
}, BROADCAST_RATE_MS);

connectToAtc24({
  onStateChange(type) {
    dirtyTypes.add(type);
  },
});
