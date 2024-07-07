import { Army } from "./army.mjs";
import { Battle } from "./battle.mjs";
import { Component } from "./component.mjs";
import { GertrudaAI } from "./gertrudaAI.mjs";
import { Ship } from "./ship.mjs";

console.log(
  "Hello today army1 is going to face off army3 in a epic rematch🥊,comentators are: Karel Bures and Karel Bubes, hope you enjoy the fight👍"
);

function run() {

  const shipA1 = Ship.createCruiser();

  shipA1.components = [
    Component.sentientHull,
    Component.antiMatterCanon,
    Component.antiMatterCanon,
    Component.tachyonDrive,
    Component.zeroPointSource,
    Component.sentientHull,
  ];

  const shipsA1 = shipA1.clone(4);
  const army1 = new Army("army1", shipsA1, false);



  const shipA2 = Ship.createDreadnaught();
  shipA2.components = [
    Component.nuclearDrive,
    Component.phaseShield,
    Component.phaseShield,
    Component.gluonComputer,
    Component.conifoldHull,
    Component.conifoldHull,
    Component.plasmaCanon,
    Component.zeroPointSource,
  ];

  const shipsA2 = shipA2.clone(2);
  const army2 = new Army("army2", shipsA2, false);

  const armies = [...army1.ships, ...army2.ships];

  armies.forEach((ship) => {
    const [isGood, error] = ship.controlIntegrity();
    if (!isGood) {
      console.log(error + `. In ${ship.army.name} `);
      process.exit(1);
    }
  });

  const battle = new Battle(army1, army2);
  battle.printStatus();

  console.log("Startig the battle!\n")

  let victoriousArmy = battle.battle(new GertrudaAI());
  return victoriousArmy.name
}

const stats = { army1: 0, army2: 0 };

for (let i = 0; i < 100; i++) {
  let res = run();
  stats[res]++;
}


console.log(stats);