// eslint-disable-next-line no-unused-vars
/* global output, input */
// eslint-disable-next-line no-unused-vars
async function main() {
  const data = (await (await fetch("https://randomuser.me/api/?inc=name,email,location&results=5")).json()).results;
  // 1. Fetch (and await it).
  // 2. Convert the response to JSON (and await it).
  // 3. Pull the propert(ies) from the JSON that we care about.
  // 4. Loop over the results and output the desired message.
  for (const user of data) {
    output(
      `Hello, ${user.name.title} ${user.name.first} ${user.name.last} (${user.email}) of ${user.location.city} ${user.location.state}, ${user.location.country}!`,
    );
  }

  const dataWithThen = fetch("https://randomuser.me/api/?inc=name,email,location&results=5")
    .then((response) => {
      if (response.ok) {
        response.json();
      } else {
        throw new Error("Something went wrong.");
      }
    })
    .then((jsonData) => jsonData.results)
    .then((users) => {
      for (const user of users) {
        output(
          `Hello, ${user.name.title} ${user.name.first} ${user.name.last} (${user.email}) of ${user.location.city} ${user.location.state}, ${user.location.country}!`,
        );
      }
    });
}
async function example(text, timeout) {
  await sleep(timeout);
  output("Hello World! " + text);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
