import { Component } from "./component.mjs";


class Army {
  constructor(name, ships = [], defending = false) {
    this.name = name;
    ships.forEach((ship) => { ship.army = this })
    this.ships = ships;
    this.defending = defending
  };
  removeExplodeats() {
    this.ships.forEach((ship) => {
      if (ship.isExploded) {
        this.ships.splice(this.ships.indexOf(ship), 1);
      }
    })
  }

  findKinds() {
    const fps = this.ships.map((ship) => ship.getFingerPrint());

    const myObject = {};

    fps.forEach((fp) => myObject[fp] = (myObject[fp] || 0) + 1);
    return myObject;
  };

  //   findKinds() {
  //     const interceptors = this.ships.filter((ship) => ship.type === 'interceptor');
  //     let kinds = [];
  //     let types = [];
  //     let typesString;
  //     interceptors.forEach((ship) => {
  //       typesString = typesString + '-' + ship.getFingerPrint();
  //       types.push(ship.getFingerPrint())
  //     })
  //     let count = 0;
  //     let before;
  //     types.sort().forEach((el, i) => {
  //       if (el === before || undefined) {
  //         count++;
  //       } else {
  //         kinds.push(before);
  //         count = 0;
  //       }
  //       before = el;
  //     })
  //     console.log(kinds);
  //   }
};

export { Army };