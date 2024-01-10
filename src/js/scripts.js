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
}


