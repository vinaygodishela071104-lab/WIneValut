document.addEventListener("DOMContentLoaded", () => {
  applySavedPreferences();
  createLucideIcons();
  initializeNavbar();
  initializeBackToTop();
});

function createLucideIcons(root = document) {
  if (typeof lucide !== "undefined") {
    lucide.createIcons({ root });
  }
}

function setLucideIcon(element, iconName) {
  if (!element) {
    return;
  }

  element.replaceChildren();

  const icon = document.createElement("i");

  icon.setAttribute("data-lucide", iconName);

  element.appendChild(icon);

  createLucideIcons(element);
}

function getStorageItem(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);

    return value !== null ? value : fallback;
  } catch {
    return fallback;
  }
}

function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function applySavedPreferences() {
  const savedTheme = getStorageItem("winevault-theme", "light");
  const savedDirection = getStorageItem("winevault-direction", "ltr");

  document.body.classList.toggle("dark-mode", savedTheme === "dark");

  document.documentElement.dir = savedDirection === "rtl" ? "rtl" : "ltr";

  updateToggleIcons();
}

function initializeNavbar() {
  const darkToggle = document.getElementById("darkToggle");
  const rtlToggle = document.getElementById("rtlToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const mobileQuote = document.querySelector(".mobile-quote");
  const dropdowns = document.querySelectorAll(".dropdown");

  setActiveNavLink();
  updateToggleIcons();

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode");

      setStorageItem("winevault-theme", isDark ? "dark" : "light");

      updateToggleIcons();
    });
  }

  if (rtlToggle) {
    rtlToggle.addEventListener("click", () => {
      const currentDirection = document.documentElement.dir || "ltr";

      const newDirection = currentDirection === "rtl" ? "ltr" : "rtl";

      document.documentElement.dir = newDirection;

      setStorageItem("winevault-direction", newDirection);
    });
  }

  if (!menuToggle || !navLinks) {
    return;
  }

  menuToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = navLinks.classList.toggle("active");

    mobileQuote?.classList.toggle("active", isOpen);

    if (!isOpen) {
      closeAllDropdowns(dropdowns);
    }

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    updateToggleIcons();
  });

  navLinks.addEventListener("click", (event) => {
    const dropdownTrigger = event.target.closest(".dropdown-trigger");

    if (dropdownTrigger && window.innerWidth <= 1024) {
      event.preventDefault();
      event.stopPropagation();

      const currentDropdown = dropdownTrigger.closest(".dropdown");

      if (!currentDropdown) {
        return;
      }

      const isOpen = currentDropdown.classList.contains("active");

      dropdowns.forEach((dropdown) => {
        if (dropdown !== currentDropdown) {
          dropdown.classList.remove("active");

          const trigger = dropdown.querySelector(".dropdown-trigger");

          trigger?.setAttribute("aria-expanded", "false");
        }
      });

      currentDropdown.classList.toggle("active", !isOpen);

      dropdownTrigger.setAttribute("aria-expanded", String(!isOpen));

      return;
    }

    const clickedLink = event.target.closest("a");

    if (!clickedLink || window.innerWidth > 1024) {
      return;
    }

    closeMobileMenu(menuToggle, navLinks, mobileQuote, dropdowns);
  });

  mobileQuote?.addEventListener("click", (event) => {
    const clickedLink = event.target.closest("a");

    if (!clickedLink || window.innerWidth > 1024) {
      return;
    }

    closeMobileMenu(menuToggle, navLinks, mobileQuote, dropdowns);
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth > 1024 || !navLinks.classList.contains("active")) {
      return;
    }

    const header = document.querySelector(".site-header");

    if (header && !header.contains(event.target)) {
      closeMobileMenu(menuToggle, navLinks, mobileQuote, dropdowns);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      closeMobileMenu(menuToggle, navLinks, mobileQuote, dropdowns);
    }
  });
}

function closeAllDropdowns(dropdowns) {
  dropdowns.forEach((dropdown) => {
    dropdown.classList.remove("active");

    const trigger = dropdown.querySelector(".dropdown-trigger");

    trigger?.setAttribute("aria-expanded", "false");
  });
}

function updateToggleIcons() {
  const darkToggle = document.getElementById("darkToggle");

  const menuToggle = document.getElementById("menuToggle");

  const navLinks = document.getElementById("navLinks");

  if (darkToggle) {
    const isDark = document.body.classList.contains("dark-mode");

    setLucideIcon(darkToggle, isDark ? "sun" : "moon");

    darkToggle.title = isDark ? "Light Mode" : "Dark Mode";

    darkToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
  }

  if (menuToggle) {
    const isOpen = navLinks?.classList.contains("active");

    setLucideIcon(menuToggle, isOpen ? "x" : "menu");

    menuToggle.title = isOpen ? "Close Menu" : "Menu";

    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }
}

function closeMobileMenu(menuToggle, navLinks, mobileQuote, dropdowns) {
  navLinks?.classList.remove("active");

  mobileQuote?.classList.remove("active");

  closeAllDropdowns(dropdowns);

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
  }

  updateToggleIcons();
}

function setActiveNavLink() {
  const currentPage =
    window.location.pathname.split("/").pop().toLowerCase() || "index.html";

  const navItems = document.querySelectorAll(".nav-links a");

  const homePages = ["index.html", "home.html", "home1.html", "home2.html"];

  const isHomePage = homePages.includes(currentPage);

  navItems.forEach((link) => {
    link.classList.remove("active");
    link.removeAttribute("aria-current");

    const href = link.getAttribute("href");

    if (!href || href === "#" || href.startsWith("javascript:")) {
      return;
    }

    if (link.classList.contains("dropdown-trigger")) {
      const linkText = link.textContent.trim().toLowerCase();

      if (isHomePage && linkText === "home") {
        link.classList.add("active");

        link.setAttribute("aria-current", "page");
      }

      return;
    }

    try {
      const linkPage = new URL(link.href, window.location.href).pathname
        .split("/")
        .pop()
        .toLowerCase();

      if (isHomePage) {
        const isHomeDropdownLink =
          linkPage === "home1.html" ||
          linkPage === "home2.html" ||
          linkPage === "index.html" ||
          linkPage === "home.html";

        if (isHomeDropdownLink) {
          return;
        }
      }

      if (linkPage === currentPage) {
        link.classList.add("active");

        link.setAttribute("aria-current", "page");
      }
    } catch {}
  });
}

function initializeBackToTop() {
  const topButton = document.querySelector(".top-btn");

  if (!topButton) {
    return;
  }

  topButton.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
