import Chat from "../models/Chat.js";
import User from "../models/User.js";
import getTokenFrom from "../utils/getTokenFrom.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";

async function getChats(_, res) {
    const chats = await Chat.find({});

    return res.json(chats);
};

async function getChat(req, res, next) {
    try {
        const id = req.params.id;
        const chat = await Chat.findById(id);

        if (chat) return res.json(chat);

        return res.status(404).json({ error: "Chat not found"});
    } catch (error) {
        next(error);
    }
};

async function createChat(req, res, next) {
    try {
        const { message } = req.body;
        const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET);

        if (!decodedToken.id) {
            return res.status(401).json({ error: "Token missing or invalid" });
        }

        const user = await User.findById(decodedToken.id);
        // const chatExists = await Chat.findOne({ message });

        // if (chatExists) return res.status(400).json({ error: "Chat already exists" })

        // if (message === "")
        //     return res.status(400).json({ error: "Message is required" });

        const chat = new Chat({ 
            message,
            user: user._id,
        });

        const savedChat = await chat.save();
        user.chats = user.chats.concat(savedChat._id);
        await user.save();

        return res.status(201).json(savedChat);
    } catch (error) {
        next(error);
    }
};

async function updateChat(req, res, next) {
    const id = req.params.id;
    const { message } = req.body;

    const chat = {
        message
    };

    try {
        const updatedChat = await Chat.findByIdAndUpdate(id, chat, { new: true
    });

    if (updatedChat) return res.json(updatedChat);
    
        return res.status(404).json({ error: "Chat not found"});
    } catch (error) {
        next(error);
    }
};

async function deleteChat(req, res, next) {
    try {
        const id = req.params.id;
        await Chat.findByIdAndDelete(id);

        res.status(204).end();
    } catch(error) {
        next(error);
    }
};

export default {
    getChats,
    getChat,
    createChat,
    updateChat,
    deleteChat,
}