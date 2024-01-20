// eslint-disable-next-line no-unused-vars
/* global output, input */
// eslint-disable-next-line no-unused-vars
async function main() {
  class Vehicle {
    constructor(make, model, year) {
      if (constructor === Vehicle) {
        throw new Error("Cannot instantiate abstract class.");
      }
      this.make = make;
      this.model = model;
      this.year = year;
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
    drive(distance) {
      throw new Error("Abstract method.");
    }
  }
  class RoadVehicle extends Vehicle {
    constructor(make, model, year, cylinderCount, transmissionType, transmissionGearCount) {
      if (constructor === RoadVehicle) {
        throw new Error("Cannot instantiate abstract class.");
      }
      super(make, model, year);
      this.#odometer = 0;
      this.engine = new Engine(cylinderCount);
      this.transmission = new Transmission(transmissionType, transmissionGearCount);
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
    orderNewFactoryEngine() {
      return new Engine(this.engine.cylinderCount);
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
      if (this.#isRunning && value) {
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
          this.#gears.push(i.toString());
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
  class Bicycle extends Vehicle {
    constructor(make, model, year, gearCount) {
      super(make, model, year);
      this.gearCount = gearCount;
    }
    #gearCount;
    get gearCount() {
      return this.#gearCount;
    }
    set gearCount(value) {
      this.#gearCount = value;
    }
    drive(distance) {
      if (distance < 0) {
        throw new Error("Distance cannot be negative.");
      } else {
        output("Riding " + distance + " miles.");
      }
    }
    toJSON() {
      return {
        make: this.make,
        model: this.model,
        year: this.year,
        gearCount: this.gearCount,
      };
    }
  }
  class PickupTruck extends RoadVehicle {
    constructor(make, model, year, cylinderCount, transmissionType, transmissionGearCount, bedLength) {
      super(make, model, year, cylinderCount, transmissionType, transmissionGearCount);
      this.bedLength = bedLength;
    }
    #bedLength;
    get bedLength() {
      return this.#bedLength;
    }
    set bedLength(value) {
      if (!Number.isInteger(value) || value < 0) {
        throw new Error("Invalid bed length.");
      }
      this.#bedLength = value;
    }
  }
  class Car extends RoadVehicle {
    constructor(make, model, year, cylinderCount, transmissionType, transmissionGearCount) {
      super(make, model, year, cylinderCount, transmissionType, transmissionGearCount);
    }
    newModelYear() {
      return new Car(
        this.make,
        this.model,
        this.year + 1,
        this.engine.cylinderCount,
        this.transmission.type,
        this.transmission.gearCount,
      );
    }
  }

  const car = new Car("Toyota", "Corolla", 2020, 4, "manual", 6);
  car.startEngine();
  car.transmission.currentGear = "1";
  car.drive(100);
  car.transmission.currentGear = "N";
  car.stopEngine();
  car.startEngine();
  car.transmission.currentGear = "1";
  car.drive(50);
  car.transmission.currentGear = "N";
  car.stopEngine();
  output("Odometer: " + car.odometer);
  output(JSON.stringify(car));

  const tradeIn = car.newModelYear();
  output(JSON.stringify(tradeIn));
}
