import Chat from "../models/Chat.js";

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
        // const chatExists = await Chat.findOne({ message });

        // if (chatExists) return res.status(400).json({ error: "Chat already exists" })

        const chat = new Chat({ message });

        const savedChat = await chat.save();

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