// eslint-disable-next-line no-unused-vars
/* global output, input */
// eslint-disable-next-line no-unused-vars
async function main() {
  class Person {
    constructor(firstName, middleName, lastName) {
      // If the class is directly instantiated, throw an error as it is abstract and should not be.
      if (this.constructor === Person) {
        throw new Error("This class is abstract and cannot be instantiated.");
      }
      // By assigning these here, we reduce redundant code by avoiding repeating these lines in all 3 subclasses - it's okay to be here since the above error will prevent this class from being instantiated even though they are assigned.
      this.firstName = firstName;
      this.middleName = middleName;
      this.lastName = lastName;
    }

    firstName;
    middleName;
    lastName;

    // Bus Driver will get this from the parent class, but Student and Lawyer will override it.
    get fullName() {
      return `${this.firstName} ${this.middleName} ${this.lastName}`;
    }

    // This is an abstract method that must be implemented in the child class. In JavaScript, it's really only here to tell the developer that they need to implement it in the child class - JavaScript has no way to enforce this otherwise.
    greet() {
      throw new Error("This function is abstract and must be implemented in the child class.");
    }
  }

  class Student extends Person {
    constructor(firstName, middleName, lastName) {
      // Call the parent constructor where the fields are assigned. No other actions need to be taken here.
      super(firstName, middleName, lastName);
    }

    // Override the parent class's getter for fullName.
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }

    // Override the parent class's greet method.
    greet() {
      return `Hello, my name is ${this.fullName} and I am a student!`;
    }
  }

  // The Lawyer and BusDriver classes are very similar, so I'm not going to comment them.
  class Lawyer extends Person {
    constructor(firstName, middleName, lastName) {
      super(firstName, middleName, lastName);
    }

    get fullName() {
      return `${this.firstName} ${this.middleName[0]}. ${this.lastName}`;
    }

    greet() {
      return `Hello, my name is ${this.fullName} Esq. and I am a lawyer.`;
    }
  }
  class BusDriver extends Person {
    constructor(firstName, middleName, lastName) {
      super(firstName, middleName, lastName);
    }

    greet() {
      return `Hello, my name is ${this.fullName} and I drive a bus!`;
    }
  }
  // Create a polymorphic array of people. Since they all inherit from Person, we can assume they all have a greet method (if they don't, we'll get an error when we try to call it because we know it's abstract and must be implemented in the child class).
  const people = [
    new Student("John", "Jacob", "Jingleheimer-Schmidt"),
    new Lawyer("Jane", "Jacob", "Jingleheimer-Schmidt"),
    new BusDriver("Joe", "Jacob", "Jingleheimer-Schmidt"),
    new BusDriver("Josh", "Jacob", "Jingleheimer-Schmidt"),
  ];

  // Loop through the array and call the greet method on each person. By using polymorphism, we don't need to know what type of person they are - we just know they have a greet method.
  for (const person of people) {
    output(person.greet());
  }
}
