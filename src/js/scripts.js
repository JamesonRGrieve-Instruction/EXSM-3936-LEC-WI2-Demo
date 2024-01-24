const submitButton = document.querySelector("button");
const main = document.querySelector("main");
const urlInput = document.querySelector("#input-url");
const nameInput = document.querySelector("#input-name");
const tagInput = document.querySelector("#input-tags");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newImage = document.createElement("img");
  newImage.src = urlInput.value;
  newImage.alt = nameInput.value;
  main.appendChild(newImage);
});
