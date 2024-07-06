class Dice {
  roll() {
    return (Math.random() * 6).trunc()
  }
}

class Fakedice {
  constructor(num) {
    this.num = num;
  };
  roll() {
    return this.num;
  };
};

export { Dice ,Fakedice }