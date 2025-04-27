function essentialLoading() {
  fetchSidebar();
  fetchNavBar();
}

function fetchSidebar() {
  console.log("fetching sidebar...");
  fetch("./vendor-sidebar.html")
    .then((response) => response.text())
    .then((data) => {
      const sidebar = document.getElementById("sidebar");
      sidebar.innerHTML = data;

      // After sidebar is loaded, find active link
      const sidebarLinks = sidebar.querySelectorAll(".sidebar-item");

      // Get the current page filename (like 'vendor-dashboard-financial-overview.html')
      const currentPage = window.location.pathname.split("/").pop();

      sidebarLinks.forEach((link) => {
        // Get the href without leading ./
        const linkPage = link.getAttribute("href").replace("./", "");

        if (linkPage === currentPage) {
          link.classList.add("active");
        } else {
          link.classList.remove("active"); // in case of reload
        }
      });
    })
    .catch((error) => console.error("Error fetching sidebar:", error));
}
function fetchNavBar() {
  fetch("./vendor-navBar.html")
    .then((response) => response.text())
    .then((data) => {
      const navbar = document.getElementById("navbar");
      navbar.innerHTML = data;

      // Now attach event listeners
      const profileDropdownBtn = document.getElementById("profileDropdownBtn");
      const profileDropdown = document.getElementById("profileDropdown");

      profileDropdownBtn.addEventListener("click", () => {
        profileDropdown.classList.toggle("show");
      });

      window.addEventListener("click", (event) => {
        if (
          !profileDropdownBtn.contains(event.target) &&
          !profileDropdown.contains(event.target)
        ) {
          profileDropdown.classList.remove("show");
        }
      });
    })
    .catch((error) => console.error("Error fetching navbar:", error));
}
