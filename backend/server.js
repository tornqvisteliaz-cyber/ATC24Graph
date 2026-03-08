import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { WebSocketServer, WebSocket } from "ws";
import { connectToAtc24 } from "./wsClient.js";
import { getSnapshot } from "./stateStore.js";

const PORT = process.env.PORT || 8080;
const BROADCAST_RATE_MS = 100;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, "../frontend/dist");

const app = express();
app.use(cors());
app.use(express.json());

const sourceStatus = {
  status: "starting",
  sourceUrl: "wss://24data.ptfs.app/wss",
  updatedAt: Date.now(),
};

app.get("/health", (_req, res) => {
  res.json({ ok: true, sourceStatus });
});

app.get("/api/state", (_req, res) => {
  res.json({ ...getSnapshot(), sourceStatus });
});

app.get("/api/aircraft", (_req, res) => {
  res.json({ data: getSnapshot().aircraftState });
});

app.get("/api/flightplans", (_req, res) => {
  res.json({ data: getSnapshot().flightPlans });
});

app.get("/api/controllers", (_req, res) => {
  res.json({ data: getSnapshot().controllers });
});

app.get("/api/atis", (_req, res) => {
  res.json({ data: getSnapshot().atisList });
});

app.get("/api/status", (_req, res) => {
  const snapshot = getSnapshot();
  res.json({
    sourceStatus,
    counts: {
      aircraft: Object.keys(snapshot.aircraftState).length,
      flightPlans: snapshot.flightPlans.length,
      controllers: snapshot.controllers.length,
      atis: snapshot.atisList.length,
    },
  });
});

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
} else {
  app.get("/", (_req, res) => {
    res.type("text/plain").send(
      "ATCgraph backend is running. Frontend build not found at frontend/dist. Build frontend with: cd frontend && npm install && npm run build"
    );
  });
}

const server = app.listen(PORT, () => {
  console.log(`ATCgraph server listening on ${PORT}`);
});

const wss = new WebSocketServer({ server, path: "/ws" });
let dirtyTypes = new Set();

const broadcast = (message) => {
  const payload = JSON.stringify(message);

  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
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
    { type: "sourceStatus", data: sourceStatus },
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

  if (dirtyTypes.has("sourceStatus")) {
    broadcast({ type: "sourceStatus", data: sourceStatus });
  }

  dirtyTypes = new Set();
}, BROADCAST_RATE_MS);

connectToAtc24({
  onStateChange(type) {
    dirtyTypes.add(type);
  },
  onStatusChange(nextStatus) {
    Object.assign(sourceStatus, nextStatus);
    dirtyTypes.add("sourceStatus");
  },
});
