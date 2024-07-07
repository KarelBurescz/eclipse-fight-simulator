import { GertrudaAI } from "./gertrudaAI.mjs";
import { Army } from "./army.mjs";
import { Ship } from "./ship.mjs";
import { Dice } from "./dice.mjs";
import { Component } from "./component.mjs";

class Battle {
  constructor(army0, army1) {
    this.army0 = army0;
    this.army1 = army1;
    // TODO: should I do this.army0 or army0? \/
    this.all = army0.ships.concat(army1.ships);
    this.canonBattleRoundCount = 1;
  }
  createRocketsBattleOrder() {
    const shipsWithRockets = this.all.filter((obj, i) => obj.hasRockets());
    return shipsWithRockets.sort((a, b) => b.getAgility() - a.getAgility());
  }
  createBattleOrder() {
    const allSorted = this.all.sort((a, b) => b.getAgility() - a.getAgility());
    return allSorted;
  }

  printStatus() {
    [...this.army0.ships, ...this.army1.ships].forEach((s) => {
        console.log(`Army: ${s.army.name} Ship: ${s.name} TotalDamage: ${s.totalDamage} IsExploded: ${s.isExploded} TotalHull: ${s.getComponentsValue('hull')}`)
    })
  }

  rocketBattle(ai) {
    this.createRocketsBattleOrder().forEach((ship) => {
      if (ship.isExploded) {
        return;
      }
      let rockets = ship.getRockets();
      console.log('\n');
      rockets.forEach((r) => {
          let ro = r.dice.roll();
          console.log(`Ship ${ship.name} is firing with ${r.type}, dice roll: ${ro}, computer: ${ship.getComponentsValue('computer')}`);
        if (ro > 1) {
            let enemyArmy = ship.army === this.army1 ? this.army0 : this.army1;
            let hitting = ai.selectShipToHit(enemyArmy, ship, r, ro);
            if (hitting === null) {
                console.log(`Ship ${ship.name} has not selected any target!`)
            } else {
                console.log(
                    `${ship.name} is aiming for a ship ${hitting.name} with aguility of: ` +
                    hitting?.getAgility()
                );
                const res = hitting?.receiveDamage(r.damage);
                enemyArmy.removeExplodeats();
                console.log(
                    `ship ${hitting.name} received damage of ${r.damage}, ${
                    res ? "exploded" : "not exploded"
                    }, totalDamage: ${hitting.totalDamage}`
                );
            }
        }
      });
    });
  }
  canonBattleRound(ai) {
    console.log(`Starting Cannon Battle round, ${this.army0.name} size: ${this.army0.ships.length}, ${this.army1.name} size: ${this.army1.ships.length}`)
    this.createBattleOrder().forEach((ship) => {
      if (ship.isExploded) {
        return;
      }
      let canons = ship.getCanons();
      canons.forEach((c) => {
        let ro = c.dice.roll();
        console.log(`Ship ${ship.name} is firing with ${c.type} dice roll: ${ro}, computer: ${ship.getComponentsValue('computer')}`);
        if (ro > 1) {
            let enemyArmy = ship.army === this.army1 ? this.army0 : this.army1;
            let hitting = ai.selectShipToHit(enemyArmy, ship, c, ro);
            if (hitting === null) {
                console.log(`Ship ${ship.name} has not selected any target!`)
            } else {
                console.log(
                    `We are aiming for a ship ${hitting.name} with aguility of: ` +
                    hitting?.getAgility()
                );
                const res = hitting?.receiveDamage(c.damage);
                enemyArmy.removeExplodeats();
                console.log(
                    `ship ${hitting.name} received damage of ${c.damage}, ${
                    res ? "exploded" : "not exploded"
                    }`
                );
            }
        };
      });
    });

    [...this.army0.ships, ...this.army1.ships].forEach((s) => {
        console.log(`Army: ${s.army.name} Ship: ${s.name} TotalDamage: ${s.totalDamage} IsExploded: ${s.isExploded} TotalHull: ${s.getComponentsValue('hull')}`)
    })

    this.canonBattleRoundCount += 1;
    if (this.army0.ships.length === 0 || this.army1.ships.length === 0) {
      return false;
    }
    return true;
  }
  canonBattle(ai) {
    let cont = true;
    while (cont) {
      console.log("\nROUUUNNND " + this.canonBattleRoundCount + "!");
      cont = this.canonBattleRound(ai);
    }
  }
  battle(ai) {
    this.rocketBattle(ai);
    this.canonBattle(ai);
    return this.army0.ships.length > 0 ? this.army0 : this.army1;
  }
}

export { Battle };
