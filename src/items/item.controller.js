module.exports = {
    getItem,
    search,
    validateParams
}

const Boom = require('@hapi/boom');
const itemService = require('./item.service');
const { validationMessage } = require('../utils/utils');

async function getItem(req, res, next){
    try {
        const id = req.params.id;
        const resp = await itemService.get(id);

        return res.status(200).json(resp);
    } catch (e) {
        return next(Boom.boomify(e));
    }
}

async function search(req, res, next){
    try {
        const search = req.query.q;
        const resp = await itemService.list(search);
        return res.status(200).json(resp);
    } catch (e) {
        return next(Boom.boomify(e));
    }
}

function validateParams({schema}) {
    return (req,res,next) =>{
        const result = schema.validate(req,{ abortEarly: false });

        if (result.error) {
            const details = result.error.details;
            const errorList = validationMessage(details);
            return res.status(400).json({ msg: `Invalid request: ${errorList} fields are invalid.`});
        }

        return next();
    };
}
