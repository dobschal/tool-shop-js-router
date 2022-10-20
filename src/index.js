/**
 * @typedef {{ [string]: { layout: HTMLElement, page: HTMLElement }}} RouterConfig
 */
import Navigo from "navigo";

let activeLayout;

/**
 * Applies some special route handling and returns an instance of the Navigo router.
 * @param {RouterConfig} config 
 * @returns {Navigo}
 */
export function Router(config) {
    const router = new Navigo("/");
    router.on(parseConfig(config));
    router.resolve();
    return router;
}

/**
 * Parse our custom router config to the Navigo Router config.
 * @param {RouterConfig} config 
 * @returns {Object}
 */
function parseConfig(config) {
    const parsedConfig = {};
    Object.keys(config).forEach(path => {
        parseConfig[path] = () => {
            switchPage(config[path].layout, config[path].page);
        };
    });
    return parsedConfig;
}

/**
 * Switch the current shown page to another one inside a given layout.
 * The layout remains if it is the same as before.
 * @param {HTMLElement} layout - the page is rendered into
 * @param {HTMLElement} page - the page root element to exchange
 */
function switchPage(layout, page) {
    if (layout !== activeLayout) {
        activeLayout = layout;
        document.body.innerHTML = "";
        document.body.append(activeLayout);
    }
    layout.slots.page(page);
}