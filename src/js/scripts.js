const submitButton = document.querySelector("button");
const main = document.querySelector("main");
const urlInput = document.querySelector("#input-url");
const nameInput = document.querySelector("#input-name");
const tagInput = document.querySelector("#input-tags");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  main.innerHTML = `<img src="${urlInput.value}" alt="${nameInput.value}" />`;
});
