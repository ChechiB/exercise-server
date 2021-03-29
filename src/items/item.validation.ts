const  Joi = require ('joi');
const regexId = new RegExp(/^(MLA[0-9]+)$/);

export const searchSchema = Joi.object().keys({
    query: {
        q: Joi.string().required(),
    }
}).unknown(true);

export const paramSchema = Joi.object().keys({
    params: {
        id: Joi.string().regex(regexId).required(),
    },
}).unknown(true);

