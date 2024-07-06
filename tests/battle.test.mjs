import { Battle } from '../battle.mjs';
import { Army } from '../army.mjs';
import { Ship } from '../ship.mjs';
import { Component } from '../component.mjs';
import expect from 'expect.js';
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
});