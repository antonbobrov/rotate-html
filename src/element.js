export default function element(selector) {

    if (selector instanceof HTMLElement) {
        return selector;
    }
    else if (typeof selector == "string") {
        return document.querySelector(selector);
    }

    return false;

}