import { Component } from "../component.mjs";
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
});