"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.search = exports.getItem = void 0;
const itemService = __importStar(require("./item.service"));
const utils_1 = require("../utils/utils");
function getItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const resp = yield itemService.get(id);
            return res.status(200).json(resp);
        }
        catch (e) {
        }
    });
}
exports.getItem = getItem;
function search(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Search');
            const search = req.query.q;
            console.log(search);
            const resp = yield itemService.list(search);
            return res.status(200).json(resp);
        }
        catch (e) {
        }
    });
}
exports.search = search;
function validateParams({ schema }) {
    return (req, res, next) => {
        const result = schema.validate(req, { abortEarly: false });
        if (result.error) {
            console.log('result', result.error);
            const details = result.error.details;
            const errorList = utils_1.validationMessage(details);
            return res.status(400).json({ msg: `Invalid request: ${errorList} fields are invalid.` });
        }
        return next();
    };
}
exports.validateParams = validateParams;
//# sourceMappingURL=item.controller.js.map