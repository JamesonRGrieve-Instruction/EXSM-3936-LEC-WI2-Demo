// eslint-disable-next-line no-unused-vars
/* global output, input */
// eslint-disable-next-line no-unused-vars
async function main() {
  class Car {
    constructor(make, model, year, cylinderCount, transmissionType, transmissionGearCount) {
      this.make = make;
      this.model = model;
      this.year = year;
      this.odometer = 0;
      this.engine = new Engine(cylinderCount);
      this.transmission = new Transmission(transmissionType, transmissionGearCount);
    }
    #make;
    get make() {
      return this.#make;
    }
    set make(value) {
      if (value.trim().length === 0) {
        throw new Error("Make cannot be empty.");
      } else {
        this.#make = value.trim();
      }
    }
    #model;
    get model() {
      return this.#model;
    }
    set model(value) {
      if (value.trim().length === 0) {
        throw new Error("Model cannot be empty.");
      } else {
        this.#model = value.trim();
      }
    }
    #year;
    get year() {
      return this.#year;
    }
    set year(value) {
      if (!Number.isInteger(value) || value < 1885 || value > new Date().getFullYear() + 1) {
        throw new Error("Invalid year.");
      } else {
        this.#year = value;
      }
    }
    #odometer;
    get odometer() {
      return this.#odometer;
    }
    #engine;
    get engine() {
      return this.#engine;
    }
    set engine(value) {
      this.#engine = value;
    }
    #transmission;
    get transmission() {
      return this.#transmission;
    }
    set transmission(value) {
      this.#transmission = value;
    }
    startEngine() {
      if (!["N", "P"].includes(this.transmission.currentGear)) {
        throw new Error("The transmission is not in neutral or park.");
      } else {
        this.engine.isRunning = true;
      }
    }
    stopEngine() {
      this.engine.isRunning = false;
    }
    drive(distance) {
      if (distance < 0) {
        throw new Error("Distance cannot be negative.");
      } else if (!this.engine.isRunning) {
        throw new Error("The engine is not running.");
      } else if (
        (this.transmission.type === "automatic" && this.transmission.currentGear !== "D") ||
        (this.transmission.type === "manual" && ["N", "R"].includes(this.transmission.currentGear))
      ) {
        throw new Error("The transmission is not in a valid gear to drive.");
      } else {
        this.#odometer += distance;
      }
    }
    toJSON() {
      return {
        make: this.make,
        model: this.model,
        year: this.year,
        odometer: this.odometer,
        engine: this.engine,
        transmission: this.transmission,
      };
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
      if (this.#isRunning) {
        throw new Error("The engine is already running.");
      } else {
        this.#isRunning = value;
      }
    }
    #cylinderCount;
    get cylinderCount() {
      return this.#cylinderCount;
    }
    set cylinderCount(value) {
      this.#cylinderCount = value;
    }
    toJSON() {
      return {
        isRunning: this.isRunning,
        cylinderCount: this.cylinderCount,
      };
    }
  }
  class Transmission {
    constructor(type, gearCount) {
      if (!["automatic", "manual"].includes(type)) {
        throw new Error("Invalid transmission type.");
      }
      this.type = type;
      this.gearCount = gearCount;
      this.#gears = ["N", "R"];
      this.currentGear = "N";
      if (this.type === "manual") {
        for (let i = 1; i <= this.gearCount; i++) {
          this.#gears.push(i);
        }
      } else {
        this.#gears.push("D", "P");
      }
    }
    #gears;
    #type;
    get type() {
      return this.#type;
    }
    set type(value) {
      this.#type = value;
    }
    #gearCount;
    get gearCount() {
      return this.#gearCount;
    }
    set gearCount(value) {
      this.#gearCount = value;
    }
    #currentGear;
    get currentGear() {
      return this.#currentGear;
    }
    set currentGear(value) {
      if (!this.#gears.includes(value)) {
        throw new Error("Invalid gear.");
      } else {
        this.#currentGear = value;
      }
    }
    toJSON() {
      return {
        type: this.type,
        gearCount: this.gearCount,
        currentGear: this.currentGear,
      };
    }
  }
  const car = new Car("Toyota", "Corolla", 2020, 4, "automatic", 6);
  car.startEngine();
  car.transmission.currentGear = "D";
  car.drive(100);
  car.transmission.currentGear = "P";
  car.stopEngine();
  car.startEngine();
  car.transmission.currentGear = "D";
  car.drive(50);
  car.transmission.currentGear = "P";
  car.stopEngine();
  output("Odometer: " + car.odometer);
  output(JSON.stringify(car));
}
