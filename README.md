# ATCgraph

ATCgraph is a full live-traffic website for ATC24:

- **Single backend server** with ATC24 source websocket bridge
- **Frontend website** served by the backend when built
- **Live radar map** using your provided custom chart image with aircraft overlays
- **API endpoints** for aircraft, flight plans, controllers, ATIS, and source status

## Backend features

- Source bridge: `wss://24data.ptfs.app/wss`
- Client websocket: `ws://<host>/ws`
- REST API:
  - `GET /health`
  - `GET /api/state`
  - `GET /api/status`
  - `GET /api/aircraft`
  - `GET /api/flightplans`
  - `GET /api/controllers`
  - `GET /api/atis`

## Run backend

```bash
cd backend
npm install
npm run dev
```

Backend listens on `http://localhost:8080`.

## Run frontend (dev)

```bash
cd frontend
npm install
npm run dev
```

## Build frontend and serve from backend

```bash
cd frontend
npm install
npm run build

cd ../backend
npm run dev
```

The backend will serve `frontend/dist` automatically when present.
