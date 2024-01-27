const submitButton = document.querySelector("button");
const main = document.querySelector("main");
const urlInput = document.querySelector("#input-url");
const nameInput = document.querySelector("#input-name");
const tagInput = document.querySelector("#input-tags");
const searchInput = document.querySelector("#input-search");

function clickRemove(event) {
  // Create Modal
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.id = "remove-" + event.target.parentNode.parentNode.parentNode.id;
  // Create Confirm Button
  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirm";
  confirmButton.addEventListener("click", removeImage);
  // Create Cancel Button
  const removeButton = document.createElement("button");
  removeButton.textContent = "Cancel";
  removeButton.addEventListener("click", cancelModal);
  // Build Modal
  modal.appendChild(confirmButton);
  modal.appendChild(removeButton);
  main.appendChild(modal);
}
function clickClone(event) {
  const target = event.target.parentNode.parentNode.parentNode;
  const clone = target.cloneNode(true);
  clone.querySelector(".fa-trash-can").addEventListener("click", clickRemove);
  clone.querySelector(".fa-clone").addEventListener("click", clickClone);
  for (const tag of clone.querySelectorAll("li>a")) {
    tag.addEventListener("click", (event) => {
      event.preventDefault();
      searchInput.value = tag.innerText.replace("#", "");
      searchInput.dispatchEvent(new Event("input"));
    });
  }
  clone.id = target.id + "-clone";
  main.appendChild(clone);
}
function removeImage(event) {
  const target = document.querySelector("#" + event.target.parentNode.id.replace("remove-", ""));
  target.remove();
  event.target.parentNode.remove();
}
function cancelModal(event) {
  event.target.parentNode.remove();
}

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  // Build Container
  const newImageContainer = document.createElement("div");
  newImageContainer.id = nameInput.value.replaceAll(" ", "-").toLowerCase();
  newImageContainer.classList.add("image-container");
  const newImageContainerTitleBar = document.createElement("div");

  // Build Heading
  const newImageHeading = document.createElement("h2");
  newImageHeading.textContent = nameInput.value;
  // Build Icon Buttons
  const newImageIconButtons = document.createElement("span");
  // Create Remove Button
  const removeButtonIcon = document.createElement("i");
  removeButtonIcon.classList.add("fa-solid", "fa-trash-can");
  removeButtonIcon.addEventListener("click", clickRemove);
  newImageIconButtons.appendChild(removeButtonIcon);
  // Create Clone Button
  const cloneButtonIcon = document.createElement("i");
  cloneButtonIcon.classList.add("fa-solid", "fa-clone");
  cloneButtonIcon.addEventListener("click", clickClone);
  newImageIconButtons.appendChild(cloneButtonIcon);

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
      searchInput.value = tag;
      searchInput.dispatchEvent(new Event("input"));
    });
    newImageTagA.href = "#";
    newImageTagA.textContent = "#" + tag;
    newImageTag.appendChild(newImageTagA);
    newImageTags.appendChild(newImageTag);
  }
  // Assemble New Element
  newImageContainerTitleBar.appendChild(newImageHeading);
  newImageContainerTitleBar.appendChild(newImageIconButtons);
  newImageContainer.appendChild(newImageContainerTitleBar);
  newImageContainer.appendChild(newImage);
  newImageContainer.appendChild(newImageTags);
  main.appendChild(newImageContainer);
});

searchInput.addEventListener("input", (event) => {
  const search = event.target.value;
  const images = document.querySelectorAll(".image-container");
  for (const image of images) {
    const tags = image.querySelectorAll("li");
    let found = false;
    for (const tag of tags) {
      if (tag.textContent.includes(search)) {
        found = true;
      }
    }
    if (found) {
      image.style.display = "block";
    } else {
      image.style.display = "none";
    }
  }
});
