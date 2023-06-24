import mongoose from "mongoose";

const chatShema = new mongoose.Schema({
    message: String,
});

chatShema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Chat = mongoose.model("chat", chatShema);

export default Chat;