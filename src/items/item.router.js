const express = require('express');
const router = express.Router();

module.exports = router;

const ctrl = require('./item.controller');

router.get('/', ctrl.getItem);
router.get('/:id', ctrl.search);
