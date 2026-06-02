export function createMenuController({
  menu,
  menuContent,
  menuButton,
  firstLink,
  closeButton,
}) {
  function openMenu() {
    if (menu.open) return;

    menu.showModal();
    requestAnimationFrame(() => {
      menuContent.getBoundingClientRect();
      menu.classList.add("is-open");
    });

    menuButton.setAttribute("aria-expanded", "true");

    document.body.classList.add("u-no-scroll");

    firstLink.focus();
  }

  function closeMenu() {
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("u-no-scroll");
    menu.classList.remove("is-open");
    menuContent.addEventListener(
      "transitionend",
      () => {
        menu.close();
        menuButton.focus();
      },
      { once: true },
    );
  }

  return {
    openMenu,
    closeMenu,
  };
}
