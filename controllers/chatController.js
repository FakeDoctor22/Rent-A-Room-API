import Chat from "../models/Chat.js";

async function getChats(_, res) {
    const chats = await Chat.find({});

    return res.json(chats);
};

async function getChat(req, res) {
    const id = req.params.id;
    const chat = await Chat.findById(id);

    return res.json(chat);
};

async function createChat(req, res) {
    const { message } = req.body;

    const chat = new Chat({
        message,
    });

    const savedChat = await chat.save();

    return res.status(201).json(savedChat);
};


async function updateChat(req, res) {
    const id = req.params.id;
    const { message } = req.body;

    const chat = {
        message
    };

    const updatedChat = await Chat.findByIdAndUpdate(id, chat, {new: true});

    res.json(updatedChat);
};

async function deleteChat(req, res) {
    const id = req.params.id;

    await Chat.findByIdAndDelete(id);

    res.status(204).end();
};

export default {
    getChats,
    getChat,
    createChat,
    updateChat,
    deleteChat,
}