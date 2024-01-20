// eslint-disable-next-line no-unused-vars
/* global output, input */
// eslint-disable-next-line no-unused-vars
async function main() {
  class Person {
    constructor(firstName, middleName, lastName) {
      if (this.constructor === Person) {
        throw new Error("This class is abstract and cannot be instantiated.");
      }
      this.firstName = firstName;
      this.middleName = middleName;
      this.lastName = lastName;
    }

    firstName;
    middleName;
    lastName;

    get fullName() {
      return `${this.firstName} ${this.middleName} ${this.lastName}`;
    }

    greet() {
      throw new Error("This function is abstract and must be implemented in the child class.");
    }
  }

  class Student extends Person {
    constructor(firstName, middleName, lastName) {
      super(firstName, middleName, lastName);
    }

    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }

    greet() {
      return `Hello, my name is ${this.fullName} and I am a student!`;
    }
  }
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

  const student = new Student("John", "Jacob", "Jingleheimer-Schmidt");
  const lawyer = new Lawyer("Jane", "Jacob", "Jingleheimer-Schmidt");
  const busDriver = new BusDriver("Joe", "Jacob", "Jingleheimer-Schmidt");
  const anotherBusDriver = new BusDriver("Josh", "Jacob", "Jingleheimer-Schmidt");

  const people = [student, lawyer, busDriver, anotherBusDriver];

  for (const person of people) {
    output(person.greet());
  }
}
