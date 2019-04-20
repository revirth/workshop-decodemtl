class Dog {
  // Dog has a constructor with three arguments (in this order): age, name and breed
  // Dog has three attributes: age, name and breed
  constructor(age, name, breed) {
    this.age = age;
    this.name = name;
    this.breed = breed;

    // Dog has a method bark, which returns a string
    this.bark = () => "멍멍";
  }
}

let d = new Dog(3, "good boy", "schnitzel");
if (d.name !== "good boy") {
  throw new Error("Incorrect name");
}
if (d.age !== 3) {
  throw new Error("Incorrect age");
}
if (d.breed !== "schnitzel") {
  throw new Error("Incorred breed");
}
if (typeof d.bark() !== "string") {
  throw new Error("bark method return type incorrect");
}
console.log("All tests passed");
