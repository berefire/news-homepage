import { DOM, getFirstElement } from "../shared/dom.js";
import { createMenuController } from "./controller.js";
import { bindMenuEvents } from "./events.js";

export function initializeMenu() {
  const menuController = createMenuController({
    menu: DOM.menu,
    menuContent: DOM.menuContent,
    menuButton: DOM.menuButton,
    firstLink: getFirstElement(DOM.mobileNavLinks),
  });

  bindMenuEvents({
    menuController,
    menuButton: DOM.menuButton,
    closeButton: DOM.closeButton,
    menu: DOM.menu,
  });
}
