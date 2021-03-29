import {itemsRouter} from './src/items/item.router.js';

export const init = (app) => {
    app.use(`/api/items`, itemsRouter);
}

