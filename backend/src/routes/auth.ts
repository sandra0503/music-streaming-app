import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

// Signup
router.post("/signup", async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashed });
        res.status(201).json({ msg: "User created", user: newUser.username });
    } catch (err: any) {
        res.status(500).json({ msg: err.message });
    }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        res.json({ token, username: user.username });
    } catch (err: any) {
        res.status(500).json({ msg: err.message });
    }
});

export default router;
