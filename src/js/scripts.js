async function main() {
    function namedFunction() {
        output('namedFunction');
    }

    const myObject = {
        // Properties can be defined either as 'variable names', or as strings.
        firstProperty: 'firstValue',
        'second Property': 'secondValue',
        // Methods can be defined either as anonymous functions, or as references to named functions.
        firstFunc: () => {
            output('firstFunc');
        },
        secondFunc: namedFunction
    };
    
    // Either definition syntax can be accessed either with the dot operator or as an indexer, with the exception of if the key contains a space. In that case, you must use the indexer syntax.
    output(myObject.firstProperty);
    output(myObject['second Property']);

    // Methods can also be invoked with either the dot operator or indexer syntax.
    myObject.firstFunc();
    namedFunction();
    myObject['secondFunc']();

    // JSON (JavaScript Object Notation) is a standard for representing objects as strings. It is used for data interchange between applications.
    output(JSON.stringify(myObject));

    const jsonObject = JSON.stringify(myObject);
    const parsedObject = JSON.parse(jsonObject);

    // The parsed object is a regular JavaScript object, and can be accessed with either the dot operator or indexer syntax.
    // Note that JSON does not suppoert functions, so the methods are not included in the parsed object.
    // If you need to include functions in your JSON, you can use a class for the object which will reassociate functionality to the object.
    output(parsedObject.firstProperty);
    output(parsedObject['second Property']);

    class MyClass {
        // The constructor is a special method that is invoked when the class is instantiated.
        constructor(fieldOne, propOne) {
            this.exampleFieldOne = fieldOne;
            // It's important to use the property mutator here, otherwise the value will not be validated.
            this.exampleProperty = propOne;
        }

        // Fields ("dumb" variables)
        exampleFieldOne;
        exampleFieldTwo = 0;

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
            output('firstFunc');
        }

        secondFunc() {
            output('secondFunc');
        }

        thirdFunc = () => {
            output('thirdFunc');
        }

        increment() {
            this.exampleFieldTwo++;
        }
    }
    output("---Class Result---");
    const myObjectOfClass = new MyClass('exampleFieldOneValue', 'examplePropertyValue');
    output(myObjectOfClass.exampleFieldOne);
    output(myObjectOfClass.exampleFieldTwo);
    output(myObjectOfClass.exampleProperty);
    myObjectOfClass.firstFunc();
    myObjectOfClass.secondFunc();
    myObjectOfClass.thirdFunc();


    const jsonClassObject = JSON.stringify(myObjectOfClass);
    output(jsonClassObject);
    const parseClassdObject = Object.assign(new MyClass(), JSON.parse(jsonClassObject));

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
    
}


