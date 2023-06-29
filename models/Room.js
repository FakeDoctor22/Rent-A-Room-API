import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

roomSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Room = mongoose.model("Room", roomSchema);

export default Room;