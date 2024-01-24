const pageMain = document.querySelector("main");
pageMain.innerHTML = "<aside><h2>Awesome Webpack</h2></aside>";
pageMain.remove();

const pageHeader = document.querySelector("header");
pageHeader.addEventListener("click", () => {
  console.log("Header clicked");
});
pageHeader.addEventListener("mouseenter", () => {
  console.log("Mouse entered header");
});
pageHeader.addEventListener("mouseleave", () => {
  console.log("Mouse exit header");
});
document.addEventListener("keydown", (event) => {
  console.log("Key pressed - " + event.key);
});
