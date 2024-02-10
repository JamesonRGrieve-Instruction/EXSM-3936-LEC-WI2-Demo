const urlInput = document.querySelector("#qr-url");
const qrTarget = document.querySelector("main>section");
const placeholder = document.querySelector(".image-placeholder");
let activeQR = null;
urlInput.addEventListener("input", async (event) => {
  if (event.target.value) {
    const qrCode = await (
      await fetch(`http://api.qrserver.com/v1/create-qr-code/?data=${event.target.value}&size=100x100`)
    ).blob();
    if (activeQR) {
      activeQR.remove();
      placeholder.classList.remove("hidden");
    }
    activeQR = document.createElement("img");
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
