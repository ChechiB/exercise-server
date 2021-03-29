import { Request, Response, NextFunction} from 'express';
import * as itemService from './item.service';
import { validationMessage }from '../utils/utils';

export async function getItem(req: Request, res: Response, next: NextFunction){
    try {
        const id: string = req.params.id;
        const resp = await itemService.get(id);
        return res.status(200).json(resp);
    } catch (e) {
        return next(e);
    }
}

export async function search(req: Request, res: Response, next: NextFunction){
    try {
        const search = req.query.q;        
        const resp = await itemService.list(search);
        return res.status(200).json(resp);
    } catch (e) {
        return next(e);
    }
}

export function validateParams({schema}) {
    return (req: Request, res: Response, next: NextFunction) =>{
        const result = schema.validate(req,{ abortEarly: false });
        if (result.error) {
            const details = result.error.details;
            const errorList = validationMessage(details);
            return res.status(400).json({ msg: `Invalid request: ${errorList} fields are invalid.`});
        }
        return next();
    };
}

