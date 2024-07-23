import jwt, { JwtPayload } from "jsonwebtoken";
import { User, user, UserSelect } from "../db/schema.js";
import { NextFunction, Request, Response } from "express";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";

export type UserIdAndEmail = Omit<UserSelect, "password" | "lastName" | "firstName">;

declare global {
  namespace Express {
    interface Request {
      user: UserIdAndEmail[]

    }
  }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      req.user = await db.select({
        id: user.id,
        email: user.email,
      }).from(user).where(eq(user.id, decoded.id));
      next();
    } catch (error) {
      return res.status(401).json({ message: "not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "not authorized, token failed" });
  }
}

export { protect };