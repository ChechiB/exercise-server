const Joi = require('joi');

const searchSchema = Joi.object().keys({
    query: {
        q: Joi.string().required(),
    }
}).unknown(true);

const paramSchema = Joi.object().keys({
    params: {
        id: Joi.string().required(),
    },
}).unknown(true);

module.exports = {
    paramSchema,
    searchSchema
};
