import { Component } from "../component.mjs";
import { Fakedice } from "../dice.mjs";
import { Ship } from "../ship.mjs";
import expect from 'expect.js'

describe('Ship', function () {

  describe('getAgility', function () {
    it('should return only base agility when ship is with no components', function () {
      const ship = new Ship({ baseAgility: 3 })
      expect(ship.getAgility()).to.equal(3)
    });
    it('should return base and components agility', function () {
      const component = new Component({ agility: 2 })
      const ship = new Ship({ baseAgility: 3, components: [component] })
      expect(ship.getAgility()).to.equal(5)
    });
  });

  describe('hasRockets', function () {
    it('should return false if the ship has not got any components that is type rocket', function () {
      const component = new Component({ type: 'drive' })
      const ship = new Ship({ baseAgility: 3, components: [component] })
      expect(ship.hasRockets()).to.equal(false)
    });
    it('should return true if the ship has got any components that is type rocket', function () {
      const component = new Component({ type: 'rocket' })
      const ship = new Ship({ baseAgility: 3, components: [component] })
      expect(ship.hasRockets()).to.equal(true)
    });
  });

  describe('getCanons', function () {
    it('should return an array with canons', function () {
      const component1 = new Component({ type: 'canon' })
      const component2 = new Component({ type: 'canon' })
      const ship = new Ship({ components: [component1, component2] });
      expect(ship.getCanons()).to.eql([component1, component2])
    });
  });
  describe('getRockets', function () {
    it('should return an array with rockets', function () {
      const component1 = new Component({ type: 'rocket' })
      const component2 = new Component({ type: 'rocket' })
      const ship = new Ship({ components: [component1, component2] });
      expect(ship.getRockets()).to.eql([component1, component2])
    });
  });
  describe('getComponentsValue', function () {
    it('should return an array with rockets', function () {
      const component1 = new Component({ shield: 3 })
      const component2 = new Component({ shield: 2 })
      const component3 = new Component({ computer: 2 })
      const ship = new Ship({ components: [component1, component2, component3] });
      expect(ship.getComponentsValue('shield')).to.eql(5)
    });
  });

  describe('receiveDamage', function () {
    it('should explode the ship', function () {
      const component1 = new Component({ hull: 3 })
      const ship = new Ship({ components: [component1] });
      expect(ship.receiveDamage(4)).to.equal(true)
    });
  });

  describe('receiveDamage', function () {
    it('should not explode the ship', function () {
      const component1 = new Component({ hull: 3 })
      const ship = new Ship({ components: [component1] });
      expect(ship.receiveDamage(3)).to.equal(false)
      expect(ship.receiveDamage(1)).to.equal(true)
    });
  });

  describe('clone', function () {
    it('should return an array full of the requiered ship', function () {


      const drivev1 = new Component({ drive: 3, consumption: 1, type: 'support' })
      const computer1 = new Component({ computer: 3, consumption: 2, type: 'support' })
      const rocket1 = new Component({ consumption: 1, type: 'rocket', damage: 2 })
      const rocket2 = new Component({ consumption: 1, type: 'rocket', damage: 2 })
      const electricity1 = new Component({ type: 'support', electricity: 9 })

      const ship = new Ship({ maxComponents: 5, components: [drivev1, computer1, rocket1, rocket2, electricity1], baseAgility: 3, type: 'interceptor' })
      let ships = ship.clone(3)

      expect(ships.length).to.eql(3)
      expect(ships[2].baseAgility).to.eql(3);
    });
  });

  describe('controlIntegrity', function () {
    it('should return an error message and false', function () {

      const drivev1 = new Component({ drive: 3, consumption: 1, type: 'support' })
      const computer1 = new Component({ computer: 3, consumption: 2, type: 'support' })
      const rocket1 = new Component({ consumption: 2, type: 'rocket', damage: 2 })
      const rocket2 = new Component({ consumption: 2, type: 'rocket', damage: 2 })
      const electricity1 = new Component({ type: 'support', electricity: 3 })

      const ship = new Ship({ maxComponents: 5, components: [drivev1, computer1, rocket1, rocket2, electricity1], baseAgility: 3, type: 'interceptor' })
      let ships = ship.clone(3)

      ships.forEach((ship) => {
        const [isGood, error] = ship.controlIntegrity()
        expect(isGood).to.equal(false)
      });
    });
  });

  describe('controlIntegrity', function () {
    it('should not return an error message and should return true', function () {

      const drivev1 = new Component({ drive: 3, consumption: 1, type: 'support' })
      const computer1 = new Component({ computer: 3, consumption: 2, type: 'support' })
      const rocket1 = new Component({ consumption: 1, type: 'rocket', damage: 2 })
      const rocket2 = new Component({ consumption: 1, type: 'rocket', damage: 2 })
      const electricity1 = new Component({ type: 'support', electricity: 9 })

      const ship = new Ship({ maxComponents: 5, components: [drivev1, computer1, rocket1, rocket2, electricity1], baseAgility: 3, type: 'interceptor' })
      let ships = ship.clone(3)

      ships.forEach((ship) => {
        const [isGood, error] = ship.controlIntegrity()
        expect(isGood).to.equal(true)
      });
    });
    it('should return false and error message', function () {

      const drivev1 = new Component({ drive: 3, consumption: 1, type: 'support' })
      const computer1 = new Component({ computer: 3, consumption: 2, type: 'support' })
      const rocket1 = new Component({ consumption: 1, type: 'rocket', damage: 2 })
      const rocket2 = new Component({ consumption: 1, type: 'rocket', damage: 2 })
      const electricity1 = new Component({ type: 'support', electricity: 9 })
      const electricity2 = new Component({ type: 'support', electricity: 9 })

      const ship = new Ship({ maxComponents: 4, components: [drivev1, computer1, rocket1, rocket2, electricity1, electricity2], baseAgility: 3, type: 'interceptor' })

      const [isGood, error] = ship.controlIntegrity()
      expect(isGood).to.equal(false)

    })

    it('should return true and good message', function () {

      const drive1 = new Component({ drive: 3, consumption: 1, type: 'support' })
      const computer1 = new Component({ computer: 3, consumption: 2, type: 'support' })
      const rocket1 = new Component({ consumption: 1, type: 'rocket', damage: 2, size: 0.5 })
      const rocket2 = new Component({ consumption: 1, type: 'rocket', damage: 2, size: 0.5 })
      const electricity1 = new Component({ type: 'support', electricity: 9 })

      const ship = new Ship({ maxComponents: 4, components: [drive1, computer1, rocket1, rocket2, electricity1], baseAgility: 3, type: 'interceptor' })

      const [isGood, error] = ship.controlIntegrity()
      expect(isGood).to.equal(true)

    })
  });

});