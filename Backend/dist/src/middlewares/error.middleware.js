"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devErrors = (err, res) => {
    res.status(err.statusCode).json({
        error: err,
        status: err.status,
        message: err.message,
        stack: err.stack
    });
};
const prodErrors = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};
const globalErrors = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Error";
    if (process.env.NODE_ENV === "development")
        devErrors(err, res);
    else
        prodErrors(err, res);
};
exports.default = globalErrors;
