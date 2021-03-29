"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.list = exports.get = void 0;
var axios_1 = require("axios");
var utils_1 = require("../utils/utils");
var errorHandler_1 = require("../utils/errorHandler");
function get(id) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, item, desc, category, breadcrumb, resp;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        axios_1["default"].get("https://api.mercadolibre.com/items/" + id),
                        axios_1["default"].get("https://api.mercadolibre.com/items/" + id + "/description")
                    ])["catch"](function (e) {
                        throw new errorHandler_1.HttpException('404', 'resource not found');
                    })];
                case 1:
                    _a = _b.sent(), item = _a[0], desc = _a[1];
                    category = item.data.category_id;
                    return [4 /*yield*/, axios_1["default"].get("https://api.mercadolibre.com/categories/" + category)];
                case 2:
                    breadcrumb = _b.sent();
                    resp = {
                        author: {
                            name: "Yesi",
                            lastname: "Barroso"
                        },
                        item: {
                            id: item.data.id,
                            title: item.data.title,
                            price: {
                                currency: item.data.currency_id,
                                amount: Math.trunc(item.data.price),
                                decimals: utils_1.getDecimals(item.data.price)
                            },
                            picture: item.data.thumbnail,
                            condition: item.data.condition,
                            free_shipping: item.data.shipping.free_shipping,
                            sold_quantity: item.data.sold_quantity,
                            description: desc.data.plain_text,
                            breadcrumb: breadcrumb.data.path_from_root
                        }
                    };
                    return [2 /*return*/, resp];
            }
        });
    });
}
exports.get = get;
function list(search) {
    return __awaiter(this, void 0, void 0, function () {
        var resp, author, results, category, breadcrumb, items, categories, resultSearch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get("https://api.mercadolibre.com/sites/MLA/search?q=:" + search, {
                        params: { limit: 4 }
                    })["catch"](function (e) {
                        throw new errorHandler_1.HttpException('404', 'resource not found');
                    })];
                case 1:
                    resp = _a.sent();
                    author = {
                        name: "Yesica",
                        lastname: "Barroso"
                    };
                    results = resp.data.results;
                    if (results) {
                        return [2 /*return*/, {
                                author: author,
                                categories: [],
                                items: []
                            }];
                    }
                    category = results[0].category_id;
                    return [4 /*yield*/, axios_1["default"].get("https://api.mercadolibre.com/categories/" + category)["catch"](function (e) {
                            throw new errorHandler_1.HttpException('404', 'resource not found');
                        })];
                case 2:
                    breadcrumb = _a.sent();
                    ;
                    items = [];
                    results.forEach(function (result) {
                        var item = {
                            id: result.id,
                            title: result.title,
                            price: {
                                currency: result.currency_id,
                                amount: Math.trunc(result.price),
                                decimals: utils_1.getDecimals(result.price)
                            },
                            picture: result.thumbnail,
                            condition: result.condition,
                            free_shipping: result.shipping.free_shipping
                        };
                        items.push(item);
                    });
                    categories = breadcrumb.data.path_from_root;
                    resultSearch = {
                        author: author,
                        categories: categories,
                        items: items
                    };
                    return [2 /*return*/, resultSearch];
            }
        });
    });
}
exports.list = list;
