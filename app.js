import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./utils/config.js";
import chatRouter from "./routes/chatRouter.js";
import userRouter from "./routes/userRouter.js";
import errorHandler from "./middlewares/errorHandler.js";
import unknownEndpoint from "./middlewares/unknownEndpoint.js";
import loginRouter from "./routes/loginRouter.js";

const app = express();

const connectToDB = async (url) => {
    await mongoose.connect(url);
    console.log("Connected to DB");
}

connectToDB(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/chats", chatRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;