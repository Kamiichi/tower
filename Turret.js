import { TURRET_TYPES } from './constant.js';

class Turret {
  constructor(turretType, x, y) {
    this.x = x;
    this.y = y;
    this.turretType = turretType;
    this.setPower(turretType);
    this.setRange(turretType);
    this.setAttackSlots(turretType);
    this.setPrice(turretType);
    this.setColor(turretType);
  }

  setPower(turretType) {
    let power = TURRET_TYPES[turretType] ? TURRET_TYPES[turretType].power : -1; // default power
    this.power = power;
  }

  setAttackSlots(turretType) {
    let attackslots = TURRET_TYPES[turretType] ? TURRET_TYPES[turretType].attackslots : -1; // default attackslots
    this.attackslots = attackslots;
  }

  setRange(turretType) {
    let range = TURRET_TYPES[turretType] ? TURRET_TYPES[turretType].range : -1; // default range
    this.range = range;
  }

  setPrice(turretType) {
    let price = TURRET_TYPES[turretType] ? TURRET_TYPES[turretType].price : -1; // default price
    this.price = price;
  }

  setColor(turretType) {
    let color = TURRET_TYPES[turretType] ? TURRET_TYPES[turretType].color : "black"; // default attackslots
    this.color = color;
  }
}

export default Turret;