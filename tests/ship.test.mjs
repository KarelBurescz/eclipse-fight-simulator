import { Component } from "../component.mjs";
import { Fakedice } from "../dice.mjs";
import { Ship } from "../ship.mjs";
import expect from 'expect.js'

describe('Ship', function() {

  describe('getAgility', function() {
      it('should return only base agility when ship is with no components', function() {
        const ship = new Ship({baseAgility:3})
        expect(ship.getAgility()).to.equal(3)
      });
      it('should return base and components agility', function() {
        const component = new Component({agility:2})
        const ship = new Ship({baseAgility : 3,components : [component]})
        expect(ship.getAgility()).to.equal(5)
      });
  });

  describe('hasRockets', function() {
    it('should return false if the ship has not got any components that is type rocket', function() {
      const component = new Component({type:'drive'})
      const ship = new Ship({baseAgility:3,components : [component]})
      expect(ship.hasRockets()).to.equal(false)
    });
    it('should return true if the ship has got any components that is type rocket', function() {
      const component = new Component({type:'rocket'})
      const ship = new Ship({baseAgility:3,components : [component]})
      expect(ship.hasRockets()).to.equal(true)
    });
  });

  describe('getCanons', function() {
    it('should return an array with canons', function() {
      const component1 = new Component({type:'canon'})
      const component2 = new Component({type:'canon'})
      const ship = new Ship({components : [component1,component2]});
      expect(ship.getCanons()).to.eql([component1,component2])
    });
  });
  describe('getRockets', function() {
    it('should return an array with rockets', function() {
      const component1 = new Component({type:'rocket'})
      const component2 = new Component({type:'rocket'})
      const ship = new Ship({components : [component1,component2]});
      expect(ship.getRockets()).to.eql([component1,component2])
    });
  });
  describe('getComponentsValue', function() {
    it('should return an array with rockets', function() {
      const component1 = new Component({shield: 3})
      const component2 = new Component({shield: 2})
      const component3 = new Component({computer: 2})
      const ship = new Ship({components : [component1,component2, component3]});
      expect(ship.getComponentsValue('shield')).to.eql(5)
    });
  });

  describe('receiveDamage', function() {
    it('should explode the ship', function() {
      const component1 = new Component({hull: 3})
      const ship = new Ship({components : [component1]});
      expect(ship.receiveDamage(4)).to.equal(true)
    });
  });

  describe('receiveDamage', function() {
    it('should not explode the ship', function() {
      const component1 = new Component({hull: 3})
      const ship = new Ship({components : [component1]});
      expect(ship.receiveDamage(3)).to.equal(false)
      expect(ship.receiveDamage(1)).to.equal(true)
    });
  });

});