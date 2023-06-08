import searchPath from "./searchPath.js";
import { turn } from "./map.js";

class Enemy {
  constructor() {
    this.x = 20;
    this.y = 4;
    this.speed = 30;
    this.path = searchPath();
    this.turn = 0;
  }

  move() {
    let p = this.path[this.turn];
    console.log(p);
    this.x = p[0] + 1;
    this.y = p[1];
    this.turn += 1;
  }
}

export default Enemy;
