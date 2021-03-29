"use strict";
exports.__esModule = true;
exports.itemsRouter = void 0;
var express = require("express");
exports.itemsRouter = express.Router();
var ctrl = require("./item.controller");
var item_validation_1 = require("./item.validation");
exports.itemsRouter.get('/', ctrl.validateParams({ schema: item_validation_1.searchSchema }), ctrl.search);
exports.itemsRouter.get('/:id', ctrl.validateParams({ schema: item_validation_1.paramSchema }), ctrl.getItem);
