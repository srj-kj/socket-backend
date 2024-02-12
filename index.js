import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from "http";


import authRoutes from "./src/routes/authRoutes.js";

import errorHandler from './src/middleware/errorHandler.js';
import connectToDatabase from './src/connection/config.js';
import User from './src/model/userSchema.js';
import {connectSocket} from './src/connection/socket.js';

dotenv.config();



const app = express();
const server = http.createServer(app);

app.use(cors());

app.use(express.json())



connectSocket(server).on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("login_successful", async(email) => {
      await  User.findOneAndUpdate({ email: email }, { socketId: socket.id }, { new: true })

    });
});

app.use("/api/", authRoutes);
app.all('*',(req,res,next)=>{
  const err = { message: "Not found(Invalid Route)", statusCode: 404 };
  throw err;
})
app.use(errorHandler);
connectToDatabase();

server.listen(3000, () => {
    console.log("server running at 3000");
});