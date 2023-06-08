import { initMap, turn } from "./map.js";

initMap();

setInterval(() => turn(), 1000, 1000);
