const submitButton = document.querySelector("button");
const main = document.querySelector("main");
const urlInput = document.querySelector("#input-url");
const nameInput = document.querySelector("#input-name");
const tagInput = document.querySelector("#input-tags");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Build Container
  const newImageContainer = document.createElement("div");
  newImageContainer.classList.add("image-container");
  // Build Heading
  const newImageHeading = document.createElement("h2");
  newImageHeading.textContent = nameInput.value;
  // Build Image
  const newImage = document.createElement("img");
  newImage.src = urlInput.value;
  newImage.alt = nameInput.value;
  // Build Tags
  const newImageTags = document.createElement("ul");
  // For each tag in the input, create a new li element.
  for (const tag of tagInput.value.split(" ")) {
    const newImageTag = document.createElement("li");

    const newImageTagA = document.createElement("a");
    // Prevent the link from trying to navigate.
    newImageTagA.addEventListener("click", (event) => {
      event.preventDefault();
    });
    newImageTagA.href = "#";
    newImageTagA.textContent = "#" + tag;

    newImageTag.appendChild(newImageTagA);
    newImageTags.appendChild(newImageTag);
  }

  // Assemble New Element
  newImageContainer.appendChild(newImageHeading);
  newImageContainer.appendChild(newImage);
  newImageContainer.appendChild(newImageTags);
  main.appendChild(newImageContainer);
});
