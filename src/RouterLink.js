import { Widget } from "tool-shop-js-widget";

export function RouterLink(config) {
    config.tag = config.tag ?? "a";
    if ("attributes" in config) {
        config.attributes.href = config.url;
        config.attributes["data-navigo"] = "";
    } else if ("attr" in config) {
        config.attr.href = config.url;
        config.attr["data-navigo"] = "";
    } else {
        config.attr = {};
        config.attr.href = config.url;
        config.attr["data-navigo"] = "";
    }
    delete config.url;
    return Widget(config);
}