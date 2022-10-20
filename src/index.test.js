import { it, expect, describe } from "@jest/globals";
import { Widget } from "tool-shop-js-widget";
import { _parseConfig } from "./index.js";

describe("Router", () => {

    it("should parse the config correctly", () => {
        const config = {
            "about": {
                layout: Widget(),
                page: Widget()
            },
            "*": {
                layout: Widget(),
                page: Widget()
            }
        };
        const parsedConfig = _parseConfig(config);
        expect(typeof parsedConfig.about).toBe("function");
        expect(Object.keys(parsedConfig).length).toBe(2);
    });

});