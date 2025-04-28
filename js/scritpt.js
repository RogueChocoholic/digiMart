function essentialLoading() {
    fetchNavBar();
}

function fetchNavBar() {
  fetch("./customer-navBar.html")
    .then((response) => response.text())
    .then((data) => {
      const navbar = document.getElementById("navbar");
      navbar.innerHTML = data;
      const burgerBtn = document.getElementById("burgerBtn");
      const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
      const mobileMenu = document.getElementById("mobileMenu");
      const closeBurger = document.getElementById("closeBurger");

      burgerBtn.addEventListener("click", () => {
        mobileMenuOverlay.classList.remove("hidden");
        setTimeout(() => {
          mobileMenu.classList.remove("-translate-x-full");
        }, 10); // slight delay for transition
      });

      closeBurger.addEventListener("click", () => {
        mobileMenu.classList.add("-translate-x-full");
        setTimeout(() => {
          mobileMenuOverlay.classList.add("hidden");
        }, 300); // match the duration
      });

      // Clicking outside menu closes it
      mobileMenuOverlay.addEventListener("click", (e) => {
        if (!mobileMenu.contains(e.target)) {
          mobileMenu.classList.add("-translate-x-full");
          setTimeout(() => {
            mobileMenuOverlay.classList.add("hidden");
          }, 300);
        }
      });
    })
    .catch((error) => console.error("Error fetching navbar:", error));

  // event listeners
}
