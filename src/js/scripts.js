const number = document.querySelector("main h2");
const input = document.querySelector("#input-add");
const buttonSubmit = document.querySelector("#button-submit");
const buttonClear = document.querySelector("#button-clear");

buttonSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  number.textContent = Number(number.textContent) + Number(input.value);
  input.value = "0";
});
buttonClear.addEventListener("click", (event) => {
  event.preventDefault();
  number.textContent = "0";
  input.value = "0";
});
