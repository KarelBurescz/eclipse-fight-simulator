class Component {
  constructor(electricity = 0,computer = 0,shield = 0,hull = 0,consumption = 0,damage = [],type = '',agility = 0) {
    this.electricity = electricity;
    this.computer = computer;
    this.shield = shield;
    this.hull = hull;
    this.consumption = consumption;
    this.damage = damage;
    this.type = type;
    this.agility = agility;
  }
}

export {Component}