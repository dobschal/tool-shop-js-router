/**
 * @typedef {Object} RouterConfig
 * @property {{ [string]: { layout: HTMLElement, page: HTMLElement }}} hooks
 * @property {{ [string]: { layout: HTMLElement, page: HTMLElement }}} routes
 */
import Navigo from "navigo";

export { RouterLink } from "./RouterLink.js";

let activeLayout, activePage;

/**
 * Applies some special route handling and returns an instance of the Navigo router.
 * @param {RouterConfig} config 
 * @returns {Navigo}
 */
export function Router(config) {
    const router = new Navigo("/");
    if ("hooks" in config) {
        router.hooks(config.hooks);
    }
    router.on(_parseRoutesConfig(config.routes));
    router.resolve();
    return router;
}

/**
 * Parse our custom router config to the Navigo Router config.
 * @param {RouterConfig} config 
 * @returns {Object}
 */
export function _parseRoutesConfig(config) {
    const parsedConfig = {};
    Object.keys(config).forEach(path => {
        parsedConfig[path] = () => {
            _switchPage(config[path].layout, config[path].page);
        };
    });
    return parsedConfig;
}

/**
 * Switch the current shown page to another one inside a given layout.
 * The layout remains if it is the same as before.
 * @param {HTMLElement} [layout] - the page is rendered into, if not set, the page is added to the body directly
 * @param {HTMLElement} page - the page root element to exchange
 */
export function _switchPage(layout, page) {

    // Remove current active page
    if (activePage instanceof HTMLElement) {
        activePage.parentNode.removeChild(activePage);
    }
    activePage = page;

    // If no layout is set, add page to body directly
    // and remove potentially existing rendered layout
    if (typeof layout === "undefined") {
        if (activeLayout instanceof HTMLElement) {
            activeLayout.parentNode.removeChild(activeLayout);
        }
        return document.body.append(page);
    }

    // If layout is set, check if it is already rendered,
    // if not, remove the old one and add the new one
    // add the page to the given "page" slot
    if (layout !== activeLayout) {
        if (activeLayout instanceof HTMLElement) {
            activeLayout.parentNode.removeChild(activeLayout);
        }
        activeLayout = layout;
        document.body.append(activeLayout);
    }
    layout.slots.page(page);
}