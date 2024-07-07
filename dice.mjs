class Dice {
  roll() {
    return Math.trunc(Math.random() * 6);
  }
}

class Fakedice {
  constructor(num) {
    this.num = num;
  }
  roll() {
    return this.num;
  }
}

export { Dice, Fakedice };
