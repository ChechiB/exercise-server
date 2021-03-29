import * as express from 'express';
export const itemsRouter = express.Router();

import * as ctrl from './item.controller';
import { searchSchema, paramSchema } from './item.validation';

itemsRouter.get('/', ctrl.validateParams({schema: searchSchema}), ctrl.search);
itemsRouter.get('/:id', ctrl.validateParams({schema: paramSchema}), ctrl.getItem);
