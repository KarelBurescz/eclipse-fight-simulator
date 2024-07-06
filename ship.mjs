import { Dice } from "./dice.mjs";

class Ship { 
  constructor ({maxComponents,components = [],baseAgility = 0,fixedComponents = 0,type = '',totalDamage = 0} = {}) {
    this.maxComponents = maxComponents;
    this.components = components;
    this.baseAgility = baseAgility;
    this.fixedComponents = fixedComponents;
    this.type = type;
    this.totalDamage = totalDamage;
};
  getAgility() { 
    return this.baseAgility + this.components.reduce((a,curr) => a + curr.agility,0);
  };

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
};

export { Ship };