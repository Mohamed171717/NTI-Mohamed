"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiErrors extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? "Failed" : "Error";
    }
}
exports.default = ApiErrors;
