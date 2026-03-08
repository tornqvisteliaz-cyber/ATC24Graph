# ATCgraph

Live ATC24 radar stack with:

- **Backend**: Node + Express + WebSocket bridge to ATC24
- **Frontend**: React dashboard that uses **AeroNav** (`https://aeronav.space/app`) as chart/map source

## Run backend

```bash
cd backend
npm install
npm run dev
```

Backend listens on `http://localhost:8080` and websocket endpoint `ws://localhost:8080/ws`.

## Run frontend

```bash
cd frontend
npm install
npm run dev
```

If backend runs elsewhere, set:

```bash
VITE_BACKEND_WS_URL=ws://host:port/ws
```
