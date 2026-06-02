import "@styles/main.css";

import { initDOMElements } from "./menu/utils/dom.js";
import { initMenu } from "./menu/menu.js";

const DOM = initDOMElements();

initMenu(DOM);
