const randomNum = (max, min = 0) => ~~(min + Math.random() * (max - min + 1)) //Math.floor new syntax

const ind = (arr, el) => arr.indexOf(el);

function createFieldEl(text) {
    const div = document.createElement('div');
    div.innerHTML = `${text}\n`;
    field.append(div);
}

function report(arg){
    console.log(arg)
    createFieldEl(arg)
}

class Gladiator {

    initialHealth = randomNum(100, 80)
    health = this.initialHealth
    power = randomNum(4, 2) + +Math.random().toFixed(1)
    initialSpeed = randomNum(4, 1) + +Math.random().toFixed(3)
    speed = this.initialSpeed
    name = faker.name.findName()

    static introduceGladiators(X) {
        for (let i = 0; i < X; i++) {
            this.arena.push(new Gladiator)
        }
    }

    static start(isInit = true) {
        if (isInit) this.introduceGladiators(gladNum.value);
        if (this.arena.length < 2) {
            this.pause();
            report(` 🏆 [${(this.arena[0]).name}] won the battle with health x ${this.arena[0].health} 🏆`);
            return;
        }
        for (let fighter of this.arena) fighter.timer = setInterval(()=>{fighter.battle()}, (6 - fighter.speed) * 1000)
    }

    static pause() {
        for (let fighter of this.arena) {
            clearInterval(fighter.timer)
        }
    }

    static arena = []

    calcSpeed() {
        this.speed = +(this.initialSpeed * (this.health / this.initialHealth)).toFixed(3)
    }

    getFurious() {
        this.speed *= 3;
    }

    battle() {
        let opps = [...Gladiator.arena];
        opps.splice(ind(Gladiator.arena, this), 1);
        let opp = opps[randomNum(opps.length - 1)];
        report(`[${this.name} x ${this.health}] hits [${opp.name} x ${opp.health}] with power ${this.power}`)
        opp.health -= this.power;
        opp.health = +opp.health.toFixed(1);
        opp.calcSpeed();

        if (opp.health > 0 && opp.health <= 30) opp.getFurious();
        else if (opp.health <= 0) opp.ceaserDecision();
    }

    healUp() {
        this.health = 50;
    }

    die() {
        Gladiator.arena.splice(ind(Gladiator.arena, this), 1);
        report(`[${this.name}] is dying`)
    }

    ceaserDecision() {
        Gladiator.pause();
        new Promise((res, rej) => {   //same as using if else
            +prompt(`Let ${this.name} alive? Input 0 to finish him/her OR 1 to let him/her to live.`, 0) ? res() : rej()
        })
            .then(() => {
                this.healUp();
                report(`Caesar showed 👍 to [${this.name}]`);
            })
            .catch(() => {
                this.die();
                report(`Caesar showed 👎 to [${this.name}]`);
            })
            .finally(() => Gladiator.start(false))
    }
}

var start = Gladiator.start

but.onclick = ()=>(start.call(Gladiator), false)


// There are X gladiators with the following properties
// * Health - 80-100 (with step=1)
// * Power - 2-5 (with step=0.1)
// * Speed - 1-5 (with step=0.001). 1 means 5 second and 5 means the 1-second interval between each attack
// * Name - (use faker.js to generate random names)

// All gladiators start fighting at the same time.
// Each gladiator hits random gladiator on his turn where his opponent’s health decreases by the amount of gladiator’s power. 
// Whenever any of gladiator dies (health <=0) the battle stops and everybody waits for Caesar’s decision: 
// “Finish him” (gladiator leaves the arena) or “Live” (gladiator recovers and get +50 health points). 
// After that battle continues. 
// The attack speed of gladiators decreases with their health with following formula speed = initial_speed * (health/initial_health). 
// When gladiator’s health is in range of 15 - 30 they get furious and their speed triples.

// Write a Javascript program to emulate gladiators’ battle. Each attack should be logged in the console like the following line
// [Roman Vinchi x 40] hits [Frank Smith x 10] with power 3.2
// When some of the gladiators is dying log
// [Roman Vinchi] dying
// When Caesar makes a decision
// Caesar showed 👍|👎 to [Roman Vinchi]
// When there is a winner log to the console
// [Frank Smith] won the battle with health x28

// The program should run when calling start() function in the console.