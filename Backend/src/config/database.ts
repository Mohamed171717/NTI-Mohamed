import mongoose from "mongoose";

const dbconnection = () => {
    mongoose.connect('mongodb://localhost:27017/NTI-Mohamed') // process.env.DB
    .then(() => {
        console.log("connect to database");
    })
    .catch((err) => {
        console.log("error connecting to database", err)
    })
}

export default dbconnection;