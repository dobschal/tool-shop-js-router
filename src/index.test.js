import { jest, it, expect, describe } from "@jest/globals";
import Navigo from "navigo";
import { Widget } from "tool-shop-js-widget";
import { _parseRoutesConfig, Router } from "./index.js";

describe("Router", () => {

    it("should call the hook before route is resolved", () => {
        const hookMock = jest.fn();
        Router({
            hooks: {
                before(done) {
                    hookMock();
                    done();
                }
            },
            routes: {
                "*": {
                    page: Widget,
                    layout: () => Widget({
                        slot: "page"
                    })
                }
            }
        });
        expect(hookMock).toBeCalledTimes(1);
    });

    it("should return an instance of Navigo", () => {
        const router = Router({
            routes: {
                "*": {
                    page: Widget,
                    layout: () => Widget({
                        slot: "page"
                    })
                }
            }
        });
        expect(router instanceof Navigo).toBeTruthy();
    });

    it("should render the page to the DOM", () => {
        Router({
            routes: {
                "*": {
                    page: () => Widget({
                        text: "yeah"
                    }),
                    layout: () => Widget({
                        slot: "page"
                    })
                }
            }
        });
        expect(document.body.children[0].children[0].innerText).toBe("yeah");
    });

    it("should contain the pageElement on the router instance", () => {
        const router = Router({
            routes: {
                "*": {
                    page: () => Widget({
                        text: "yeah"
                    })
                }
            }
        });
        expect(router.pageElement.innerText).toBe("yeah");
    });

    it("should render the page without layout to the DOM", () => {
        Router({
            routes: {
                "*": {
                    page: () => Widget({
                        text: "yeah"
                    })
                }
            }
        });
        expect(document.body.children[0].innerText).toBe("yeah");
    });

    it("should parse the config correctly", () => {
        const config = {
            "about": {
                layout: Widget,
                page: Widget
            },
            "*": {
                layout: Widget,
                page: Widget
            }
        };
        const parsedConfig = _parseRoutesConfig(config, {});
        expect(typeof parsedConfig.about).toBe("function");
        expect(Object.keys(parsedConfig).length).toBe(2);
    });

});