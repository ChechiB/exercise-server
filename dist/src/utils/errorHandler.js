"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerError = exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ErrorHandler = ErrorHandler;
const handlerError = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};
exports.handlerError = handlerError;
//# sourceMappingURL=errorHandler.js.map