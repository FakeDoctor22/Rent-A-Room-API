import express from 'express';
import chatController from '../controllers/chatController.js';

const chatRouter = express.Router();

chatRouter.get("/", chatController.getChats);
chatRouter.get("/:id", chatController.getChat);
chatRouter.post("/", chatController.createChat);
chatRouter.put("/:id", chatController.updateChat);
chatRouter.delete("/:id", chatController.deleteChat);


export default chatRouter;