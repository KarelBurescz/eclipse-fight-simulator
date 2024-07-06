
class Battle {
    constructor(army0, army1) {
        this.army0 = army0;
        this.army1 = army1;
        // TODO: should I do this.army0 or army0? \/
        this.all = army0.ships.concat(army1.ships);

    }
    createRocketsBattleOrder() {
        const shipsWithRockets = this.all.filter((obj, i) => obj.hasRockets())
        return shipsWithRockets.sort((a, b) => b.getAgility() - a.getAgility());
    }
    createBattleOrder() {
        const allSorted = this.all.sort((a, b) => {return b.getAgility() - a.getAgility()});
        return allSorted;
    }
}

export { Battle };