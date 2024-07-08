import { Dice } from "./dice.mjs";

const ShipType = {
  interceptor: 'interceptor',
  cruiser: 'cruiser',
  dreadnaught: 'dreadnaught',
  starbase: 'starbase',
}

class Ship {

  static count = 0;

  static createInterceptor() {
    return new Ship({ type: ShipType.interceptor, baseAgility: 2, maxComponents: 4 });
  }
  static createCruiser() {
    return new Ship({ type: ShipType.cruiser, baseAgility: 1, maxComponents: 6 });
  }
  static createDreadnaught() {
    return new Ship({ type: ShipType.dreadnaught, baseAgility: 0, maxComponents: 8 });
  }
  static createStarbase() {
    return new Ship({ type: ShipType.starbase, baseAgility: 2, maxComponents: 5 });
  }

  constructor({ maxComponents, components = [], baseAgility = 0, fixedComponents = 0, type = '', totalDamage = 0 } = {}) {
    this.maxComponents = maxComponents;
    this.components = components;
    this.baseAgility = baseAgility;
    this.fixedComponents = fixedComponents;
    this.type = type;
    this.totalDamage = totalDamage;
    this.isExploded = false;
    this.name = `${type}-${Ship.count}`;
    Ship.count++;
  };
  clone(nTimes) {
    const ships = []
    for (let i = 0; i < nTimes; i++) {
      let ship = new Ship(this)
      ships.push(ship)
    }
    return ships
  }

  getAgility() {
    return this.baseAgility + this.components.reduce((a, curr) => a + curr.agility, 0);
  };

  getComponentsValue(compName) {
    return this.components.reduce((ac, obj) => ac + obj[compName] || 0, 0)
  }

  hasRockets() {
    return this.components.some((v) => v.type === 'rocket');
  };

  getCanons() {
    const canons = this.components.filter((v) => v.type === 'canon');
    return canons
  }

  getRockets() {
    const rockets = this.components.filter((v) => v.type === 'rocket');
    return rockets
  }

  receiveDamage(damage) {
    this.totalDamage += damage;
    return this.isExploded = this.totalDamage > this.getComponentsValue('hull') ? true : false;
  }

  controlIntegrity() {
    const electricity = this.getComponentsValue('electricity');
    const consumption = this.getComponentsValue('consumption');

    if (electricity < consumption) {
      return [false, 'Your consumption is greater than your electricity⚡!']
    }

    const componentsSize = this.getComponentsValue('size');
    const shipSize = this.maxComponents;

    if (componentsSize > shipSize) {
      return [false, 'You have more components than is allowed⛔!']
    }

    return [true, 'Your ship is alright👍!']
  };
  getFingerPrint() {
    const componentsNames = this.components.map((el) => el.subtype).sort();
    return `${this.type}-${componentsNames.join('-')}`
  }

};

export { Ship, ShipType };