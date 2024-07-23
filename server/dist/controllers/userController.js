import { db } from "../db/index.js";
import { user } from "../db/schema.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
export const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: "All fields are required" }).end();
        }
        const userExists = await db.query.user.findFirst({
            where: (user, { eq }) => eq(user.email, email)
        });
        if (!userExists) {
            return res.status(400).json({ message: "User doesn't exist" }).end();
        }
        const passwordMatch = await bcrypt.compare(password, userExists?.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Unauthorized" });
        }
        if (userExists && passwordMatch) {
            generateToken(res, userExists.id);
            return res.status(201).json({ user: userExists.email }).end();
        }
    }
    catch (error) {
        return res.status(400).json({ message: "Unauthorized", error });
    }
};
export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = await req.body;
        const userExists = await db.query.user.findFirst({
            where: (user, { eq }) => eq(user.email, email)
        });
        if (userExists) {
            return res.status(400).json({ message: "user exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await db.insert(user).values({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        }).returning({ id: user.id, email: user.email });
        if (newUser) {
            generateToken(res, newUser.id);
            return res.status(201).json({ message: "new user succes" }).end();
        }
    }
    catch (error) {
        return res.status(400).json({ message: "could not create new user", error: error });
    }
};
export const logoutUser = async (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true
    });
    return res.status(200).json({ message: "Logout user" });
};
export const getUserProfile = async (req, res) => {
    return res.status(200).json({ message: "User profile" });
};
