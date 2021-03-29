const express = require('express');
const router = express.Router();
module.exports = router;
const ctrl = require('./item.controller');
const { searchSchema, paramSchema } = require('./item.validation');
router.get('/', ctrl.validateParams({ schema: searchSchema }), ctrl.search);
router.get('/:id', ctrl.validateParams({ schema: paramSchema }), ctrl.getItem);
