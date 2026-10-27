/**************************
 * MARK: Theme keuzes
 **************************/

const themeButtons = document.querySelectorAll('input[name="theme"]');
const savedTheme = localStorage.getItem("theme");

themeButtons.forEach((button) => {
  if (button.value === savedTheme) {
    button.checked = true;
  }

  button.addEventListener("change", () => {
    if (button.checked) {
      localStorage.setItem("theme", button.value);
    }
  });
});

/**************************
 * MARK: Cookie dialog
 **************************/

const cookieModal = document.querySelector("#cookieModal");
const openCookieModalButton = document.querySelector("#openCookieModal");
const cookieMessage = document.querySelector("#cookieMessage");
const cookieChoiceButtons = document.querySelectorAll("[data-cookie-choice]");

if (cookieModal && openCookieModalButton) {
  openCookieModalButton.addEventListener("click", () => {
    cookieModal.showModal();
  });
}

cookieChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!cookieMessage) return;

    const choice = button.dataset.cookieChoice;

    if (choice === "accept") {
      cookieMessage.textContent =
        "Je hebt gekozen voor accepteren. Deze keuze wordt niet opgeslagen en verandert de werking van het webringcomponent niet.";
    }

    if (choice === "reject") {
      cookieMessage.textContent =
        "Je hebt gekozen voor weigeren. Deze keuze wordt niet opgeslagen en verandert de werking van het webringcomponent niet.";
    }
  });
});

/**************************
 * MARK: Layout dialog
 **************************/

const layoutDialog = document.querySelector("#layoutDialog");
const openLayoutDialogButton = document.querySelector("#openLayoutDialog");
const consoleGallery = document.querySelector("#consoleGallery");
const viewButtons = document.querySelectorAll("[data-view]");

if (layoutDialog && openLayoutDialogButton) {
  openLayoutDialogButton.addEventListener("click", () => {
    layoutDialog.showModal();
  });
}

if (consoleGallery) {
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedView = button.dataset.view;

      if (selectedView !== "grid" && selectedView !== "list") return;

      consoleGallery.classList.remove("grid-view", "list-view");
      consoleGallery.classList.add(`${selectedView}-view`);

      viewButtons.forEach((viewButton) => {
        viewButton.setAttribute("aria-pressed", String(viewButton === button));
      });

      if (layoutDialog?.open) {
        layoutDialog.close();
      }
    });
  });
}

/**************************
 * MARK: Dialogs sluiten
 **************************/

document.querySelectorAll(".close-dialog").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = button.closest("dialog");

    if (dialog?.open) {
      dialog.close();
    }
  });
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});

/**************************
 * MARK: Bewegingsinstellingen
 **************************/

const motionDialog = document.querySelector("#motionDialog");
const openMotionDialogButton = document.querySelector("#openMotionDialog");
const motionChoiceButtons = document.querySelectorAll("[data-motion-choice]");

const savedMotion = localStorage.getItem("motion");

if (savedMotion === "reduced") {
  document.documentElement.classList.add("reduce-motion");
} else {
  document.documentElement.classList.remove("reduce-motion");
}

if (openMotionDialogButton && motionDialog) {
  openMotionDialogButton.addEventListener("click", () => {
    if (!motionDialog.open) {
      motionDialog.showModal();
    }
  });
}

motionChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choice = button.dataset.motionChoice;

    if (choice === "reduced") {
      document.documentElement.classList.add("reduce-motion");
      localStorage.setItem("motion", "reduced");
    }

    if (choice === "normal") {
      document.documentElement.classList.remove("reduce-motion");
      localStorage.setItem("motion", "normal");
    }

    if (motionDialog?.open) {
      motionDialog.close();
    }
  });
});
