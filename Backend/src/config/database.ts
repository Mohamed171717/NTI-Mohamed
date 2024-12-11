import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config()

const dbconnection = () => {
    mongoose.connect(process.env.DB!)
    .then(() => {
        console.log(`connect to ${process.env.DB}`);
    })
}

export default dbconnection;