import { Dice } from "./dice.mjs";

class Ship { 

  static count = 0;

  constructor ({maxComponents,components = [],baseAgility = 0,fixedComponents = 0,type = '',totalDamage = 0} = {}) {
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
    for(let i = 0;i < nTimes;i++) {
      let ship = new Ship(this) 
      ships.push(ship)
    }
    return ships
  }

  getAgility() { 
    return this.baseAgility + this.components.reduce((a,curr) => a + curr.agility,0);
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

    if(electricity < consumption) {
      return [false,'Your consumption is greater than your electricity⚡!']
    } else {
      return [true,'Your ship is good to go🚀!']
    }
  };
};

export { Ship };