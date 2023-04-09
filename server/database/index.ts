import mongoose from "mongoose";

function getDatabaseConnection() {
    return mongoose.connect(process.env.MONGO_DB_URL!);
}