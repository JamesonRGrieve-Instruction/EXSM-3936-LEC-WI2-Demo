const urlInput = document.querySelector("#qr-url");
const qrTarget = document.querySelector("main>section");
const placeholder = document.querySelector(".image-placeholder");
let activeQR = null;
urlInput.addEventListener("input", async (event) => {
  if (event.target.value) {
    const qrCode = await (
      await fetch(
        `http://api.qrserver.com/v1/create-qr-code/?data=${event.target.value}&size=${
          placeholder.classList.contains("image-large") ? "500x500" : "100x100"
        }`,
      )
    ).blob();
    if (activeQR) {
      activeQR.remove();
      placeholder.classList.remove("hidden");
    }
    activeQR = document.createElement("img");
    if (placeholder.classList.contains("image-large")) {
      activeQR.classList.add("image-large");
    }
    activeQR.addEventListener("click", () => {
      activeQR.classList.toggle("image-large");
      placeholder.classList.toggle("image-large");
      // Re-fire the input change event if we click, which will re-render the QR code in the updated size.
      urlInput.dispatchEvent(event);
    });
    activeQR.src = URL.createObjectURL(qrCode);
    qrTarget.appendChild(activeQR);
    placeholder.classList.add("hidden");
  } else {
    if (activeQR) {
      activeQR.remove();
      placeholder.classList.remove("hidden");
    }
  }
});
