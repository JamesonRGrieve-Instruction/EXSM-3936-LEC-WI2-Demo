async function main() {
  class Pen {
    /**
     * Constructor for the Pen class.
     * @param {string} brand - The brand of the pen
     * @param {string} colour - The colour of the pen
     * @param {string} inkLevel - The amount of ink in the pen (mL), assumed to be the maximum ink level as well
     */
    constructor(brand = "Bic", colour = "Black", inkLevel = 100) {
      this.brand = brand;
      this.colour = colour;
      this.inkLevel = inkLevel;
      this.#maxInkLevel = inkLevel;
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
      } else if (value > this.maxInkLevel) {
        throw new Error(`The ink level cannot be greater than the maximum.`);
      } else {
        this.#inkLevel = value;
      }
    }

    #maxInkLevel;
    get maxInkLevel() {
      return this.#maxInkLevel;
    }
    set maxInkLevel(value) {
      throw new Error(
        `Changing the maximum ink level is not supported, the pen can only contain the maximum ink initially provided.`
      );
    }

    /**
     * This method "writes a message" at the cost of 0.1mL of the ink per character. If the ink level is too low, a message is written to the console.
     * @param {number} characters - The number of characters to write
     */
    write(characters) {
      try {
        this.inkLevel -= characters * 0.1;
      } catch (error) {
        // This is arguably not the best thing to do, as we are tying this class to this environment by using output(). However, the alternative is to call write every time we want to write something, which is not ideal, or create /another/ helper method to wrap around write.
        output(error.message);
      }
    }

    /**
     * This method calculates the percentage of ink remaining.
     * @returns {string} - The percentage of ink remaining
     */
    inkRemaining() {
      return `${((this.inkLevel / this.maxInkLevel) * 100).toFixed(2)}%`;
    }
  }

  const pen = new Pen("Bic", "Blue", 150);
  pen.write(100);
  pen.write(42);
  pen.write(200);
  output(`The pen has ${pen.inkRemaining()} of the ink remaining.`);
}
