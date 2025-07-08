import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        const dbConnection = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongodb connected at port. Host :- ${dbConnection.connection.host}`)
    } catch (error) {
        console.log(`db connection err`,error)
        process.exit(1)
    }
}