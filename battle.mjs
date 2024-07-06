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

    }
    createRocketsBattleOrder() {
        const shipsWithRockets = this.all.filter((obj, i) => obj.hasRockets())
        return shipsWithRockets.sort((a, b) => b.getAgility() - a.getAgility());
    }
    createBattleOrder() {
        const allSorted = this.all.sort((a, b) => {return b.getAgility() - a.getAgility()});
        return allSorted;
    }

    rocketBattle(ai) {
        this.createRocketsBattleOrder().forEach(ship => {
            if(ship.isExploded) {return}
            let rockets = ship.getRockets();
            rockets.forEach(r => {
                let ro = r.dice.roll();
                if(ro > 1) {
                    let hitting = ai.selectShipToHit(ship.army === this.army1 ? this.army0 : this.army1, ship, r, ro);
                    console.log('We are aiming for: ' + hitting);
                    hitting.recieveDamage(r.damage);
                }
            })
        });
    }
}

export { Battle };