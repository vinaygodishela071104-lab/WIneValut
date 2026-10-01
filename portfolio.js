  const portfolioFilters = document.querySelectorAll(".portfolio-showcase-filter");
  const portfolioCards = document.querySelectorAll(".portfolio-showcase-card");

  portfolioFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      portfolioFilters.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });

      filter.classList.add("is-active");
      filter.setAttribute("aria-selected", "true");

      const selectedFilter = filter.getAttribute("data-filter");

      portfolioCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (selectedFilter === "all" || selectedFilter === cardCategory) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });