import { Request, Response, } from "express";
import { db } from "../db/index.js";
import { user } from "../db/schema.js";
import generateToken from "../utils/generateToken.js";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import bcrypt from "bcryptjs";




export const authUser = async (req: Request, res: Response) => {
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

    const passwordMatch = await bcrypt.compare(password, userExists?.password!);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Unauthorized" });
    }
    if (userExists && passwordMatch) {
      generateToken(res, userExists.id);
      const accessToken = jwt.sign(userExists.id, process.env.JWT_SECRET as string, { expiresIn: "15min" });
      return res.status(201).json({ accessToken }).end();
    }

  } catch (error) {
    return res.status(400).json({ message: "Unauthorized", error });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = await req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const userExists = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email)
    })
    if (userExists) {
      return res.status(409).json({ message: "user exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser: any = await db.insert(user).values({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword
    }).returning({ id: user.id, email: user.email })

    if (newUser) {
      generateToken(res, newUser.id);
      return res.status(201).json({ message: "new user created" }).end();
    }
  } catch (error) {
    return res.status(400).json({ message: "could not create new user", error: error });
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const refreshToken = cookies.jwt;

    jwt.verify(refreshToken, process.env.JWT_SECRET as string,
      async (err: any, decoded: any) => {
        if (err) {
          return res.status(403).json({ message: "Forbiden" });
        }

        const userExists = await db.query.user.findFirst({
          where: (user, { eq }) => eq(user.id, decoded.id)
        });

        if (!userExists) {
          return res.status(400).json({ message: "Unauthorized" });
        }
        const accessToken = jwt.sign(userExists.id, process.env.JWT_SECRET as string, { expiresIn: "15min" });
        res.json({ accessToken });
      }
    )
  } catch (error) {
    return res.status(400).json({ message: "refresh token", error: error });
  }
}



export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true
  })
  return res.status(200).json({ message: "Logout user" })
}

export const getUserProfile = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "User profile" });
}