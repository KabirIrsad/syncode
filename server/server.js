import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
app.use(cors());

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/", (req,res)=>{
    res.send({
        activeStatus: true,
        error: false,
    });
});

connectToMongoDB()
.then(() => {
    server.listen(port, () => {
        console.log(`Server running on ${port}`)
    });
})
.catch((err) => console.log(`${err} did not connect`));


