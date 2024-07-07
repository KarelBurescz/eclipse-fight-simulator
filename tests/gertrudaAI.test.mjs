import { GertrudaAI } from '../gertrudaAI.mjs'
import { Army } from '../army.mjs';
import { Ship } from '../ship.mjs';
import { Component } from '../component.mjs';
import { Fakedice } from '../dice.mjs';
import expect from 'expect.js';

let ship1, ship2, ship3, maxiRocket, fakedice;
describe('GertrudaAI', function () {
    describe('selectShipToHit()', function () {
        beforeEach(function () {
            ship1 = new Ship({
                baseAgility: 1
            });

            ship2 = new Ship({
                baseAgility: 3
            });
            maxiRocket = new Component({
                type: 'rocket',
                drive: 2,
                agility: 2,
                computer: 4,
                damage: 2
            })
            ship3 = new Ship({
                components: [maxiRocket],
                baseAgility: 2
            });
        })
        it('should return null if there is nobody in the enemy army', function () {
            let army0 = new Army('army0', []);
            let army1 = new Army('army1', [ship3]);
            let shipToHit = new GertrudaAI().selectShipToHit(
                army0,
                ship3,
                maxiRocket,
                3
            );
            expect(shipToHit).to.eql(null);
        });

        it('should select the most vital ship, ignoring huge shield. ', function () {

            ship1.components.push(
                new Component({
                    shield: 12,
                    hull: 1
                })
            )

            ship2.components.push(
                new Component({
                    shield: 0,
                })
            )

            let army0 = new Army('army0', [ship1, ship2]);
            let army1 = new Army('army1', [ship3]);
            let shipToHit = new GertrudaAI().selectShipToHit(
                army0,
                ship3,
                maxiRocket,
                6
            );
            expect(shipToHit).to.eql(ship1);
        });
        it('should select the ship which can be hit', function () {

            ship1.components.push(
                new Component({
                    shield: 12,
                    hull: 1
                })
            )

            ship2.components.push(
                new Component({
                    shield: 0,
                })
            )

            let army0 = new Army('army0', [ship1, ship2]);
            let army1 = new Army('army1', [ship3]);
            let shipToHit = new GertrudaAI().selectShipToHit(
                army0,
                ship3,
                maxiRocket,
                5
            );
            expect(shipToHit).to.eql(ship2);
        });

        it('should select the first ship', function () {

            ship1.components.push(
                new Component({
                    shield: 12,
                    hull: 1
                })
            )

            ship2.components.push(
                new Component({
                    shield: 0,
                })
            )

            let army0 = new Army('army0', [ship1, ship2]);
            let army1 = new Army('army1', [ship3]);
            let shipToHit = new GertrudaAI().selectShipToHit(
                army0,
                ship3,
                maxiRocket,
                1
            );
            expect(shipToHit).to.eql(null);
        });
        it('select one ship to hit', function () {

            let army0 = new Army('army0', [ship1, ship2]);
            let army1 = new Army('army1', [ship3]);
            let shipToHit = new GertrudaAI().selectShipToHit(
                army0,
                ship3,
                maxiRocket,
                3
            );
            expect(shipToHit).to.eql(ship1);
        });

        it('should select the ship is destroyed', function () {

            ship1.components.push(
                new Component({
                    shield: 1,
                    hull: 3,
                })
            )

            ship2.components.push(
                new Component({
                    shield: 0,
                    hull: 7,

                })
            )
            ship2.totalDamage = 6;

            let army0 = new Army('army0', [ship1, ship2]);
            let army1 = new Army('army1', [ship3]);
            let shipToHit = new GertrudaAI().selectShipToHit(
                army0,
                ship3,
                maxiRocket,
                5
            );
            expect(shipToHit).to.eql(ship2);
        });

        it('should select the most damage is done', function () {

            ship1.components.push(
                new Component({
                    shield: 1,
                    hull: 1,
                })
            )

            ship2.components.push(
                new Component({
                    shield: 0,
                    hull: 1,

                })
            )
            ship2.totalDamage = 1;

            let army0 = new Army('army0', [ship1, ship2]);
            let army1 = new Army('army1', [ship3]);
            let shipToHit = new GertrudaAI().selectShipToHit(
                army0,
                ship3,
                maxiRocket,
                5
            );
            expect(shipToHit).to.eql(ship1);
        });
    });
});
