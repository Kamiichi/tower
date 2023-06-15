class Turret {
  constructor(turretType, x, y) {
    this.x = x;
    this.y = y;
    this.turretType = turretType;
    this.power = this.setPower(turretType);
    this.range = this.setRange(turretType);
  }

  setPower(turretType) {
    let power;
    switch (turretType) {
      case "normal":
        power = 1;
        break;
      case "hoge":
        power = 2;
        break;
      
      default:
        power = 1; // default power
    }
    return power;
  }

  setRange(turretType) {
    let range;
    switch (turretType) {
      case "normal":
        range = 1;
        break;
      case "hoge":
        range = 2;
        break;
      
      default:
        range = 1; // default range
    }
    return range;
  }
}

export default Turret;
