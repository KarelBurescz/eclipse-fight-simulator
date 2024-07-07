import { Army } from "./army.mjs";
import { Battle } from "./battle.mjs";
import { Component } from "./component.mjs";
import { GertrudaAI } from "./gertrudaAI.mjs";
import { Ship } from "./ship.mjs";

console.log(
  "Hello today army1 is going to face off army3 in a epic rematch🥊,comentators are: Karel Bures and Karel Bubes, hope you enjoy the fight👍"
);

function run() {
  const drive1 = new Component({ drive: 2, consumption: 2, type: "support", agility: 2 });
  const drive2 = new Component({ drive: 3, consumption: 0, type: "support", agility: 3 });
  const computer1 = new Component({ computer: 3, consumption: 2, type: "support", });
  const computer2 = new Component({ computer: 3, consumption: 2, type: "support", });
  const canon1 = new Component({ type: "canon", damage: 4, consumption: 4 });
  const canon2 = new Component({ type: "canon", damage: 1, consumption: 1 });
  const rocket1 = new Component({ consumption: 0.5, type: "rocket", damage: 2 });
  const rocket2 = new Component({ consumption: 0.5, type: "rocket", damage: 1, agility: 0.5 });
  const electricity1 = new Component({ type: "support", electricity: 12 });
  const hull1 = new Component({ hull: 3, type: "support", consumption: 2 });
  const hull2 = new Component({ hull: 3, type: "support", consumption: 2 });
  const shield2 = new Component({ shield: 2, type: 'support' });
  const electricity2 = new Component({ type: "support", electricity: 12 });

  const ship1A1 = new Ship({
    maxComponents: 5,
    components: [drive1, computer1, canon1, electricity1],
    baseAgility: 3,
    type: "interceptor",
  });
  const shipsA1 = ship1A1.clone(6);

  const army1 = new Army("army1", shipsA1, true);
  console.log(
    "Presenting army1 8 incerteptors with a 2 damage rockets and plus 3 computer🚀"
  );

  const ship1A2 = new Ship({
    maxComponents: 8,
    components: [
      hull2,
      hull2,
      hull2,
      shield2,
      canon2,
      computer2,
      electricity2,
      Component.fusionDrive,
    ],
    baseAgility: 3,
    type: "dreadnaught",
  });

  const megaShip = Ship.createInterceptor();
  megaShip.components = [Component.fusionDrive];

  const shipsA2 = ship1A2.clone(2);

  const army2 = new Army("army2", shipsA2, false);
  console.log(
    "Presenting army2 2 big dreadnoughts with a 4 damage canons ,2 plus 3 computers and 6 hulls🧨"
  );

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