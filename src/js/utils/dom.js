import { requiredElements } from "../menu/constants.js";

const selectors = {
  menuButton: ".menu-button",
  closeButton: ".close-button-menu",
  menu: ".mobile-menu",
  menuContent: ".mobile-menu-content",
  firstLink: ".menu-links",
};

function assertElement(element) {
  if (element instanceof Element) {
    return true;
  }

  if (element instanceof NodeList || element instanceof HTMLCollection) {
    return element.length > 0;
  }

  return false;
}

export function addSafeListener(element, event, handler, context = "unknown") {
  const isCollection =
    element instanceof NodeList || element instanceof HTMLCollection;

  if (isCollection) {
    [...element].forEach((el) => el.addEventListener(event, handler));
    return;
  }

  element.addEventListener(event, handler);
}

export function initDOMElements() {
  const DOM = {
    menuButton: document.querySelector(selectors.menuButton),
    closeButton: document.querySelector(selectors.closeButton),
    menu: document.querySelector(selectors.menu),
    menuContent: document.querySelector(selectors.menuContent),
    firstLink: document.querySelector(selectors.firstLink),
  };

  Object.entries(DOM).forEach(([key, element]) => {

    const isRequired = requiredElements.includes(key);

    if( isRequired && !assertElement(element) ) {
      throw new Error(
        `[DOM] Missing required element: ${key})`
      );
    }
  });

  return Object.freeze(DOM);
}
