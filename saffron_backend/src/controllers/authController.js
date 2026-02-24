import User from "../models/userModel.js";
import { generateToken } from "../config/generateToken.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            fullName,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Check for specific admin credentials
        if (email === "princesssaffron519@gmail.com" && password === "Saffron777") {
            if (user) {
                if (!user.isAdmin) {
                    user.isAdmin = true;
                    await user.save();
                }
                return res.json({
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id),
                });
            } else {
                // If user doesn't exist but has valid admin credentials, create them
                const adminUser = await User.create({
                    fullName: "Admin",
                    email: "princesssaffron519@gmail.com",
                    password: "Saffron777",
                    isAdmin: true,
                });
                return res.json({
                    _id: adminUser._id,
                    fullName: adminUser.fullName,
                    email: adminUser.email,
                    isAdmin: adminUser.isAdmin,
                    token: generateToken(adminUser._id),
                });
            }
        }

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Google login
// @route   POST /api/auth/google
// @access  Public
export const googleLogin = async (req, res) => {
    const { tokenId, accessToken } = req.body;

    try {
        let name, email, picture;

        // Determine if tokenId is a JWT (ID Token) or an Access Token
        // JWTs have 3 segments separated by dots
        const isJWT = (token) => token && token.split(".").length === 3;

        if (tokenId && isJWT(tokenId)) {
            // Verify as ID Token
            const ticket = await client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            name = payload.name;
            email = payload.email;
            picture = payload.picture;
        } else {
            // Treat as Access Token (implicit flow or provided directly)
            const tokenToUse = accessToken || tokenId;
            if (!tokenToUse) {
                return res.status(400).json({ message: "No token provided" });
            }

            const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenToUse}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error_description || "Token verification failed or expired");
            }

            name = data.name;
            email = data.email;
            picture = data.picture;
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                fullName: name,
                email,
                password: Math.random().toString(36).slice(-8),
                avatar_url: picture,
            });
        }

        if (user) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user._id),
                avatar_url: user.avatar_url,
            });
        } else {
            res.status(400).json({ message: "Google login failed" });
        }
    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(401).json({ message: error.message || "Google authentication failed" });
    }
};
