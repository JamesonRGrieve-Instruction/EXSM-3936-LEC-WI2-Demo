async function main() {
    // Properties can be defined either as 'variable names', or as strings.
    const myObject = {
        firstProperty: 'firstValue',
        'second Property': 'secondValue'
    };
    
    // Either definition syntax can be accessed either with the dot operator or as an indexer, with the exception of if the key contains a space. In that case, you must use the indexer syntax.
    output(myObject.firstProperty);
    output(myObject['second Property']);

}


