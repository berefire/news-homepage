import { prefersReducedMotion } from "../shared/accessibility.js";

export function createMenuController({
  menu,
  menuContent,
  menuButton,
  firstLink,
}) {
  let isClosing = false;
  let closeTimeoutId = null;

  function setExpanded(expanded) {
    menuButton.setAttribute("aria-expanded", String(expanded));
  }

  function lockScroll() {
    document.body.classList.add("u-no-scroll");
  }

  function unlockScroll() {
    document.body.classList.remove("u-no-scroll");
  }

  function focusFirstLink() {
    firstLink.focus();
  }

  function restoreFocus() {
    menuButton.focus();
  }

  function finishClose() {
    if (!menu.open) {
      return;
    }

    menu.close();
    restoreFocus();
    isClosing = false;
    closeTimeoutId = null;
  }

  function openMenu() {
    if (isClosing) {
      return;
    }

    if (closeTimeoutId) {
      clearTimeout(closeTimeoutId);
      closeTimeoutId = null;
    }

    if (menu.open) {
      return;
    }

    menu.showModal();

    requestAnimationFrame(() => {
      menu.classList.add("is-open");

      menuContent.addEventListener(
        "transitionend",
        () => {
          if (menu.open) {
            focusFirstLink();
          }
        },
        { once: true },
      );
    });

    setExpanded(true);
    lockScroll();
  }

  function closeMenu() {
    if (!menu.open || isClosing) {
      return;
    }

    isClosing = true;

    setExpanded(false);
    unlockScroll();
    menu.classList.remove("is-open");

    if (prefersReducedMotion()) {
      finishClose();
      return;
    }

    closeTimeoutId = setTimeout(finishClose, 200);

    menuContent.addEventListener(
      "transitionend",
      () => {
        clearTimeout(closeTimeoutId);
        finishClose();
      },
      { once: true },
    );
  }

  function toggleMenu() {
    menu.open ? closeMenu() : openMenu();
  }

  return {
    toggleMenu,
    openMenu,
    closeMenu,
  };
}
