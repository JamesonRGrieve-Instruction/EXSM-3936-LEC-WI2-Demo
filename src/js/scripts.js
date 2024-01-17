// eslint-disable-next-line no-unused-vars
/* global output, input */
// eslint-disable-next-line no-unused-vars
async function main() {
  class Car {
    constructor(make, model, year, cylinderCount) {
      this.make = make;
      this.model = model;
      this.year = year;
      this.odometer = 0;
      this.engine = new Engine(cylinderCount);
    }
    #make;
    get make() {
      return this.#make;
    }
    set make(value) {
      this.#make = value;
    }
    #model;
    get model() {
      return this.#model;
    }
    set model(value) {
      this.#model = value;
    }
    #year;
    get year() {
      return this.#year;
    }
    set year(value) {
      this.#year = value;
    }
    #odometer;
    get odometer() {
      return this.#odometer;
    }
    set odometer(value) {
      this.#odometer = value;
    }
    #engine;
    get engine() {
      return this.#engine;
    }
    set engine(value) {
      this.#engine = value;
    }
    startEngine() {
      this.engine.isRunning = true;
    }
    stopEngine() {
      this.engine.isRunning = false;
    }
    drive(distance) {
      if (this.engine.isRunning) {
        this.odometer += distance;
      } else {
        throw new Error("The engine is not running.");
      }
    }
  }
  class Engine {
    constructor(cylinderCount) {
      this.isRunning = false;
      this.cylinderCount = cylinderCount;
    }
    #isRunning;
    get isRunning() {
      return this.#isRunning;
    }
    set isRunning(value) {
      this.#isRunning = value;
    }
    #cylinderCount;
    get cylinderCount() {
      return this.#cylinderCount;
    }
    set cylinderCount(value) {
      this.#cylinderCount = value;
    }
  }
  const car = new Car("Toyota", "Corolla", 2020, 4);
  car.startEngine();
  car.drive(100);
  car.stopEngine();
  car.startEngine();
  car.drive(50);
  car.stopEngine();
  output("Odometer: " + car.odometer);
  output(
    JSON.stringify({
      ...car,
      make: car.make,
      model: car.model,
      year: car.year,
      odometer: car.odometer,
      engine: {
        isRunning: car.engine.isRunning,
        cylinderCount: car.engine.cylinderCount,
      },
    }),
  );
}
