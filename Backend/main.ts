import express from "express";
import dbconnection from "./src/config/database";
import dotenv from "dotenv"
import mountRoutes from "./src";



const app: express.Application = express();
app.use(express.json({limit:"10kb"}))


dbconnection(); // for database
dotenv.config()

mountRoutes(app); // for routes

app.listen(3000, () => {
    console.log("server started on port 3000")
})