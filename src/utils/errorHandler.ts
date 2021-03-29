export class HttpException extends Error {
    statusCode?: string;
    message: string;

    constructor(statusCode: string, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export const handlerError = (err, res) => {   
    const { statusCode, message } = err;
    return res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};
