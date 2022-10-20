# Tool Shop JS Router

This JavaScript library provides an easy to use router for your web application. It's based on [Navigo](https://github.com/krasimir/navigo) and works best in combination with the  [Tool Shop JS Widgets](https://github.com/dobschal/tool-shop-js-widget).

[![Tests](https://github.com/dobschal/tool-shop-js-router/actions/workflows/unit-test.yml/badge.svg)](https://github.com/dobschal/tool-shop-js-router/actions/workflows/unit-test.yml)
[![NPM](https://img.shields.io/npm/v/tool-shop-js-router)](https://www.npmjs.com/package/tool-shop-js-router)
[![Size](https://img.shields.io/bundlephobia/min/tool-shop-js-router?style=plastic)](https://img.shields.io/bundlephobia/min/tool-shop-js-router?style=plastic)

<hr />

## Get Started

### Installation:

Install with [NPM](https://nodejs.dev/en/) using your CLI:
```bash
npm install --save tool-shop-js-router
```

### Usage
Example for the usage of the Router:
```javascript
// Router returns an instance of the Navigo Router
const router = Router({
    hooks: {
        before(done) {
            // ... do something before each page is rendered
            done();
        }
    },
    routes: {
        "/about": {
            page: AboutPage,
            // layout is optional. If not set, 
            // the page is rendered to the body tag directly.
            layout: DefaultLayout 
        },
        // default page
        "*": { 
            page: HomePage,
            layout: DefaultLayout
        }
    }
});
```

### TODO
- [ ] Pass URL and query params to the page constructor