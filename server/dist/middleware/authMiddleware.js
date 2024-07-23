import jwt from "jsonwebtoken";
import { user } from "../db/schema.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
const protect = async (req, res, next) => {
    let token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await db.select({
                id: user.id,
                email: user.email,
            }).from(user).where(eq(user.id, decoded.id));
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "not authorized, token failed" });
        }
    }
    else {
        return res.status(401).json({ message: "not authorized, token failed" });
    }
};
export { protect };
