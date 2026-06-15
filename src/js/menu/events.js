import { addSafeEventListener } from "../shared/dom.js";

export function bindMenuEvents({
    menuController,
    menuButton,
    closeButton,
    menu,
}) {
    addSafeEventListener(menuButton, "click", menuController.openMenu, "menu open button click");

    addSafeEventListener(closeButton, "click", menuController.closeMenu, "menu close button click");

    addSafeEventListener(menu, "cancel", (event) => {
        event.preventDefault();
        menuController.closeMenu();
    }, "menu cancel event");
}
