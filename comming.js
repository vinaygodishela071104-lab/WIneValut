document.addEventListener("DOMContentLoaded", () => {
  initializeCountdown();
  initializeNotifyForm();
  refreshLucideIcons();
});

function refreshLucideIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function initializeCountdown() {
  const launchDate = new Date("2026-12-01T00:00:00");

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    return;
  }

  function updateCountdown() {
    const currentTime = new Date();
    const timeDifference = launchDate - currentTime;

    if (timeDifference <= 0) {
      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";

      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();

  setInterval(updateCountdown, 1000);
}

function initializeNotifyForm() {
  const notifyForm = document.getElementById("notifyForm");
  const notifyEmail = document.getElementById("notifyEmail");
  const formMessage = document.getElementById("formMessage");

  if (!notifyForm || !notifyEmail || !formMessage) {
    return;
  }

  notifyForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = notifyEmail.value.trim();

    if (!email) {
      formMessage.textContent = "Please enter your email address.";

      return;
    }

    formMessage.textContent =
      "Thank you. We will notify you when WineVault launches.";

    notifyEmail.value = "";
  });
}
