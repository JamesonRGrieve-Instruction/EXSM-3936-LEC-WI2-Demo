/* global output, input */
// eslint-disable-next-line no-unused-vars
async function main() {
  // This is where the code you're actually experimenting with goes.

  const prompt = "Please enter your name, or 'Exit' to quit: ";
  let name = await input(prompt);

  while (name !== "Exit") {
    output("Hello, " + name + "!");
    name = await input(prompt);
  }
}
