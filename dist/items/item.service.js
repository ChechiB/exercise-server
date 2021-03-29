module.exports = {
    get,
    list
};
const axios = require('axios');
const { getDecimals } = require('../utils/utils');
async function get(id) {
    let resp = {};
    const [item, desc] = await Promise.all([
        axios.get(`https://api.mercadolibre.com/items/${id}`),
        axios.get(`https://api.mercadolibre.com/items/${id}/description`)
    ]);
    const category = item.data.category_id;
    const breadcrumb = await axios.get(`https://api.mercadolibre.com/categories/${category}`);
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
                decimals: getDecimals(item.data.price),
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
}
async function list(search) {
    const resp = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=:${search}`, {
        params: { limit: 4 }
    });
    const results = resp.data.results;
    // @@ TODO: add error handler for resp
    const category = results[0].category_id;
    const breadcrumb = await axios.get(`https://api.mercadolibre.com/categories/${category}`);
    const items = [];
    results.forEach(result => {
        let item = {
            id: result.id,
            title: result.title,
            price: {
                currency: result.currency_id,
                amount: Math.trunc(result.price),
                decimals: getDecimals(result.price),
            },
            picture: result.thumbnail,
            condition: result.condition,
            free_shipping: result.shipping.free_shipping,
        };
        items.push(item);
    });
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
}
