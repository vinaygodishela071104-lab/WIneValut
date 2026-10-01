 const faqItems = document.querySelectorAll(".contact-faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".contact-faq-question");

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("is-open");
        otherItem
          .querySelector(".contact-faq-question")
          .setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });