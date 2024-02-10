const urlInput = document.querySelector("#qr-url");
const qrTarget = document.querySelector("main>section>img");
let mostRecentChange = null;
const smallSize = "100x100";
const largeSize = "500x500";
const apiURL = (data) =>
  `https://api.qrserver.com/v1/create-qr-code/?data=${data}&size=${
    qrTarget.classList.contains("image-large") ? largeSize : smallSize
  }`;

qrTarget.addEventListener("click", () => {
  qrTarget.classList.toggle("image-large");
  // Re-fire the input change event if we click, which will re-render the QR code in the updated size.
  urlInput.dispatchEvent(mostRecentChange);
});
urlInput.addEventListener("input", async (event) => {
  mostRecentChange = event;
  if (event.target.value) {
    const qrCode = await (await fetch(apiURL(event.target.value))).blob();
    qrTarget.src = URL.createObjectURL(qrCode);
  } else {
    qrTarget.src = "https://placehold.co/250";
  }
});
