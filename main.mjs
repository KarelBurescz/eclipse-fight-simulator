import { Army } from "./army.mjs"
import { Battle } from "./battle.mjs"
import { Component } from "./component.mjs"
import { Ship } from "./ship.mjs"

console.log('Hello today is a big day ,becouse army1 is going to face off army3 in a epic rematch🥊,comentators are: Karel Bures and Karel Bubes, hope you enjoy the fight👍')

const drive1 = new Component({drive: 3, consumption: 1,type:'support'})
const computer1 = new Component({computer: 3, consumption: 2,type:'support'})
const computer2 = new Component({computer: 3, consumption: 2,type:'support'})
const canon1 = new Component({type:'canon',damage:4,consumption: 4})
const canon2 = new Component({type:'canon',damage:4,consumption: 4})
const rocket1 = new Component({consumption: 1,type:'rocket',damage:2})
const rocket2 = new Component({consumption: 1,type:'rocket',damage:2})
const electricity1 = new Component({type:'support',electricity:9})
const hull1 = new Component({hull:3,type:'support'})
const hull2 = new Component({hull:3,type:'support'})


const ship1A1 = new Ship({maxComponents:5,components : [drive1,computer1,rocket1,rocket2,electricity1],baseAgility : 3,type:'interceptor'})
const shipsA1 = ship1A1.clone(8)

const army1 = new Army('army1',shipsA1,true)
console.log('Presenting army1 8 incerteptors with a 2 damage rockets and plus 3 computer🚀');



const ship1A2 = new Ship({maxComponents:8,components : [drive1,computer1,computer2,canon1,canon2,electricity1,hull1,hull2],baseAgility : 3,type:'interceptor'})
const shipsA2 = ship1A2.clone(2)

const army2 = new Army('army2',shipsA2,false)
console.log('Presenting army2 2 big dreadnoughts with a 4 damage canons ,2 plus 3 computers and 6 hulls🧨');


const battle = new Battle(army1,army2)
