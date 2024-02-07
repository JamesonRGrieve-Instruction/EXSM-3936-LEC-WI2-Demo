// eslint-disable-next-line no-unused-vars
/* global output, input */
// eslint-disable-next-line no-unused-vars
async function main() {
  const tasks = [example("One", 1000), example("Two", 5000), example("Three", 2500)];
  await Promise.all(tasks);
  output("Done");
}
async function example(text, timeout) {
  await sleep(timeout);
  output("Hello World! " + text);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
