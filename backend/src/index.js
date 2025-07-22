import dotenv, { configDotenv } from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectDB } from "./db/db.js";
import http, { createServer } from "http";
import { Server } from "socket.io";


const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket)=>{
    console.log("user online");

        socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    socket.on("message", ({roomId, message, sender})=>{
        console.log("received in backend :", message,roomId)
        io.to(roomId).emit("receiveMessage", {message,sender});
    });

    socket.on("disconnect",()=>{
        console.log("user offline")
    });
});






const port = process.env.PORT || 4000

connectDB()
.then(()=>{
    console.log(`mongodb connected.`)
    server.listen( port,() =>{
        console.log(`server is runnig at port ${port}`)
    })
})
.catch((err)=>{
    console.log(`mongodb connection err`,Error)
})