class Enemy {
  constructor() {
    this.x = 20;
    this.y = 4;
    this.speed = 30;
  }

  move() {
    this.x = this.x - 1;
  }
}

export default Enemy;