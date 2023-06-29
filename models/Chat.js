import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    message: String,
    user: String
});

chatSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;