/**
 * @typedef {Object} RouterConfig
 * @property {{ [string]: { before: (() => void) => void, after: () => void }}} hooks
 * @property {{ [string]: { layout: () => HTMLElement, page: () => HTMLElement } | () => HTMLElement}} routes
 */
import Navigo from "navigo";

export { RouterLink } from "./RouterLink.js";

/**
 * Applies some special route handling and returns an instance of the Navigo router.
 * @param {RouterConfig} config 
 * @returns {Navigo & { pageElement: HTMLElement, layoutElement: HTMLElement }}
 */
export function Router(config) {
    const router = new Navigo("/");
    if ("hooks" in config) {
        router.hooks(config.hooks);
    }
    router.on(_parseRoutesConfig(config.routes, router));
    router.resolve();
    return router;
}

/**
 * Parse our custom router config to the Navigo Router config.
 * @param {RouterConfig} config 
 * @param {Navigo} router
 * @returns {Object}
 */
export function _parseRoutesConfig(config, router) {
    const parsedConfig = {};
    Object.keys(config).forEach(path => {
        parsedConfig[path] = () => {
            if (typeof config[path] === "function") {
                _switchPage(undefined, config[path], router);
            } else {
                _switchPage(config[path].layout, config[path].page, router);
            }
        };
    });
    return parsedConfig;
}

/**
 * Switch the current shown page to another one inside a given layout.
 * The layout remains if it is the same as before.
 * @param {() => HTMLElement} [Layout] - the page is rendered into, if not set, the page is added to the body directly
 * @param {() => HTMLElement} Page - the page root element to exchange
 * @param {Navigo} router
 */
export function _switchPage(Layout, Page, router) {

    // Remove current active page
    if (router.pageElement instanceof HTMLElement) {
        router.pageElement.parentNode.removeChild(router.pageElement);
    }
    router.pageElement = Page();

    // If no layout is set, add page to body directly
    // and remove potentially existing rendered layout
    if (typeof Layout === "undefined") {
        if (router.layoutElement instanceof HTMLElement) {
            router.layoutElement.parentNode.removeChild(router.layoutElement);
        }
        return document.body.append(router.pageElement);
    }

    // If layout is set, check if it is already rendered,
    // if not, remove the old one and add the new one
    // add the page to the given "page" slot
    const layout = Layout();
    if (layout !== router.layoutElement) {
        if (router.layoutElement instanceof HTMLElement) {
            router.layoutElement.parentNode.removeChild(router.layoutElement);
        }
        router.layoutElement = layout;
        document.body.append(router.layoutElement);
    }
    layout.slots.page(router.pageElement);
}