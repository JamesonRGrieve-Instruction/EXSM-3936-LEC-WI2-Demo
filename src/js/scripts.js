// eslint-disable-next-line no-unused-vars
/* global output, input */
// eslint-disable-next-line no-unused-vars
async function main() {
  function namedFunction() {
    output("namedFunction");
  }

  const myObject = {
    // Properties can be defined either as 'variable names', or as strings.
    firstProperty: "firstValue",
    "second Property": "secondValue",
    // Methods can be defined either as anonymous functions, or as references to named functions.
    firstFunc: () => {
      output("firstFunc");
    },
    secondFunc: namedFunction,
  };

  // Either definition syntax can be accessed either with the dot operator or as an indexer, with the exception of if the key contains a space. In that case, you must use the indexer syntax.
  output(myObject.firstProperty);
  output(myObject["second Property"]);

  // Methods can also be invoked with either the dot operator or indexer syntax.
  myObject.firstFunc();
  namedFunction();
  myObject["secondFunc"]();

  // JSON (JavaScript Object Notation) is a standard for representing objects as strings. It is used for data interchange between applications.
  output(JSON.stringify(myObject));

  const jsonObject = JSON.stringify(myObject);
  const parsedObject = JSON.parse(jsonObject);

  // The parsed object is a regular JavaScript object, and can be accessed with either the dot operator or indexer syntax.
  // Note that JSON does not suppoert functions, so the methods are not included in the parsed object.
  // If you need to include functions in your JSON, you can use a class for the object which will reassociate functionality to the object.
  output(parsedObject.firstProperty);
  output(parsedObject["second Property"]);

  class MyClass {
    // The constructor is a special method that is invoked when the class is instantiated.
    constructor(fieldOne, propOne, propertyObjectField = "child default value") {
      this.exampleFieldOne = fieldOne;
      // It's important to use the property mutator here, otherwise the value will not be validated.
      this.exampleProperty = propOne;
      this.exampleObjectField = new MyPropertyClass(propertyObjectField);
    }

    // Fields ("dumb" variables)
    exampleFieldOne;
    exampleFieldTwo = 0;
    exampleObjectField;

    // Property ("smart" variable)
    // The # indicates that the backing field (in this case) is private - it cannot be directly accessed or mutated from outside the class.
    #exampleProperty;
    // In this accessor and mutator, no validation or formatting is being performed, they are serving as a simple pass-through to the backing field.
    get exampleProperty() {
      return this.#exampleProperty;
    }
    set exampleProperty(value) {
      this.#exampleProperty = value;
    }

    // Methods are declared in a slightly different way than in an anonymous object.
    firstFunc() {
      output("firstFunc");
    }

    secondFunc() {
      output("secondFunc");
    }

    thirdFunc = () => {
      output("thirdFunc");
    };

    increment() {
      this.exampleFieldTwo++;
    }

    toString() {
      return `This ${this.exampleFieldOne} has a count of ${this.exampleFieldTwo} and is ${this.exampleProperty}!`;
    }

    static get staticProperty() {
      return "This is a static property and the value can be accessed directly from the class.";
    }
  }
  class MyPropertyClass {
    constructor(fieldOne = "default value") {
      this.exampleFieldOne = fieldOne;
    }
    exampleFieldOne;

    getUppercase() {
      return this.exampleFieldOne.toUpperCase();
    }
  }
  output("---Class Result---");
  // To instantiate a class, use the new keyword.
  const myObjectOfClass = new MyClass("exampleFieldOneValue", "examplePropertyValue");
  // The resulting object contains any default values prescribed in its class, plus anything defined in the constructor.
  output(myObjectOfClass.exampleFieldOne);
  output(myObjectOfClass.exampleFieldTwo);
  output(myObjectOfClass.exampleProperty);
  myObjectOfClass.firstFunc();
  myObjectOfClass.secondFunc();
  myObjectOfClass.thirdFunc();

  // By overriding the toString() method, we can change the format mask applied to the object when it is converted to a string.
  output(myObjectOfClass.toString());

  // Since the object's properties don't behave nicely with JSON, we can use the spread operator to create a new object with the same fields, and then manually assign the properties' getters to fields so that they are included in the JSON.
  const jsonClassObject = JSON.stringify({
    ...myObjectOfClass,
    exampleProperty: myObjectOfClass.exampleProperty,
  });
  output(jsonClassObject);
  // To reimport the object, we can create a new instance of the class, and then use JSON.parse to convert the JSON string back into an object before using Object.assign to merge them together.
  const parseClassdObject = Object.assign(new MyClass(), JSON.parse(jsonClassObject));

  // The resulting object is a classed object exactly like the original, and can be used in the same way.
  output("---JSON Reimport Result---");
  output(parseClassdObject.exampleFieldOne);
  output(parseClassdObject.exampleFieldTwo);
  output(parseClassdObject.exampleProperty);
  parseClassdObject.firstFunc();
  parseClassdObject.secondFunc();
  parseClassdObject.thirdFunc();

  parseClassdObject.increment();
  parseClassdObject.increment();
  parseClassdObject.increment();
  output(parseClassdObject.exampleFieldTwo);

  output(MyClass.staticProperty);

  // -- Use of Object Properties --
  // The constructor of the "parent" calls the constructor of the "child" to create the object referenced in the property.
  const parentObject = new MyClass("parentFieldValueOne", "parentPropertyValueOne");
  output(parentObject.exampleObjectField.exampleFieldOne);
  output(parentObject.exampleObjectField.getUppercase());

  // We can set another reference to that "child" which will point to the same object.
  const refToChildObject = parentObject.exampleObjectField;
  output(refToChildObject.exampleFieldOne);
  output(refToChildObject.getUppercase());

  // Just because this relationship exists, does NOT mean that the "child" cannot be used independently.
  const refToNewChild = new MyPropertyClass("standaloneFieldValueOne");
  output(refToNewChild.exampleFieldOne);
  output(refToNewChild.getUppercase());

  // If we choose, we can also change the reference of the parent to another child object (assuming there is no mutator validation prohibiting this).
  // There is nothing restricting the class of the object assigned to this property (currently) - it could be another object of the "parent" class, or any other object.
  parentObject.exampleObjectField = refToNewChild;

  // At this point, the original "child" object is no longer referenced by the parent's property, but it is still referenced by refToChildObject, meaning it will persist.
}
