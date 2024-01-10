async function main() {
    // This is where the code you're actually experimenting with goes.
    
    let prompt = "Please enter your name, or 'Exit' to quit: "
    let name = await input(prompt);

    while (name != "Exit") 
    {
        output("Hello, "+name+"!");
        name = await input(prompt);
    }
}


