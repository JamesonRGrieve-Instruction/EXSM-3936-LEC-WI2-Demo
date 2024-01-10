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
}


