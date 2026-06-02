import { addSafeListener } from "../utils/dom.js";
import { handleOpenMenu, handleCloseMenu } from "./events.js";
import { createMenuController } from "./ui.js";

export function initMenu(DOM){
    const menuController = createMenuController(DOM);

    addSafeListener(DOM.menuButton, "click", (event) => handleOpenMenu(event, menuController), "menu open button click");
    addSafeListener(DOM.closeButton, "click", (event) => handleCloseMenu(event, menuController), "menu close button click");
}