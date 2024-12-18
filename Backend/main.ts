import { Server } from "http";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import i18n from "i18n";
import hpp from "hpp";
import cors from "cors";
import expressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import dbconnection from "./src/config/database";
import mountRoutes from "./src";



const app: express.Application = express();
app.use(express.json({limit:"10kb"}))
app.use(cors({
    origin: ['http://localhost:4200'],
    credentials: true,
    allowedHeaders: ["X-CSRF-Token", "Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));
app.use(expressMongoSanitize());
app.use(helmet({crossOriginResourcePolicy: {policy: 'same-site'}}));
app.use(compression());
app.use(cookieParser());
let server: Server;
dotenv.config();
app.use(express.static('uploads')); // for make image static not route 
app.use(hpp({ whitelist: ['price']})); // for more security to prevent add many queries 
i18n.configure({
        locales: ["en", "ar"],
        directory: path.join(__dirname, "locales"),
        defaultLocale: "en",
        queryParameter: "lang"
    }
)
app.use(i18n.init)
dbconnection(); // for database
mountRoutes(app); // for routes

server = app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`)
})

process.on( "unHandleRejection", (err: Error) => {
    console.error( `unHandleRejection ${err.name} | ${err.message}` );
    server.close(() => {
        console.error("Shutting The Application Down")
        process.exit(1);
    })
})