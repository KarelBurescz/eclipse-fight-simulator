import { Army } from "./army.mjs";
import { Battle } from "./battle.mjs";
import { Component } from "./component.mjs";
import { GertrudaAI } from "./gertrudaAI.mjs";
import { Ship } from "./ship.mjs";
import { JsonEdit } from './jsonEdit.mjs';
import fs from 'fs';
import EventEmitter from 'node:events';

const eventEmitter = new EventEmitter();

eventEmitter.on('log', (txt, stats = false) => {
    console.log(txt);
    if(stats) {
      if(!txt) {
        let data = fs.readFileSync('./stats.txt', 'utf-8');
        let jsonData = JSON.stringify({error: 'the txt was nullish'}, null, 2);
        let newData = data + '\n' + jsonData + '\n';
        fs.writeFileSync('./stats.txt', newData, 'utf-8');
      } else {
        let data = fs.readFileSync('./stats.txt', 'utf-8');
        let jsonData = JSON.stringify(txt, null, 2);
        let newData = data + '\n' + jsonData + '\n';
        fs.writeFileSync('./stats.txt', newData, 'utf-8');
      }

    }
});

eventEmitter.emit('log', 'trying to load stats');

eventEmitter.emit('log', "Hello today army1 is going to face off army3 in a epic rematch🥊,comentators are: Karel Bures and Karel Bubes, hope you enjoy the fight👍")


function run() {

  const shipA1 = Ship.createInterceptor();


  eventEmitter.emit('log', "Presenting army1 8 incerteptors with a 2 damage rockets and plus 3 computer🚀")

  shipA1.components = [
    Component.ionCanon,
    Component.nuclearSource,
    Component.hull,
    Component.hull,
  ];


  const shipsA1 = shipA1.clone(1);
  const army1 = new Army("army1", shipsA1, false);



  eventEmitter.emit('log', "Presenting army2 2 big dreadnoughts with a 4 damage canons ,2 plus 3 computers and 6 hulls🧨")


  // const shipA2 = Ship.createDreadnaught();
  // shipA2.components = [
  //   Component.nuclearDrive,
  //   Component.phaseShield,
  //   Component.phaseShield,
  //   Component.gluonComputer,
  //   Component.conifoldHull,
  //   Component.conifoldHull,
  //   Component.plasmaCanon,
  //   Component.zeroPointSource,
  // ];

  const shipA2 = Ship.createInterceptor();
  shipA2.components = [
    Component.ionCanon,
    Component.nuclearSource,
    Component.hull,
    Component.electronComputer,
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

  const battle = new Battle(army1, army2, eventEmitter);
  battle.printStatus();
  eventEmitter.emit('log', "Startig the battle!\n")

  let winnerAndDefeaded = battle.battle(new GertrudaAI());
  return winnerAndDefeaded;
}

const stats = { army1: 0, army2: 0 };
const statsToJson = {};
let ships = {army1: 0, army2: 0};
let res;
for (let i = 0; i < 100; i++) {
  res = run();
  ships[res[0].name] = res[0]?.ships[0].components
  stats[res[0].name]++;
  // Doesn't work now, must replace "thereIsTheNewKindCounting" with Armyes new kind counting method and loop over the ships and write down the kinds
  // console.log('loggind res')
  // console.log(res[0].ships[0].components)
  // console.log(res[0].ships[0])

}
// let armies = { army0: 0, army1: 0 }


eventEmitter.emit('log', stats, true);

eventEmitter.emit('log', ships?.army2 ,true);
eventEmitter.emit('log', ships?.army1,true);

// const rawData = fs.readFileSync('./stats.json');
// const jsObject = JSON.parse(rawData);
// jsObject[`newBattle${jsObject.length + 1}`] = statsToJson;
// fs.writeFileSync('./stats.json', JSON.stringify(jsObject, null, 2));

console.log(statsToJson);
console.log(stats);