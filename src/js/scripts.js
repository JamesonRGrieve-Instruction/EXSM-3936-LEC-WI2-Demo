// eslint-disable-next-line no-unused-vars
/* global output, input */
// eslint-disable-next-line no-unused-vars
async function main() {
  class WritingImplement {
    constructor(brand, colour) {
      if (this.constructor === WritingImplement) {
        throw new Error(`The WritingImplement class is abstract and cannot be instantiated.`);
      }
      this.brand = brand;
      this.colour = colour;
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

    // eslint-disable-next-line no-unused-vars
    write(characters) {
      throw new Error(`The write method is not implemented in this abstract class.`);
    }
  }
  class Pen extends WritingImplement {
    /**
     * Constructor for the Pen class.
     * @param {string} brand - The brand of the pen
     * @param {string} colour - The colour of the pen
     * @param {string} inkLevel - The amount of ink in the pen (mL), assumed to be the maximum ink level as well
     */
    constructor(brand = "Bic", colour = "Black", inkLevel = 100) {
      super(brand, colour);
      this.inkLevel = inkLevel;
      this.#maxInkLevel = inkLevel;
    }

    #inkLevel;
    get inkLevel() {
      return this.#inkLevel;
    }
    set inkLevel(value) {
      if (value < 0) {
        throw new Error(
          `Writing that many characters would use too much ink. There is only ${this.inkLevel}% of the ink remaining.`,
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
        `Changing the maximum ink level is not supported, the pen can only contain the maximum ink initially provided.`,
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

    get inkRemaining() {
      return `${((this.inkLevel / this.maxInkLevel) * 100).toFixed(2)}%`;
    }

    toString() {
      return `The pen has ${this.inkRemaining} of the ink remaining.`;
    }
  }
  class Pencil extends WritingImplement {
    /**
     * Constructor for the Pen class.
     * @param {string} brand - The brand of the pencil.
     * @param {string} colour - The colour of the pencil.
     */
    constructor(brand = "Dixon", colour = "Orange") {
      super(brand, colour);
      this.#sharpness = 0;
      this.#length = 19;
    }
    #sharpness;
    get sharpness() {
      return this.#sharpness;
    }
    #length;
    get length() {
      return this.#length;
    }

    write(characters) {
      try {
        if (this.sharpness < 0.1) {
          throw new Error(`The pencil is too dull to write.`);
        } else {
          this.#sharpness -= characters * 0.1;
        }
      } catch (error) {
        // This is arguably not the best thing to do, as we are tying this class to this environment by using output(). However, the alternative is to call write every time we want to write something, which is not ideal, or create /another/ helper method to wrap around write.
        output(error.message);
      }
    }

    sharpen() {
      if (this.length > 0) {
        this.#sharpness = 10;
        this.#length--;
      } else {
        output("The pencil is too short to be sharpened.");
      }
    }

    toString() {
      return `The pencil has ${this.sharpness} sharpness remaining and ${this.length}cm length remaining.`;
    }
  }

  const pen = new Pen("Bic", "Blue", 150);
  pen.write(100);
  pen.write(42);
  pen.write(200);
  output(`The pen has ${pen.inkRemaining()} of the ink remaining.`);
  output(`The pen is ${pen.colour} and is of the ${pen.brand} brand.`);

  const pencil = new Pencil("Dixon", "Orange");
  pencil.write(90);
  output(`The pencil has ${pencil.sharpness} sharpness remaining and ${pencil.length}cm length remaining.`);
  pencil.sharpen();
  output(`The pencil has ${pencil.sharpness} sharpness remaining and ${pencil.length}cm length remaining.`);

  const writingImplements = [pen, pencil];
  for (const writingImplement of writingImplements) {
    output(`The writing implement has ${writingImplement.colour} colour and is of the ${writingImplement.brand} brand.`);
    writingImplement.write(10);
    output(writingImplement.toString());
  }

  const writingImplement = new WritingImplement("Bic", "Blue");
}
