"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// app.use(express.json({limit:"10kb"}))
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.listen(3000, () => {
    console.log("server started on port 3000");
});
