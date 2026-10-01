document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".cellar-reimagined");
  const counters = document.querySelectorAll(".cellar-reimagined__counter");

  if (!section || counters.length === 0) {
    return;
  }

  let hasAnimated = false;

  const animateCounter = (counter) => {
    const target = Number(counter.getAttribute("data-count")) || 0;
    const prefix = counter.getAttribute("data-prefix") || "";
    const suffix = counter.getAttribute("data-suffix") || "";
    const duration = 1600;
    let startTime = null;

    const updateCounter = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(target * easedProgress);

      counter.textContent = `${prefix}${currentValue}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = `${prefix}${target}${suffix}`;
      }
    };

    window.requestAnimationFrame(updateCounter);
  };

  const startCounters = () => {
    if (hasAnimated) {
      return;
    }

    hasAnimated = true;

    counters.forEach((counter) => {
      animateCounter(counter);
    });
  };

  const sectionIsVisible = () => {
    const sectionBounds = section.getBoundingClientRect();

    return sectionBounds.top < window.innerHeight && sectionBounds.bottom > 0;
  };

  if (!("IntersectionObserver" in window)) {
    startCounters();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        startCounters();
        observer.disconnect();
      });
    },
    {
      threshold: 0.05,
    },
  );

  observer.observe(section);

  if (sectionIsVisible()) {
    startCounters();
    observer.disconnect();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".cellar-formats");

  if (!section) {
    return;
  }

  const options = section.querySelectorAll(".cellar-formats__option");
  const image = section.querySelector("#format-image");
  const title = section.querySelector("#format-title");
  const type = section.querySelector("#format-type");
  const description = section.querySelector("#format-description");
  const capacity = section.querySelector("#format-capacity");
  const capacityLabel = section.querySelector("#format-capacity-label");
  const location = section.querySelector("#format-location");
  const index = section.querySelector("#format-index");
  const panel = section.querySelector("#format-panel");

  if (
    !options.length ||
    !image ||
    !title ||
    !type ||
    !description ||
    !capacity ||
    !capacityLabel ||
    !location ||
    !index ||
    !panel
  ) {
    return;
  }

  const updateFormat = (option) => {
    const number = option.querySelector(".cellar-formats__option-number");

    options.forEach((item) => {
      const isActive = item === option;

      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    panel.setAttribute("aria-labelledby", option.id);

    image.classList.add("is-changing");

    window.setTimeout(() => {
      image.src = option.dataset.image;
      image.alt = option.dataset.alt;
      title.textContent = option.dataset.title;
      type.textContent = option.dataset.type;
      description.textContent = option.dataset.description;
      capacity.textContent = option.dataset.capacity;
      capacityLabel.textContent = option.dataset.capacityLabel;
      location.textContent = option.dataset.location;
      index.textContent = number ? number.textContent : "01";

      image.classList.remove("is-changing");
    }, 180);
  };

  options.forEach((option) => {
    option.addEventListener("click", () => {
      updateFormat(option);
    });

    option.addEventListener("keydown", (event) => {
      const optionList = Array.from(options);
      const currentIndex = optionList.indexOf(option);

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();

        const nextOption = optionList[(currentIndex + 1) % optionList.length];

        nextOption.focus();
        updateFormat(nextOption);
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();

        const previousOption =
          optionList[
            (currentIndex - 1 + optionList.length) % optionList.length
          ];

        previousOption.focus();
        updateFormat(previousOption);
      }

      if (event.key === "Home") {
        event.preventDefault();
        optionList[0].focus();
        updateFormat(optionList[0]);
      }

      if (event.key === "End") {
        event.preventDefault();

        const lastOption = optionList[optionList.length - 1];

        lastOption.focus();
        updateFormat(lastOption);
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".collection-profile");
  const counter = document.querySelector(".collection-profile__counter");

  if (!section || !counter) {
    return;
  }

  let hasAnimated = false;

  const animateCounter = () => {
    if (hasAnimated) {
      return;
    }

    hasAnimated = true;

    const target = Number(counter.dataset.count) || 0;
    const suffix = counter.dataset.suffix || "";
    const duration = 1600;
    let startTime = null;

    const updateCounter = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(target * easedProgress);

      counter.textContent = `${currentValue}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(updateCounter);
        return;
      }

      counter.textContent = `${target}${suffix}`;
    };

    window.requestAnimationFrame(updateCounter);
  };

  if (!("IntersectionObserver" in window)) {
    animateCounter();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter();
        observer.disconnect();
      });
    },
    {
      threshold: 0.1,
    },
  );

  observer.observe(section);
});
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".selected-environments");

  if (!section) {
    return;
  }

  const track = section.querySelector("#selectedEnvironmentsTrack");

  const projects = Array.from(
    section.querySelectorAll(".selected-environments__project"),
  );

  const previousButton = section.querySelector("#environmentPrevious");
  const nextButton = section.querySelector("#environmentNext");

  const category = section.querySelector("#environmentCategory");
  const title = section.querySelector("#environmentTitle");
  const description = section.querySelector("#environmentDescription");
  const location = section.querySelector("#environmentLocation");
  const current = section.querySelector("#environmentCurrent");
  const total = section.querySelector("#environmentTotal");

  if (
    !track ||
    !projects.length ||
    !previousButton ||
    !nextButton ||
    !category ||
    !title ||
    !description ||
    !location ||
    !current ||
    !total
  ) {
    return;
  }

  let activeIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  total.textContent = String(projects.length).padStart(2, "0");

  const updateInformation = () => {
    const activeProject = projects[activeIndex];

    if (!activeProject) {
      return;
    }

    category.textContent = activeProject.dataset.category || "";

    title.textContent = activeProject.dataset.title || "";

    description.textContent = activeProject.dataset.description || "";

    location.textContent = activeProject.dataset.location || "";

    current.textContent = String(activeIndex + 1).padStart(2, "0");
  };

  const scrollActiveIntoView = (behavior = "smooth") => {
    const activeProject = projects[activeIndex];

    if (!activeProject) {
      return;
    }

    const trackRect = track.getBoundingClientRect();
    const projectRect = activeProject.getBoundingClientRect();

    const leftOverflow = projectRect.left - trackRect.left;

    const rightOverflow = projectRect.right - trackRect.right;

    if (leftOverflow < 0) {
      track.scrollBy({
        left: leftOverflow,
        behavior,
      });
    } else if (rightOverflow > 0) {
      track.scrollBy({
        left: rightOverflow,
        behavior,
      });
    }
  };

  const setActiveProject = (
    index,
    shouldScroll = true,
    behavior = "smooth",
  ) => {
    activeIndex = (index + projects.length) % projects.length;

    projects.forEach((project, projectIndex) => {
      project.classList.toggle("is-active", projectIndex === activeIndex);
    });

    updateInformation();

    if (shouldScroll) {
      setTimeout(() => {
        scrollActiveIntoView(behavior);
      }, 120);
    }
  };

  projects.forEach((project, index) => {
    project.addEventListener("click", () => {
      setActiveProject(index);
    });
  });

  previousButton.addEventListener("click", () => {
    setActiveProject(activeIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    setActiveProject(activeIndex + 1);
  });

  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveProject(activeIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveProject(activeIndex - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveProject(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveProject(projects.length - 1);
    }
  });

  track.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
    },
    {
      passive: true,
    },
  );

  track.addEventListener(
    "touchend",
    (event) => {
      touchEndX = event.changedTouches[0].screenX;

      const swipeDistance = touchStartX - touchEndX;

      if (Math.abs(swipeDistance) < 45) {
        return;
      }

      if (swipeDistance > 0) {
        setActiveProject(activeIndex + 1);
      } else {
        setActiveProject(activeIndex - 1);
      }
    },
    {
      passive: true,
    },
  );

  window.addEventListener("resize", () => {
    setTimeout(() => {
      scrollActiveIntoView("auto");
    }, 100);
  });

  setActiveProject(0, false);

  requestAnimationFrame(() => {
    scrollActiveIntoView("auto");
  });
});
