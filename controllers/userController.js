import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const getUsers = async (_req, res) => {
    try {
        const users = await User.find({}).populate("chats");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

async function createUser(req, res, next) {
    try {
        const { username, name, password } = req.body
        const userExists = await User.findOne({ username, name });

        if (userExists) return res.status(400).json({ message: 'User already exists' })

        const saltRounds= 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({
            username,
            name,
            passwordHash
        });

        const savedUser = await user.save();
        
        return res.status(201).json(savedUser);
    } catch (error) {
        next (error);
    }
}

export  default {
    createUser,
    getUsers
}