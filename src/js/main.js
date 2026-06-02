import "@styles/main.css";

import { initDOMElements } from "./utils/dom.js";
import { initMenu } from "./menu/menu.js";

const DOM = initDOMElements();

initMenu(DOM);
