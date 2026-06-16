import { prefersReducedMotion } from "../shared/accessibility.js";

export function createMenuController({
  menu,
  menuContent,
  menuButton,
  firstLink,
}) {
  let isClosing = false;

  function setExpanded(expanded) {
    menuButton.setAttribute(
      "aria-expanded",
      String(expanded)
    );
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
  }

  function openMenu() {
    if (menu.open || isClosing) {
      return;
    }

    menu.showModal();
    
    requestAnimationFrame(() => {
      menu.getBoundingClientRect();
      menu.classList.add("animate");
    });

    setExpanded(true);

    lockScroll();

    setTimeout(() => {
      if (menu.open) {
        focusFirstLink();
      }
    }, 350);
  }

  function closeMenu() {
    if (!menu.open || isClosing) {
      return;
    }

    isClosing = true;

    setExpanded(false);

    unlockScroll();

    menu.classList.remove("animate");

    if (prefersReducedMotion()) {
      finishClose();
      return;
    }

    const handleTransitionEnd = (event) => {
      if (event.target !== menuContent) {
        return;
      }

      menuContent.removeEventListener(
        "transitionend",
        handleTransitionEnd
      );

      finishClose();
    };

    menuContent.addEventListener(
      "transitionend",
      handleTransitionEnd
    );
  }

  function toggleMenu() {
    menu.open
      ? closeMenu()
      : openMenu();
  }

  return {
    toggleMenu,
    openMenu,
    closeMenu,
  };
}