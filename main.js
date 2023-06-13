import { initMap, turn } from "./map.js";

initMap();

const interval = setInterval(
  function () {
    const r = turn();
    if (!r) {
      clearInterval(interval);
    }
  },
  100,
  1000
);
