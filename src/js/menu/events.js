export function handleOpenMenu(event, menuController) {
    event.preventDefault();
    menuController.openMenu();
}

export function handleCloseMenu(event, menuController) {
    event.preventDefault();
    menuController.closeMenu();
}