class Turret {
  constructor(turretType, x, y) {
    this.x = x;
    this.y = y;
    this.turretType = turretType;
    this.attackPower = turretType === "normal" ? 1 : 2;
  }
}

export default Turret;
