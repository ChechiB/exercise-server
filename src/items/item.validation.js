"use strict";
exports.__esModule = true;
exports.paramSchema = exports.searchSchema = void 0;
var Joi = require('joi');
var regexId = new RegExp(/^(MLA[0-9]+)$/);
exports.searchSchema = Joi.object().keys({
    query: {
        q: Joi.string().required()
    }
}).unknown(true);
exports.paramSchema = Joi.object().keys({
    params: {
        id: Joi.string().regex(regexId).required()
    }
}).unknown(true);
