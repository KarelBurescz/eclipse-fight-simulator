
class GertrudaAI {
    constructor() {

    }
    selectShipToHit(enemyArmy, ship, component, diceValue) {
        if(enemyArmy.ships.length === 0) {
            return null
        }
        const ableToHit = diceValue === 6 ? 
            enemyArmy.ships : 
            enemyArmy.ships.filter(
                (eShip) => -eShip.getComponentsValue('shield') + ship.getComponentsValue('computer') + diceValue >= 6
            )
            if(ableToHit.length === 0) {
                return enemyArmy.ships[0]
            }
        const destroyable = ableToHit.filter(
            (eShip) => eShip.getComponentsValue('hull') - eShip.totalDamage - component.damage < 0
        )
        if(destroyable.length > 0) {
            const sorted = destroyable.sort(
                (a, b) => 
                    (b.getComponentsValue('hull') - b.totalDamage) - 
                    (a.getComponentsValue('hull') - a.totalDamage)
            )
            return sorted[0];
        } else {
            const sorted = ableToHit.sort(
                (a, b) => 
                    (a.getComponentsValue('hull') - a.totalDamage) - 
                    (b.getComponentsValue('hull') - b.totalDamage)
            )
            return sorted[0];
        }
    }
}

export { GertrudaAI };