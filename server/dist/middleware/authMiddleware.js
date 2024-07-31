import jwt from "jsonwebtoken";
import { user } from "../db/schema.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { refreshToken } from "../controllers/userController.js";
const protect = async (req, res, next) => {
    let accessToken = req.cookies.accessToken;
    if (!accessToken) {
        if (await refreshToken(req, res)) {
            next();
        }
    }
    else {
        jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Forbiden" });
            }
            else {
                req.user = await db.select({
                    id: user.id,
                    email: user.email,
                }).from(user).where(eq(user.id, decoded.userId));
                next();
            }
        });
    }
    // let token = req.cookies.accessToken;
    // console.log(token);
    // if (token) {
    //   try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    //     console.log(decoded);
    //     req.user = await db.select({
    //       id: user.id,
    //       email: user.email,
    //     }).from(user).where(eq(user.id, decoded.id));
    //     next();
    //   } catch (error) {
    //     return res.status(401).json({ message: "not authorized, token failed" });
    //   }
    // } else {
    //   return res.status(401).json({ message: "not authorized, token failed" });
    // }
};
export { protect };
