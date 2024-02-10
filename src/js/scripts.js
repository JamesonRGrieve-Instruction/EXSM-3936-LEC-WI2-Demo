const jokeButton = document.querySelector("#getJoke");
const main = document.querySelector("main");

async function getJoke() {
  const joke = await fetch("https://v2.jokeapi.dev/joke/Programming?safe-mode");
  if (!joke.ok) {
    throw new Error(`Failed to fetch joke with status ${joke.status}: ${joke.statusText}.`);
  }
  const jokeData = await joke.json();
  return jokeData;
}

jokeButton.addEventListener("click", async () => {
  const joke = await getJoke();
  if (joke.type === "single") {
    const jokeElement = document.createElement("p");
    jokeElement.textContent = joke.joke;
    main.appendChild(jokeElement);
  } else if (joke.type === "twopart") {
    // Create the setup.
    const setupElement = document.createElement("p");
    setupElement.textContent = joke.setup;
    // Create the punchline.
    const deliveryElement = document.createElement("p");
    deliveryElement.textContent = joke.delivery;
    // Start the punchline as hidden.
    deliveryElement.classList.add("hidden");
    // Create the reveal button.
    const revealButton = document.createElement("button");
    revealButton.textContent = "Reveal Punchline";
    // Add the event listener to reveal the punchline.
    revealButton.addEventListener("click", () => {
      deliveryElement.classList.remove("hidden");
    });
    // Append the elements to the main element.
    main.appendChild(setupElement);
    main.appendChild(revealButton);
    main.appendChild(deliveryElement);
  }
  main.appendChild(document.createElement("hr"));
});
