"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMessage = exports.getDecimals = void 0;
const getDecimals = (number) => {
    const decimals = (number + '').split('.');
    if (decimals[1] !== undefined) {
        return Number(decimals[1]);
    }
    else {
        return 0;
    }
};
exports.getDecimals = getDecimals;
const validationMessage = (data) => {
    let fields = [];
    data.forEach(element => {
        fields.push(element.path[element.path.length - 1]);
    });
    return fields;
};
exports.validationMessage = validationMessage;
//# sourceMappingURL=utils.js.map