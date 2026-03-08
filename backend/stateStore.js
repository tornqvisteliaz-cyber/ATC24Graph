const STUDS_PER_NM = 3307.14286;

const state = {
  aircraftState: {},
  flightPlans: [],
  controllers: [],
  atisList: [],
};

const toNumber = (value, fallback = 0) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

const normalizeAircraft = (aircraft) => {
  const position = aircraft?.position ?? {};
  const x = toNumber(position.x);
  const y = toNumber(position.y);

  return {
    callsign: aircraft?.callsign ?? "",
    playerName: aircraft?.playerName ?? "",
    aircraftType: aircraft?.aircraftType ?? "",
    altitude: toNumber(aircraft?.altitude),
    heading: toNumber(aircraft?.heading),
    speed: toNumber(aircraft?.speed),
    groundSpeed: toNumber(aircraft?.groundSpeed),
    wind: aircraft?.wind ?? "",
    isOnGround: Boolean(aircraft?.isOnGround),
    isEmergencyOccuring: Boolean(aircraft?.isEmergencyOccuring),
    position: {
      x,
      y,
      nmX: x / STUDS_PER_NM,
      nmY: y / STUDS_PER_NM,
    },
  };
};

const upsertAircraft = (aircraft) => {
  const normalized = normalizeAircraft(aircraft);

  if (!normalized.callsign) return;

  state.aircraftState[normalized.callsign] = normalized;
};

const setAircraftState = (payload) => {
  if (Array.isArray(payload)) {
    for (const aircraft of payload) {
      upsertAircraft(aircraft);
    }
    return;
  }

  if (payload && typeof payload === "object") {
    const maybeAircraft = payload.aircraft ?? payload;

    if (Array.isArray(maybeAircraft)) {
      for (const aircraft of maybeAircraft) {
        upsertAircraft(aircraft);
      }
      return;
    }

    if (maybeAircraft && typeof maybeAircraft === "object") {
      upsertAircraft(maybeAircraft);
      return;
    }

    for (const value of Object.values(payload)) {
      if (value && typeof value === "object") {
        upsertAircraft(value);
      }
    }
  }
};

const setFlightPlans = (payload) => {
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.flightPlans)
      ? payload.flightPlans
      : payload
        ? [payload]
        : [];

  state.flightPlans = items.map((fp) => ({
    callsign: fp?.callsign ?? "",
    realcallsign: fp?.realcallsign ?? "",
    aircraft: fp?.aircraft ?? "",
    flightrules: fp?.flightrules ?? "",
    departing: fp?.departing ?? "",
    arriving: fp?.arriving ?? "",
    route: fp?.route ?? "",
    flightlevel: fp?.flightlevel ?? "",
  }));
};

const setControllers = (payload) => {
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.controllers)
      ? payload.controllers
      : payload
        ? [payload]
        : [];

  state.controllers = items.map((controller) => ({
    airport: controller?.airport ?? "",
    position: controller?.position ?? "",
    holder: controller?.holder ?? null,
    heldSince: toNumber(controller?.heldSince),
    claimable: Boolean(controller?.claimable),
    queue: Array.isArray(controller?.queue) ? controller.queue : [],
  }));
};

const setAtis = (payload) => {
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.atis)
      ? payload.atis
      : payload
        ? [payload]
        : [];

  state.atisList = items.map((atis) => ({
    airport: atis?.airport ?? "",
    letter: atis?.letter ?? "",
    content: atis?.content ?? "",
    editor: atis?.editor ?? null,
  }));
};

const getSnapshot = () => ({
  aircraftState: state.aircraftState,
  flightPlans: state.flightPlans,
  controllers: state.controllers,
  atisList: state.atisList,
});

export {
  STUDS_PER_NM,
  getSnapshot,
  setAircraftState,
  setFlightPlans,
  setControllers,
  setAtis,
};
