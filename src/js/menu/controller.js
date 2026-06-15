import { prefersReducedMotion } from "../shared/accessibility.js";

export function createMenuController({
    menu,
    menuContent,
    menuButton,
    firstLink,
}) {
    let isClosing = false;

    function setExpanded(expanded){
        menuButton.setAttribute("aria-expanded", String(expanded));
    }

    function lockScroll(){
        document.body.classList.add("u-no-scroll");
    }

    function unlockScroll(){
        document.body.classList.remove("u-no-scroll");
    }

    function focusFirstLink(){
        firstLink.focus();
    }

    function restoreFocus(){
        menuButton.focus();
    }

    function finishClose(){
        menu.close();
        restoreFocus();
        isClosing = false;
    }

    function openMenu(){

        if (menu.open || isClosing) {
            return;
        }

        menu.showModal();

        requestAnimationFrame(() => {
            menuContent.getBoundingClientRect();
            menu.classList.add("is-open");
        });

        setExpanded(true);
        lockScroll();
        //focusFirstLink();
    }

    function closeMenu(){
        if (!menu.open || isClosing) {
            return;
        }

        isClosing = true;

        setExpanded(false);
        unlockScroll();
        menu.classList.remove("is-open");

        if (prefersReducedMotion()){
            finishClose();
            return;
        }

        const timeoutId = setTimeout( finishClose, 350);

        menuContent.addEventListener("transitionend", () => {
            clearTimeout(timeoutId);
            finishClose();
        }, { once: true });
    }

    function toggleMenu(){
        menu.open ? closeMenu() : openMenu();
    }

    return {
        toggleMenu,
        openMenu,
        closeMenu,
    };
}
