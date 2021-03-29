"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const item_router_js_1 = require("./src/items/item.router.js");
const init = (app) => {
    app.use(`/api/items`, item_router_js_1.itemsRouter);
};
exports.init = init;
//# sourceMappingURL=routes.js.map