import { GertrudaAI } from './gertrudaAI.mjs'
import { Army } from './army.mjs';
import { Ship } from './ship.mjs';
import { Dice } from './dice.mjs';
import { Component } from './component.mjs';

class Battle {
    constructor(army0, army1) {
        this.army0 = army0;
        this.army1 = army1;
        // TODO: should I do this.army0 or army0? \/
        this.all = army0.ships.concat(army1.ships);
        this.canonBattleRoundCount = 1;
    }
    createRocketsBattleOrder() {
        const shipsWithRockets = this.all.filter((obj, i) => obj.hasRockets())
        return shipsWithRockets.sort((a, b) => b.getAgility() - a.getAgility());
    }
    createBattleOrder() {
        const allSorted = this.all.sort((a, b) =>  b.getAgility() - a.getAgility());
        return allSorted;
    }

    rocketBattle(ai) {
        this.createRocketsBattleOrder().forEach(ship => {
            if(ship.isExploded) {return}
            let rockets = ship.getRockets();
            rockets.forEach(r => {
                let ro = r.dice.roll();
                if(ro > 1) {
                    let enemyArmy = ship.army === this.army1 ? this.army0 : this.army1
                    let hitting = ai.selectShipToHit(enemyArmy, ship, r, ro);
                    console.log('We are aiming for a ship with aguility of: ' + hitting.getAgility());
                    const res = hitting.receiveDamage(r.damage);
                    enemyArmy.removeExplodeats();
                    console.log(`ship received damage ${res}, of ${r.damage}, and it is exploded: ${hitting.isExploded}`);
                }
            })
        });
    }
    canonBattleRound(ai) {
        this.createBattleOrder().forEach(ship => {
            if(ship.isExploded) {return}
            let canons = ship.getCanons();
            canons.forEach(c => {
                let ro = c.dice.roll();
                if(ro > 1) {
                    let enemyArmy = ship.army === this.army1 ? this.army0 : this.army1
                    let hitting = ai.selectShipToHit(enemyArmy, ship, c, ro);
                    console.log('We are aiming for a ship with aguility of: ' + hitting?.getAgility());
                    const res = hitting?.receiveDamage(c.damage);
                    enemyArmy.removeExplodeats();
                    console.log(`ship received damage of ${c.damage}, ${res? 'exploded' : 'not exploded'}`);
                }
            })
        })
        this.canonBattleRoundCount += 1;
        if(this.army0.ships.length === 0 || this.army0.ships.length === 0) {return false}
        return true;
    }
    canonBattle(ai) {
        let cont = true;
        while (cont) {
            console.log('ROUUUNNND ' + this.canonBattleRoundCount + '!');
            cont = this.canonBattleRound(ai)
        }
    }
    battle(ai) {
        this.rocketBattle(ai);
        this.canonBattle(ai);
    }

}

export { Battle };