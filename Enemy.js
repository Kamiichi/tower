import searchPath from "./searchPath.js";

class Enemy {
  constructor() {
    this.x = 20;
    this.y = 4;
    this.speed = 30;
    this.path = searchPath();
    this.turn = 0;
    this.hp = 10;
  }

  move() {
    let p = this.path[this.turn % this.path.length];
    this.x = p[0] + 1;
    this.y = p[1];
    this.turn += 1;
  }

  getDamage(damage) {
    //console.log(`Damage: ${damage}, HP before: ${this.hp}`);
    this.hp -= damage;
    //console.log(`HP after: ${this.hp}`);
    return this.hp === 0;
  }
  
}

export default Enemy;
