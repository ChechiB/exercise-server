const itemRouter = require('./src/items/item.router.js');

function init(app) {
    app.use(`/api/items`, itemRouter);

}

module.exports = init;

