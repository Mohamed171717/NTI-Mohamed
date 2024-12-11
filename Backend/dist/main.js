"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const i18n_1 = __importDefault(require("i18n"));
const database_1 = __importDefault(require("./src/config/database"));
const src_1 = __importDefault(require("./src"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "10kb" }));
let server;
dotenv_1.default.config();
i18n_1.default.configure({
    locales: ["en", "ar"],
    directory: path_1.default.join(__dirname, "locales"),
    defaultLocale: "en",
    queryParameter: "lang"
});
app.use(i18n_1.default.init);
(0, database_1.default)(); // for database
(0, src_1.default)(app); // for routes
server = app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
});
process.on("unHandleRejection", (err) => {
    console.error(`unHandleRejection ${err.name} | ${err.message}`);
    server.close(() => {
        console.error("Shutting The Application Down");
        process.exit(1);
    });
});
