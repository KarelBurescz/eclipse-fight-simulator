import { Dice } from "./dice.mjs";

class Component {

  // Components definition:
  static tachyonDrive = new Component({ drive: 3, consumption: 2, type: "support", agility: 3 }); // Check
  static transitionDrive = new Component({ drive: 3, type: "support" });
  static fusionDrive = new Component({ drive: 2, consumption: 2, type: "support", agility: 2 });
  static nuclearDrive = new Component({ drive: 1, consumption: 1, type: "support", agility: 1 });

  static conifoldHull = new Component({ hull: 3, consumption: 2, type: "support" }); // Check
  static improvedHull = new Component({ hull: 2, type: "support" });
  static sentientHull = new Component({ hull: 1, computer: 1, type: "support" });
  static hull = new Component({ hull: 1, type: "support" });

  static zeroPointSource = new Component({ electricity: 12, type: "support" });
  static tachyonSource = new Component({ electricity: 9, type: "support" });
  static fusionSource = new Component({ electricity: 6, type: "support" });
  static nuclearSource = new Component({ electricity: 3, type: "support" });

  static gluonComputer = new Component({ computer: 3, consumption: 2, type: "support" }); // Check
  static positronComputer = new Component({ computer: 2, consumption: 1, type: "support" });
  static electronComputer = new Component({ computer: 1, type: "support" });

  static absorptionShield = new Component({ shield: 1, electricity: 4, type: "support" });
  static phaseShield = new Component({ shield: 2, consumption: 1, type: "support" }); // Check
  static gaussShield = new Component({ shield: 1, type: "support" }); // Check

  static fluxMissile = new Component({ damage: 1, agility: 1, type: "rocket", size: 0.5 });
  static plasmaMissile = new Component({ damage: 2, consumption: 1, type: "rocket", size: 0.5 });
  static antiMatterCanon = new Component({ damage: 4, consumption: 4, type: "canon" });
  static solitionCanon = new Component({ damage: 3, consumption: 3, type: "canon" });
  static plasmaCanon = new Component({ damage: 2, consumption: 2, type: "canon" });
  static ionCanon = new Component({ damage: 1, consumption: 1, type: "canon" });

  constructor({ drive = 0, electricity = 0, computer = 0, shield = 0, hull = 0, consumption = 0, damage = 0, type = '', agility = 0, dice = new Dice, size = 1 } = {}) {
    this.drive = drive;
    this.electricity = electricity;
    this.computer = computer;
    this.shield = shield;
    this.hull = hull;
    this.consumption = consumption;
    this.damage = damage;
    this.type = type;
    this.agility = agility;
    this.dice = dice;
    this.size = size;
  };
};


export { Component }