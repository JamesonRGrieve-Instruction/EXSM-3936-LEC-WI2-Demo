const userButton = document.querySelector("#loadUser");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
let userPage = 1;
let loading = false;

async function getUser() {
  const user = await fetch("https://randomuser.me/api/?seed=exsm3936&inc=name,email,phone,picture&page=" + userPage);
  if (user.status !== 200) {
    throw new Error(`Failed to fetch user with status ${user.status}: ${user.statusText}.`);
  }
  return (await user.json()).results[0];
}
userButton.addEventListener("click", async () => {
  if (!loading) {
    let user;
    try {
      loading = true;
      user = await getUser();
      userPage++;
    } catch (error) {
      console.error(error);
      let errorElement = document.querySelector("footer p");
      if (errorElement === null) {
        errorElement = document.createElement("p");
        footer.appendChild(errorElement);
      }
      errorElement.textContent = "ERROR: " + error.message;
    }
    if (user) {
      const userElement = document.createElement("div");

      const userName = document.createElement("h2");
      userName.textContent = `${user.name.first} ${user.name.last}`;
      userElement.appendChild(userName);

      const userImage = document.createElement("img");
      userImage.src = user.picture.large;
      userElement.appendChild(userImage);

      const userEmail = document.createElement("a");
      userEmail.href = `mailto:${user.email}`;
      userEmail.textContent = user.email;
      userElement.appendChild(userEmail);

      const userPhone = document.createElement("a");
      userPhone.href = `tel:${user.phone}`;
      userPhone.textContent = user.phone;
      userElement.appendChild(userPhone);

      main.appendChild(userElement);
    }
    loading = false;
  }
});
