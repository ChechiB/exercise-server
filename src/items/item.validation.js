const Joi = require('joi');
const regexId = new RegExp(/^(MLA[0-9]+)$/);

const searchSchema = Joi.object().keys({
    query: {
        q: Joi.string().required(),
    }
}).unknown(true);

const paramSchema = Joi.object().keys({
    params: {
        id: Joi.string().regex(regexId).required(),
    },
}).unknown(true);

module.exports = {
    paramSchema,
    searchSchema
};
