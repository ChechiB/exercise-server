"use strict";
exports.__esModule = true;
exports.init = void 0;
var item_router_js_1 = require("./src/items/item.router.js");
var init = function (app) {
    app.use("/api/items", item_router_js_1.itemsRouter);
};
exports.init = init;
