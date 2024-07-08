import { Dice } from "./dice.mjs";

const ComponentType = {
  cannon: 'canon',
  rocket: 'rocket',
  support: 'support',
}

const ComponentSubtype = {

  unknown: 'unknown',

  tachyonDrive: 'tachyonDrive',
  transitionDrive: 'transitionDrive',
  fusionDrive: 'fusionDrive',
  nuclearDrive: 'nuclearDrive',
  conifoldHull: 'conifoldHull',
  improvedHull: 'improvedHull',
  sentientHull: 'sentientHull',
  hull: 'hull',
  zeroPointSource: 'zeroPointSource',
  tachyonSource: 'tachyonSource',
  fusionSource: 'fusionSource',
  nuclearSource: 'nuclearSource',
  gluonComputer: 'gluonComputer',
  positronComputer: 'positronComputer',
  electronComputer: 'electronComputer',
  absorptionShield: 'absorptionShield',
  phaseShield: 'phaseShield',
  gaussShield: 'gaussShield',
  fluxMissile: 'fluxMissile',
  plasmaMissile: 'plasmaMissile',
  antiMatterCanon: 'antiMatterCanon',
  solitionCanon: 'solitionCanon',
  plasmaCanon: 'plasmaCanon',
  ionCanon: 'ionCanon',
}

class Component {

  // Components definition:
  static tachyonDrive = new Component({ drive: 3, consumption: 2, type: ComponentType.support, agility: 3, subtype: 'tachyonDrive' }); // Check
  static transitionDrive = new Component({ drive: 3, type: ComponentType.support, subtype: 'transitionDrive' });
  static fusionDrive = new Component({ drive: 2, consumption: 2, type: ComponentType.support, agility: 2, subtype: 'fusionDrive' });
  static nuclearDrive = new Component({ drive: 1, consumption: 1, type: ComponentType.support, agility: 1, subtype: 'nuclearDrive' });

  static conifoldHull = new Component({ hull: 3, consumption: 2, type: ComponentType.support, subtype: 'conifoldHull' }); // Check
  static improvedHull = new Component({ hull: 2, type: ComponentType.support, subtype: 'improvedHull' });
  static sentientHull = new Component({ hull: 1, computer: 1, type: ComponentType.support, subtype: 'sentientHull' });
  static hull = new Component({ hull: 1, type: ComponentType.support, subtype: 'hull' });

  static zeroPointSource = new Component({ electricity: 12, type: ComponentType.support, subtype: 'zeroPointSource' });
  static tachyonSource = new Component({ electricity: 9, type: ComponentType.support, subtype: 'tachyonSource' });
  static fusionSource = new Component({ electricity: 6, type: ComponentType.support, subtype: 'fusionSource' });
  static nuclearSource = new Component({ electricity: 3, type: ComponentType.support, subtype: 'nuclearSource' });

  static gluonComputer = new Component({ computer: 3, consumption: 2, type: ComponentType.support, subtype: 'gluonComputer' }); // Check
  static positronComputer = new Component({ computer: 2, consumption: 1, type: ComponentType.support, subtype: 'positronComputer' });
  static electronComputer = new Component({ computer: 1, type: ComponentType.support, subtype: 'electronComputer' });

  static absorptionShield = new Component({ shield: 1, electricity: 4, type: ComponentType.support, subtype: 'absorptionShield' });
  static phaseShield = new Component({ shield: 2, consumption: 1, type: ComponentType.support, subtype: 'phaseShield' }); // Check
  static gaussShield = new Component({ shield: 1, type: ComponentType.support, subtype: 'gaussShield' }); // Check

  static fluxMissile = new Component({ damage: 1, agility: 1, type: ComponentType.rocket, size: 0.5, subtype: 'fluxMissile' });
  static plasmaMissile = new Component({ damage: 2, consumption: 1, type: ComponentType.rocket, size: 0.5, subtype: 'plasmaMissile' });
  static antiMatterCanon = new Component({ damage: 4, consumption: 4, type: ComponentType.cannon, subtype: 'antiMatterCanon' });
  static solitionCanon = new Component({ damage: 3, consumption: 3, type: ComponentType.cannon, subtype: 'solitionCanon' });
  static plasmaCanon = new Component({ damage: 2, consumption: 2, type: ComponentType.cannon, subtype: 'plasmaCanon' });
  static ionCanon = new Component({ damage: 1, consumption: 1, type: ComponentType.cannon, subtype: 'ionCanon' });


  constructor({ drive = 0, electricity = 0, computer = 0, shield = 0, hull = 0, consumption = 0, damage = 0, type = '', agility = 0, dice = new Dice, size = 1, subtype = ComponentSubtype.unknown } = {}) {
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
    this.subtype = subtype;
  };
  getName() {
    let rightPart;
    let compo = [this.drive, this.electricity, this.computer, this.shield, this.hull, this.consumption, this.damage, this.type, this.agility, this.dice, this.size].filter((el) => el > 0);
    let parts = [Component.tachyonDrive, Component.transitionDrive, Component.fusionDrive, Component.nuclearDrive, Component.conifoldHull, Component.improvedHull, Component.sentientHull, Component.hull, Component.zeroPointSource, Component.tachyonSource, Component.fusionSource, Component.nuclearSource, Component.gluonComputer, Component.positronComputer, Component.electronComputer, Component.absorptionShield, Component.phaseShield, Component.gaussShield, Component.fluxMissile, Component.plasmaMissile, Component.antiMatterCanon, Component.solitionCanon, Component.plasmaCanon, Component.ionCanon]
    let compoRightForm = {};
    compo.forEach((el) => {
      compoRightForm[el] = el
    });
    parts.forEach((part) => {
      if (compoRightForm == part) {
        rightPart = part;
      }
    })
    return rightPart;
  }
};




export { Component, ComponentType, ComponentSubtype }