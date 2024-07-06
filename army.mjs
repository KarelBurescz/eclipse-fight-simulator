class Army {
  constructor(name,ships = []) {
    this.name = name;
    ships.forEach((ship) => {ship.army = this})
    this.ships = ships;
  };
};

export {Army};