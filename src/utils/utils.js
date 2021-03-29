"use strict";
exports.__esModule = true;
exports.validationMessage = exports.getDecimals = void 0;
var getDecimals = function (number) {
    var decimals = (number + '').split('.');
    if (decimals[1] !== undefined) {
        return Number(decimals[1]);
    }
    else {
        return 0;
    }
};
exports.getDecimals = getDecimals;
var validationMessage = function (data) {
    var fields = [];
    data.forEach(function (element) {
        fields.push(element.path[element.path.length - 1]);
    });
    return fields;
};
exports.validationMessage = validationMessage;
