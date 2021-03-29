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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.get = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils/utils");
function get(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const [item, desc] = yield Promise.all([
            axios_1.default.get(`https://api.mercadolibre.com/items/${id}`),
            axios_1.default.get(`https://api.mercadolibre.com/items/${id}/description`)
        ]);
        const category = item.data.category_id;
        const breadcrumb = yield axios_1.default.get(`https://api.mercadolibre.com/categories/${category}`);
        let resp = {
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
                    decimals: utils_1.getDecimals(item.data.price),
                },
                picture: item.data.thumbnail,
                condition: item.data.condition,
                free_shipping: item.data.shipping.free_shipping,
                sold_quantity: item.data.sold_quantity,
                description: desc.data.plain_text,
                breadcrumb: breadcrumb.data.path_from_root,
            }
        };
        return resp;
    });
}
exports.get = get;
function list(search) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield axios_1.default.get(`https://api.mercadolibre.com/sites/MLA/search?q=:${search}`, {
            params: { limit: 4 }
        });
        const results = resp.data.results;
        // @@ TODO: add error handler for resp
        const category = results[0].category_id;
        const breadcrumb = yield axios_1.default.get(`https://api.mercadolibre.com/categories/${category}`);
        const items = [];
        results.forEach(result => {
            let item = {
                id: result.id,
                title: result.title,
                price: {
                    currency: result.currency_id,
                    amount: Math.trunc(result.price),
                    decimals: utils_1.getDecimals(result.price),
                },
                picture: result.thumbnail,
                condition: result.condition,
                free_shipping: result.shipping.free_shipping,
            };
            items.push(item);
        });
        console.log('results', results);
        const categories = breadcrumb.data.path_from_root;
        const author = {
            name: "Yesica",
            lastname: "Barroso"
        };
        const resultSearch = {
            author: author,
            categories: categories,
            items: items
        };
        return resultSearch;
    });
}
exports.list = list;
//# sourceMappingURL=item.service.js.map