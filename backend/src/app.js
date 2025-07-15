import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import userRouter from "./routes/user.route.js";

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser());


app.use("/api/v1/users",userRouter);


export default app