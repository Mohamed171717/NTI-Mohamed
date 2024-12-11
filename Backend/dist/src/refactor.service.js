"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const apiErrors_1 = __importDefault(require("./utilities/apiErrors"));
class RefactorService {
    constructor() {
        this.getAll = (model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let filterData = {};
            if (req.filterData)
                filterData = req.filterData;
            const documents = yield model.find(filterData);
            res.status(200).json({ data: documents });
        }));
        this.createOne = (model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const document = yield model.create(req.body);
            res.status(201).json({ data: document });
        }));
        this.getOne = (model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const document = yield model.findById(req.params.id);
            if (!document)
                return next(new apiErrors_1.default(`${req.__('not_found')}`, 404));
            res.status(200).json({ data: document });
        }));
        this.updateOne = (model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const document = yield model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!document)
                return next(new apiErrors_1.default(`${req.__('not_found')}`, 404));
            res.status(200).json({ data: document });
        }));
        this.deleteOne = (model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const document = yield model.findByIdAndDelete(req.params.id);
            if (!document)
                return next(new apiErrors_1.default(`${req.__('not_found')}`, 404));
            res.status(204).json();
        }));
    }
}
const refactorService = new RefactorService();
exports.default = refactorService;
// or you can use export default new refactorService;
