import { initMap, turn } from "./map.js";

initMap();

setInterval(() => turn(), 100, 100);
