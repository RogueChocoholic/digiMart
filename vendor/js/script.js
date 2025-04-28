function essentialLoading() {
  fetchSidebar();
  fetchNavBar();
  fetchContactSupport();
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
      console.log("Sidebar fetched");

    })
    .catch((error) => console.error("Error fetching sidebar:", error));
}
function fetchNavBar() {
  console.log("fetching navbar...");

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
      console.log("Navbar fetched");

    })
    .catch((error) => console.error("Error fetching navbar:", error));
}

function fetchContactSupport() {
  console.log("fetching support modal...");

  fetch("./vendor-contact-support-modal.html")
    .then((response) => response.text())
    .then((data) => {
      const contactSupport = document.getElementById("contactSupport");
      contactSupport.innerHTML = data;

      const sidebarToggleBtn = document.getElementById("sidebarToggle");
      sidebarToggleBtn.addEventListener("click", (event) => {
        event.preventDefault();
        sidebar.classList.toggle("open");
      });

      // Get DOM elements
      const contactSupportBtn = document.getElementById("contactSupportBtn");
      const modalOverlay = document.getElementById("modalOverlay");
      const closeModalBtn = document.getElementById("closeModalBtn");
      const cancelBtn = document.getElementById("cancelBtn");
      const submitBtn = document.getElementById("submitBtn");
      const supportForm = document.getElementById("supportForm");

      // Open modal when Contact Support button is clicked
      contactSupportBtn.addEventListener("click", () => {
        modalOverlay.style.display = "flex";
        document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
      });

      // Close modal functions
      function closeModal() {
        modalOverlay.style.display = "none";
        document.body.style.overflow = ""; // Restore scrolling
      }

      // Close modal when close button is clicked
      closeModalBtn.addEventListener("click", closeModal);

      // Close modal when cancel button is clicked
      cancelBtn.addEventListener("click", closeModal);

      // Close modal when clicking outside the modal
      modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
          closeModal();
        }
      });

      // Handle form submission
      submitBtn.addEventListener("click", (event) => {
        event.preventDefault();

        // Check form validity
        const isValid = supportForm.checkValidity();
        if (!isValid) {
          supportForm.reportValidity();
          return;
        }

        // Get form data
        const formData = new FormData(supportForm);
        const formValues = Object.fromEntries(formData.entries());

        // Here you would typically send the data to your server
        console.log("Form submitted with values:", formValues);

        // Show success message (in a real app, you'd wait for the server response)
        alert(
          "Your support request has been submitted. We will contact you shortly."
        );

        // Close the modal and reset the form
        closeModal();
        supportForm.reset();
      });

      console.log("Support modal fetched");

    })
    .catch((error) => console.error("Error fetching contact support:", error));
}
