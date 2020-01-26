
class Person {
    constructor(name, age) {
        this.name = name; 
        this.age = age; 
        this.timer = setInterval(() => {this.age++}, 1000);
    }
}

const trump = new Person ('Donald', 35);
const putin = new Person ('Vladimir', 25);
const obama = new Person ('Barack', 34);
const pashin = new Person ('Nikol', 22);

let personsUnder40 = new Array(trump, putin, obama, pashin)

function checkAge(personsUnder40) {
    for (let item of personsUnder40) {
        if (item.age > 39) {
            clearInterval(item.timer);  
            personsUnder40.splice(personsUnder40.indexOf(item), 1);
            console.log("removing " + item.name + " age: " + item.age);
        }
    }
}

function randomAge (max, min = 0) {
    return (min + Math.random()*(max - min + 1)) | 0;
}

function addPerson (personsUnder40) {
    newPerson = new Person (faker.name.findName(), randomAge(50,1));
    personsUnder40.push(newPerson);
    console.log("adding new " + newPerson.name + " age: " + newPerson.age);

}
let checkTimer = setInterval(() => {checkAge(personsUnder40)}, 1000);
let pushTimer = setInterval(() => {addPerson(personsUnder40)}, 2000);
setTimeout(function(){ console.log(trump)},6000)


