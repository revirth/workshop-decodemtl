class Dog {
    constructor(n, fdf, b, a) {
        this.name = n;
        this.favouriteDogFood;
        this.breed = b;
        this.age = a;
    }
    animalSound() {
        if (this.breed === "labrador") {
            console.log("big woof");
        } else {
            console.log("small woof");
        }
    }

}

class Cat {
    constructor(n, fcf, a) {
        this.name = n;
        this.favouriteCatFood = fcf;
        this.age = a;
    }
    animalSound() {
        if (this.age < 2) {
            console.log("meow");
        } else {
            console.log("MEOW");
        }
    }

}

class Person {
    constructor(n, pi, ii) {
        this.name = n;
        this.purinaInventory = pi;
        this.iamsInventory = ii;
    }
    feedDog(dog) {
        if (dog.favouriteDogFood === 'iams') {
            if (this.iamsInventory > 0) {
                this.iamsInventory = this.iamsInventory - 1;
                console.log(dog.name + " has been fed");
            } else {
                console.log("no more iams!");
            }
        } else {
            console.log(this.name + " only has iams. Sorry " + dog.name + "!")
        }
    }
    feedCat(cat) {
        if (cat.favouriteCatFood === 'purina') {
            if (this.purinaInventory > 0) {
                this.purinaInventory = this.purinaInventory - 1;
                console.log(cat.name + " has been fed");
            } else {
                console.log("no more purina!");
            }
        } else {
            console.log(this.name + " only has purina. Sorry " + cat.name + "!")
        }
    }
    
}





var fido = new Dog("fido", "iams", "labrador", 4);
var mittens = new Cat("mittens", "purina", 3);
var bob = new Person("bob", 2, 1);

mittens.animalSound();
fido.animalSound();

bob.feedCat(mittens);
bob.feedDog(fido);
bob.feedCat(mittens);
bob.feedDog(fido);
bob.feedCat(mittens);
