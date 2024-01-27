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

function createEditButton() {
  const btn = document.createElement("i");
  btn.classList.add("fa-solid", "fa-pen-to-square");
  btn.addEventListener("click", clickEdit);
  return btn;
}

function createCloneButton() {
  const btn = document.createElement("i");
  btn.classList.add("fa-solid", "fa-clone");
  btn.addEventListener("click", clickClone);
  return btn;
}

function createSaveButton() {
  const btn = document.createElement("i");
  btn.classList.add("fa-solid", "fa-save");
  btn.addEventListener("click", clickSave);
  return btn;
}

function createCancelButton() {
  const btn = document.createElement("i");
  btn.classList.add("fa-solid", "fa-times");
  btn.addEventListener("click", clickCancel);
  return btn;
}

function createRemoveButton() {
  const btn = document.createElement("i");
  btn.classList.add("fa-solid", "fa-trash-can");
  btn.addEventListener("click", clickRemove);
  return btn;
}

function createNameInput(value) {
  const input = document.createElement("input");
  input.placeholder = value;
  input.type = "text";
  input.value = value;
  input.classList.add("edit");
  return input;
}

function clickSave(event) {
  const target = event.target.parentNode.parentNode.parentNode;
  const name = target.querySelector("input");
  const editButton = createEditButton();
  const cloneButton = createCloneButton();
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
    showModal(error.message);
    console.error(error);
  }
}
function clickCancel(event) {
  // This function changes the input back into an h2 containing the same text as the input did, changes the save button into an edit button, and changes the cancel button into a clone button.
  const target = event.target.parentNode.parentNode.parentNode;
  const name = target.querySelector("input");
  const editButton = createEditButton();
  const cloneButton = createCloneButton();
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
  const saveButton = createSaveButton();
  const cancelButton = createCancelButton();
  const nameInput = createNameInput(name.textContent);
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
    showModal(error.message);
    console.error(error);
  }
}
function clickRemove(event) {
  showModal("Are you sure you want to delete this image?", true, event);
}
function removeImage(event) {
  const target = document.querySelector("#" + event.target.parentNode.parentNode.id.replace("remove-", ""));
  target.remove();
  event.target.parentNode.parentNode.remove();
}
function cancelModal(event) {
  event.target.parentNode.parentNode.remove();
}

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  // prevent user from submitting with empty inputs
  if (!urlInput.value.trim() || !nameInput.value.trim() || !tagInput.value.trim()) {
    showModal("Please fill out all the input fields!");
    return;
  }

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
  const editButtonIcon = createEditButton();
  newImageIconButtons.appendChild(editButtonIcon);
  // Create Clone Button
  const cloneButtonIcon = createCloneButton();
  newImageIconButtons.appendChild(cloneButtonIcon);
  // Create Remove Button
  const removeButtonIcon = createRemoveButton();
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
    showModal(error.message);
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

/**
 * This function shows a custom modal with a message
 * @param {string} message - Message to be displayed
 * @param {boolean} deleteImage - Set if the modal is being used to delete an image
 * @param {Event | Null} event - Event that was used to open modal (only used if removeImage is true)
 */
function showModal(message, deleteImage = false, event = null) {
  // Create Modal
  const modal = document.createElement("div");
  modal.classList.add("modal");

  if (deleteImage) modal.id = "remove-" + event.target.parentNode.parentNode.parentNode.id;

  // Create Confirm Button
  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirm";
  confirmButton.addEventListener("click", removeImage);

  // Create Cancel Button
  const removeButton = document.createElement("button");
  removeButton.textContent = "Close";
  removeButton.addEventListener("click", cancelModal);

  // Create message container
  const messageContainer = document.createElement("p");
  messageContainer.innerText = message;

  // Create button container
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("modal-buttons");

  // Build Modal
  if (deleteImage) btnContainer.appendChild(confirmButton);
  btnContainer.appendChild(removeButton);
  modal.appendChild(messageContainer);
  modal.appendChild(btnContainer);
  main.appendChild(modal);
}
