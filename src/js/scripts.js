async function main() {
  class Pen {
    /**
     * Constructor for the Pen class.
     * @param {string} brand - The brand of the pen
     * @param {string} colour - The colour of the pen
     */
    constructor(brand = "Bic", colour = "Black") {
      this.brand = brand;
      this.colour = colour;
      this.inkLevel = 100;
    }
    #brand;
    get brand() {
      return this.#brand;
    }
    set brand(value) {
      if (value.trim().length > 0) {
        this.#brand = value;
      } else {
        throw new Error(`The brand cannot be empty.`);
      }
    }
    #colour;
    get colour() {
      return this.#colour;
    }
    set colour(value) {
      if (value.trim().length > 0) {
        this.#colour = value;
      } else {
        throw new Error(`The colour cannot be empty.`);
      }
    }
    #inkLevel;
    get inkLevel() {
      return this.#inkLevel;
    }
    set inkLevel(value) {
      if (value < 0) {
        throw new Error(
          `Writing that many characters would use too much ink. There is only ${this.inkLevel}% of the ink remaining.`
        );
      } else if (value > 100) {
        throw new Error(`The ink level cannot be greater than 100%.`);
      } else {
        this.#inkLevel = value;
      }
    }
    /**
     * This method "writes a message" at the cost of 0.5% of the ink per character. If the ink level is too low, a message is written to the console.
     * @param {number} characters - The number of characters to write
     */
    write(characters) {
      this.inkLevel -= characters * 0.5;
    }
  }
  const pen = new Pen("Bic", "Blue");
  pen.write(100);
  pen.write(42);
  pen.write(200);
  output(`The pen has ${pen.inkLevel}% of the ink remaining.`);
}

function writeWithPen(targetPen, characters) {
  try {
    targetPen.write(characters);
  } catch (error) {
    // Here we are creating another helper method to wrap around write, serving as a bridge between our (now universal) class and this environment. Slightly less maintainable because now there's another step in the process of calling the function, but it frees up our class to be used in other environments.
    console.log(error.message);
  }
}
