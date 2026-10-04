import userModel from '../models/user.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export async function registerUser(req, res) {
    const { username, email, password } = req.body;
    const isUserExist = await userModel.findOne(
        {
            $or: [
                { username: username },
                { email: email }
            ]
        }
    );
    if (isUserExist) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');



    const newUser = new userModel({
        username,
        email,
        password: hashedPassword
    });

    const accesstoken = jwt.sign({ id: newUser._id }, config.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: newUser._id }, config.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully",
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token: accesstoken,
        }
     });
}

export async function getMe(req, res) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const   user = await userModel.findById(decoded.id).select('-password');
    res.status(200).json({ user });
}

export async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
        const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newAccessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '15m' });
        res.status(200).json({ accessToken: newAccessToken });

        const newRefreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
    } catch (error) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
}