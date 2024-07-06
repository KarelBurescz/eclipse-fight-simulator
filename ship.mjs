
class Ship { 
  constructor ({maxComponents,components = [],baseAgility = 0,fixedComponents = 0,type = '',totalDamage = 0} = {}) {
    this.maxComponents = maxComponents;
    this.components = components;
    this.baseAgility = baseAgility;
    this.fixedComponents = fixedComponents;
    this.type = type;
    this.totalDamage = totalDamage;
}
  getAgility() { 
    return this.baseAgility + this.components.reduce((a,curr) => a + curr.agility,0)
  }

  hasRockets() { 
    return this.components 
  }
}

export { Ship }