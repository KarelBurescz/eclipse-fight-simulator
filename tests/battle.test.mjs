import { Battle } from '../battle.mjs';
import { Army } from '../army.mjs';
import { Ship } from '../ship.mjs';
import { Component } from '../component.mjs';
import expect from 'expect.js';
import { Fakedice } from '../dice.mjs';
import { GertrudaAI } from '../gertrudaAI.mjs';
// import {  } from '../'
describe('Battle', function() {
    describe('createRocketsBattleOrder()', function() {

        it('should return [] if there are not any ships', function() {
            let army0 = new Army([]);
            let army1 = new Army([]);
            let battleOrder = new Battle(army0, army1).createRocketsBattleOrder();
            expect(battleOrder).to.eql([]);
        });

        it('should return 1 object if there is 1 object at all', function() {
            let ship = new Ship({
                components: [
                        new Component({
                            type: 'rocket'
                        })], 
                baseAgility: 10
            });

            let army0 = new Army('army0',[
                ship
            ]);

            let army1 = new Army('army1',[]);
            
            let battleOrder = new Battle(army0, army1).createRocketsBattleOrder();
            expect(battleOrder).to.eql([ship]);
        });

        it('should return rightOrder if there are multiple ships', function() {
            let ship1 = new Ship({
                components: [
                        new Component({
                            type: 'rocket'
                        })], 
                baseAgility: 1
            });

            let ship2 = new Ship({
                components: [
                        new Component({
                            type: 'rocket',
                            electricity: 2
                        })], 
                baseAgility: 3
            });

            let ship3 = new Ship({
                components: [
                        new Component({
                            type: 'rocket',
                            drive: 2,
                            agility: 2
                        })], 
                baseAgility: 2
            });
            let army0 = new Army('army0',[ship1, ship2]);
            let army1 = new Army('army1',[ship3]);
            let order = new Battle(army0, army1).createRocketsBattleOrder();
            const rightOrder = [ship3, ship2, ship1];
            expect(order).to.eql(rightOrder);
        });
    });
    describe('rocketBattle()', function() {
        it('should destroy one army', function() {
            let fd = new Fakedice(5);
            let ship1 = new Ship({
                components: [
                    new Component({type: 'rocket', damage: 3, dice: fd}),
                    new Component({type: 'rocket', damage: 3, dice: fd}),
                    new Component({shield: 1, dice: fd}),
                    new Component({computer: 2, dice: fd})
                ],
                baseAgility: 3
            });
    
            let ship2 = new Ship({
                components: [
                    new Component({type: 'rocket', damage: 2, dice: fd}),
                    new Component({hull: 2, dice: fd}),
                    new Component({computer: 4, dice: fd})
                ],
                baseAgility: 1
            });
    
            let ship3 = new Ship({
                components: [
                    new Component({type: 'rocket', damage: 6, dice: fd}),
                    new Component({hull: 10, dice: fd}),
                    new Component({computer: 4, dice: fd})
                ],
                baseAgility: 0
            });
    
            let army0 = new Army('army0',[ship1]);
            let army1 = new Army('army1',[ship2, ship3]);
            let battle = new Battle(army0, army1);
            battle.rocketBattle(new GertrudaAI());
            expect(ship1.isExploded).to.eql(true);
            expect(ship2.isExploded).to.eql(true);
            expect(ship3.isExploded).to.eql(false);
            expect(ship3.totalDamage).to.eql(3);
            console.log(army0, army1);
        });
    })
    describe('canonBattle()', function() {
        it('should destroy one army', function() {
            let fd = new Fakedice(5);
            let ship1 = new Ship({
                components: [
                    new Component({type: 'canon', damage: 3, dice: fd}),
                    new Component({type: 'canon', damage: 3, dice: fd}),
                    new Component({shield: 1, dice: fd}),
                    new Component({computer: 2, dice: fd}),
                    new Component({hull: 8, dice: fd})
                ],
                baseAgility: 1
            });
            
            let ship2 = new Ship({
                components: [
                    new Component({type: 'canon', damage: 2, dice: fd}),
                    new Component({hull: 2, dice: fd}),
                    new Component({computer: 4, dice: fd})
                ],
                baseAgility: 2
            });
            
            let ship3 = new Ship({
                components: [
                    new Component({type: 'canon', damage: 6, dice: fd}),
                    new Component({hull: 10, dice: fd}),
                    new Component({computer: 4, dice: fd})
                ],
                baseAgility: 3
            });
            
            let army0 = new Army('army0',[ship1]);
            let army1 = new Army('army1',[ship2, ship3]);
            let battle = new Battle(army0, army1);
            battle.canonBattle(new GertrudaAI());
            expect(ship1.isExploded).to.eql(true);
            expect(ship2.isExploded).to.eql(true);
            expect(ship3.isExploded).to.eql(false);
            expect(ship3.totalDamage).to.eql(3);
            console.log(army0, army1);
        });

        it('should destroy one army in a conflict', function() {
            let fd = new Fakedice(5);
            const drive1 = new Component({ drive: 3, consumption: 1, type: "support" });
            const computer1 = new Component({
            computer: 3,
            consumption: 2,
            type: "support",
            });
            const computer2 = new Component({
            computer: 3,
            consumption: 2,
            type: "support",

            });
            const canon1 = new Component({ type: "canon", damage: 4, consumption: 3, dice: fd});
            const canon2 = new Component({ type: "canon", damage: 4, consumption: 3, dice: fd });
            const rocket1 = new Component({ consumption: 1, type: "rocket", damage: 2, dice: fd });
            const rocket2 = new Component({ consumption: 1, type: "rocket", damage: 2, dice: fd });
            const electricity1 = new Component({ type: "support", electricity: 12});
            const hull1 = new Component({ hull: 30, type: "support", dice: fd });
            const hull2 = new Component({ hull: 30, type: "support", dice: fd });

            const ship1A1 = new Ship({
            maxComponents: 5,
            components: [drive1, computer1, rocket1, rocket2, electricity1],
            baseAgility: 3,
            type: "interceptor",
            });
            const shipsA1 = ship1A1.clone(8);

            const army1 = new Army("army1", shipsA1, true);
            console.log(
            "Presenting army1 8 incerteptors with a 2 damage rockets and plus 3 computer🚀"
            );

            const ship1A2 = new Ship({
            maxComponents: 8,
            components: [
                drive1,
                computer1,
                computer2,
                canon1,
                canon2,
                electricity1,
                hull1,
                hull2,
            ],
            baseAgility: 3,
            type: "interceptor",
            });
            const shipsA2 = ship1A2.clone(2);

            const army2 = new Army("army2", shipsA2, false);
            let battle = new Battle(army1, army2);
            battle.battle(new GertrudaAI());
            console.log('Winner!: ' + army2.ships);
            expect(army1.ships.length).to.eql(7);
        });
    })
});