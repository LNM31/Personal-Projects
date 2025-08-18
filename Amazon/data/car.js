class Car {
  #brand;
  #model;
  speed;
  isTrunkOpen;

  constructor(brand,model)
  {
    this.#brand = brand;
    this.#model = model;
    this.speed = 0;
    this.isTrunkOpen = false;
  }

  displayInfo()
  {
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk-Open: ${this.isTrunkOpen}`);
  }
  go()
  {
    if(this.isTrunkOpen === true) return;
    if(this.speed + 5 <= 200) this.speed +=5;
    else this.speed = 200;
  }
  decrease()
  {
    if(this.speed - 5 >= 0) this.speed -=5;
    else this.speed = 0;
  }
  openTrunk()
  {
    if(this.speed === 0)
      this.isTrunkOpen = true;
  }
  closeTrunk()
  {
    this.isTrunkOpen = false;
  }
}
class RaceCar extends Car {
  acceleration;

  constructor(brand,model,acceleration)
  {
    super(brand,model);
    this.acceleration = acceleration;
  }
  go()
  {
    if(this.isTrunkOpen === true) return;
    if(this.speed + this.acceleration <= 300) this.speed +=this.acceleration;
    else this.speed = 300;
  }
  openTrunk() {}
  closeTrunk() {}
}

const car1 = new Car('Toyota','Corolla');
const car2 = new Car('Tesla','Model 3');

console.log(car1);
console.log(car2);

car1.displayInfo();
car2.displayInfo();

car1.go();
car1.go();
car1.go();
car1.go();
car1.decrease();
car1.decrease();
car1.go();
car2.go();
car2.go();

car2.decrease();
car2.decrease();

car2.openTrunk();
car1.closeTrunk();

car1.displayInfo();
car2.displayInfo();

car3 = new RaceCar('Mclaren','F1',20);
car3.displayInfo();
car3.go();
car3.go();
car3.go();
car3.displayInfo();


