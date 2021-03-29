"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramSchema = exports.searchSchema = void 0;
const Joi = require('joi');
const regexId = new RegExp(/^(MLA[0-9]+)$/);
exports.searchSchema = Joi.object().keys({
    query: {
        q: Joi.string().required(),
    }
}).unknown(true);
exports.paramSchema = Joi.object().keys({
    params: {
        id: Joi.string().regex(regexId).required(),
    },
}).unknown(true);
//# sourceMappingURL=item.validation.js.map