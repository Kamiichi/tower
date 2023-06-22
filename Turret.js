import { TURRET_TYPES } from './constant.js';

class Turret {
  constructor(turretType, x, y) {
    this.x = x;
    this.y = y;
    this.turretType = turretType;
    this.power = this.setPower(turretType);
    this.range = this.setRange(turretType);
    this.attackslots = this.setAttackSlots(turretType);
    this.price = this.setPrice(turretType);
  }

  setPower(turretType) {
    let power = TURRET_TYPES[turretType] ? TURRET_TYPES[turretType].power : -1; // default power
    return power;
  }

  setAttackSlots(turretType) {
    let attackslots = TURRET_TYPES[turretType] ? TURRET_TYPES[turretType].attackslots : -1; // default attackslots
    return attackslots;
  }

  setRange(turretType) {
    let range = TURRET_TYPES[turretType] ? TURRET_TYPES[turretType].range : -1; // default range
    return range;
  }

  setPrice(turretType) {
    let price = TURRET_TYPES[turretType] ? TURRET_TYPES[turretType].price : -1; // default price
    return price;
  }
}

export default Turret;