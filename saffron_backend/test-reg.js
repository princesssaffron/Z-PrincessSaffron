import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre("save", async function () {
    console.log("Pre-save hook triggered");
    if (!this.isModified("password")) return;
    try {
        console.log("Generating salt...");
        const salt = await bcrypt.genSalt(10);
        console.log("Hashing password...", this.password);
        this.password = await bcrypt.hash(this.password, salt);
        console.log("Password hashed");
    } catch (err) {
        console.error("Bcrypt error:", err);
        throw err;
    }
});

const User = mongoose.model("TestUser", userSchema);

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        const userData = {
            fullName: "Test User",
            email: "test" + Date.now() + "@example.com",
            password: "password123"
        };

        console.log("Attempting to create user...");
        const user = await User.create(userData);
        console.log("User created successfully:", user);

        await mongoose.connection.close();
    } catch (error) {
        console.error("Test failed with error:", error);
        process.exit(1);
    }
};

test();
