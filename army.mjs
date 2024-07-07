class Army {
  constructor(name,ships = [],defending = false) {
    this.name = name;
    ships.forEach((ship) => {ship.army = this})
    this.ships = ships;
    this.defending = defending
  };
  removeExplodeats() {
    this.ships.forEach((ship) => {
      if(ship.isExploded) {
        this.ships.splice(this.ships.indexOf(ship), 1);
      }
    })
  }
};

export {Army};