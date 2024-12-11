"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_route_1 = __importDefault(require("./categories/categories.route"));
const subcategories_route_1 = __importDefault(require("./subcategories/subcategories.route"));
const products_route_1 = __importDefault(require("./products/products.route"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const apiErrors_1 = __importDefault(require("./utilities/apiErrors"));
const mountRoutes = (app) => {
    app.use('/api/v1/categories', categories_route_1.default);
    app.use('/api/v1/subcategories', subcategories_route_1.default);
    app.use('/api/v1/products', products_route_1.default);
    app.all('*', (req, res, next) => {
        next(new apiErrors_1.default(`The Route ${req.originalUrl} Not Found`, 400));
    });
    app.use(error_middleware_1.default);
};
exports.default = mountRoutes;
