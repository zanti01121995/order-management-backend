import express from "express";

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { User } from "../models/User";

const authController = express.Router();

authController.post('/register', async (req, res) => {
    try {
        const isExist = await User.findOne({ email: req.body.email });
        if (isExist) {
            throw new Error('email already exists')
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({ ...req.body, password: hashedPassword });
        const { password, ...others } = newUser._doc;
        const token = jsonwebtoken.sign({ id: newUser.id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: '6h' });
        return res.status(201).json({ others, token })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

authController.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error('User not found or registered')
        }
        const comparepass = await bcrypt.compare(req.body.password, user.password);
        if (!comparepass) {
            throw new Error('password mismatch');
        }
        const { password, ...others } = user._doc;
        const token = jsonwebtoken.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '6h' });
        return res.status(200).json({ others, token })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})
export default authController;