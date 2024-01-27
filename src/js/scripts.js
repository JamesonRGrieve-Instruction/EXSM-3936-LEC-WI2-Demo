const submitButton = document.querySelector("button");
const main = document.querySelector("main");
const urlInput = document.querySelector("#input-url");
const nameInput = document.querySelector("#input-name");
const tagInput = document.querySelector("#input-tags");
const searchInput = document.querySelector("#input-search");

function sortImageContainers() {
  const imageContainers = Array.from(document.querySelectorAll(".image-container"));
  const sortedContainers = imageContainers.sort((a, b) => {
    const titleA = a.querySelector("h2").textContent.toLowerCase();
    const titleB = b.querySelector("h2").textContent.toLowerCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });
  sortedContainers.forEach((container) => {
    main.appendChild(container);
  });
}

function checkForExistingImage(newTitle, newId) {
  const existingTitles = Array.from(document.querySelectorAll(".image-container h2")).map((element) =>
    element.textContent.toLowerCase(),
  );
  const existingIds = Array.from(document.querySelectorAll(".image-container[id$='-clone']")).map((element) => element.id);
  const updatedTitle = newTitle.toLowerCase();
  if (existingTitles.includes(updatedTitle) || existingIds.includes(newId)) {
    throw new Error("Image already exists");
  }
}

function clickSave(event) {
  const target = event.target.parentNode.parentNode.parentNode;
  const name = target.querySelector("input");
  const editButton = document.createElement("i");
  editButton.classList.add("fa-solid", "fa-pen-to-square");
  editButton.addEventListener("click", clickEdit);
  const cloneButton = document.createElement("i");
  cloneButton.classList.add("fa-solid", "fa-clone");
  cloneButton.addEventListener("click", clickClone);
  const saveButton = target.querySelector(".fa-save");
  const cancelButton = target.querySelector(".fa-times");
  const nameHeading = document.createElement("h2");
  try {
    const updatedId = name.value.replaceAll(" ", "-");
    checkForExistingImage(name.value, updatedId);
    nameHeading.textContent = name.value;
    name.replaceWith(nameHeading);

    // Update the ID to match the schema
    target.id = updatedId;

    saveButton.replaceWith(editButton);
    cancelButton.replaceWith(cloneButton);
    sortImageContainers();
  } catch (error) {
    console.error(error);
  }
}
function clickCancel(event) {
  // This function changes the input back into an h2 containing the same text as the input did, changes the save button into an edit button, and changes the cancel button into a clone button.
  const target = event.target.parentNode.parentNode.parentNode;
  const name = target.querySelector("input");
  const editButton = document.createElement("i");
  editButton.classList.add("fa-solid", "fa-pen-to-square");
  editButton.addEventListener("click", clickEdit);
  const cloneButton = document.createElement("i");
  cloneButton.classList.add("fa-solid", "fa-clone");
  cloneButton.addEventListener("click", clickClone);
  const saveButton = target.querySelector(".fa-save");
  const cancelButton = target.querySelector(".fa-times");
  const nameHeading = document.createElement("h2");
  nameHeading.textContent = name.placeholder;
  name.replaceWith(nameHeading);
  saveButton.replaceWith(editButton);
  cancelButton.replaceWith(cloneButton);
}
function clickEdit(event) {
  // This function changes the h2 into an input containing the same text as the h2 did, changes the edit button into a save button, and changes the clone button into a cancel button.
  const target = event.target.parentNode.parentNode.parentNode;
  const name = target.querySelector("h2");
  const editButton = target.querySelector(".fa-pen-to-square");
  const cloneButton = target.querySelector(".fa-clone");
  const saveButton = document.createElement("i");
  saveButton.classList.add("fa-solid", "fa-save");
  saveButton.addEventListener("click", clickSave);
  const cancelButton = document.createElement("i");
  cancelButton.classList.add("fa-solid", "fa-times");
  cancelButton.addEventListener("click", clickCancel);
  const nameInput = document.createElement("input");
  nameInput.placeholder = name.textContent;
  nameInput.type = "text";
  nameInput.value = name.textContent;
  nameInput.classList.add("edit");
  name.replaceWith(nameInput);
  editButton.replaceWith(saveButton);
  cloneButton.replaceWith(cancelButton);
}
function clickClone(event) {
  const target = event.target.parentNode.parentNode.parentNode;
  const clone = target.cloneNode(true);
  clone.querySelector("h2").innerText += " Clone";
  clone.querySelector(".fa-pen-to-square").addEventListener("click", clickEdit);
  clone.querySelector(".fa-clone").addEventListener("click", clickClone);
  clone.querySelector(".fa-trash-can").addEventListener("click", clickRemove);
  for (const tag of clone.querySelectorAll("li>a")) {
    tag.addEventListener("click", (event) => {
      event.preventDefault();
      searchInput.value = tag.innerText.replace("#", "");
      searchInput.dispatchEvent(new Event("input"));
    });
  }
  clone.id = target.id + "-clone";
  try {
    checkForExistingImage(clone.querySelector("h2").innerText, clone.id);
    main.appendChild(clone);
    sortImageContainers();
  } catch (error) {
    console.error(error);
  }
}
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
  // Create Edit Button
  const editButtonIcon = document.createElement("i");
  editButtonIcon.classList.add("fa-solid", "fa-pen-to-square");
  editButtonIcon.addEventListener("click", clickEdit);
  newImageIconButtons.appendChild(editButtonIcon);
  // Create Clone Button
  const cloneButtonIcon = document.createElement("i");
  cloneButtonIcon.classList.add("fa-solid", "fa-clone");
  cloneButtonIcon.addEventListener("click", clickClone);
  newImageIconButtons.appendChild(cloneButtonIcon);
  // Create Remove Button
  const removeButtonIcon = document.createElement("i");
  removeButtonIcon.classList.add("fa-solid", "fa-trash-can");
  removeButtonIcon.addEventListener("click", clickRemove);
  newImageIconButtons.appendChild(removeButtonIcon);

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
  try {
    checkForExistingImage(newImageHeading.textContent, newImageContainer.id);
    main.appendChild(newImageContainer);
    sortImageContainers();
  } catch (error) {
    console.error(error);
  }
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
