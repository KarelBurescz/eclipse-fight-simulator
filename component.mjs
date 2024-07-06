import { Dice } from "./dice.mjs";

class Component {
  constructor({drive = 0,electricity = 0,computer = 0,shield = 0,hull = 0,consumption = 0,damage = 0,type = '',agility = 0,dice = new Dice} = {}) {
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