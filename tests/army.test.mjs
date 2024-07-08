import { Army } from '../army.mjs';
import { Ship } from '../ship.mjs';
import { Component } from '../component.mjs';
import expect from 'expect.js';

describe('Army', function () {
  describe('findKinds()', function () {
    it('should find 2 differend kinds of interceptors', function () {

      const ship1 = Ship.createInterceptor();

      ship1.components = [
        Component.antiMatterCanon,
        Component.nuclearSource,
        Component.hull,
        Component.hull,
      ];

      const ship2 = Ship.createInterceptor();

      ship2.components = [
        Component.ionCanon,
        Component.nuclearSource,
        Component.hull,
        Component.hull,
      ];

      const ship3 = Ship.createInterceptor();

      ship3.components = [
        Component.ionCanon,
        Component.hull,
        Component.nuclearSource,
        Component.hull,
      ];

      let army1 = new Army('army1', [ship1, ship2, ship3]);
      let types = army1.findKinds();
      expect(types).to.eql({
        'interceptor-antiMatterCanon-hull-hull-nuclearSource': 1,
        'interceptor-hull-hull-ionCanon-nuclearSource': 2
      });



    });
  });
});