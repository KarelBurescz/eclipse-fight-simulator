import { Dice } from "./dice.mjs";

class Component {

  // Components definition:
  static fusionDrive = new Component({ drive: 2, consumption: 2, type: "support", agility: 2 });


  constructor({ drive = 0, electricity = 0, computer = 0, shield = 0, hull = 0, consumption = 0, damage = 0, type = '', agility = 0, dice = new Dice } = {}) {
    this.drive = drive;
    this.electricity = electricity;
    this.computer = computer;
    this.shield = shield;
    this.hull = hull;
    this.consumption = consumption;
    this.damage = damage;
    this.type = type;
    this.agility = agility;
    this.dice = dice
  };
};


export { Component }