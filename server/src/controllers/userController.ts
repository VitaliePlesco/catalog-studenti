import { Request, Response, } from "express";
import { db } from "../db/index.js";
import { user } from "../db/schema.js";
import generateToken from "../utils/generateToken.js";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import bcrypt from "bcryptjs";




export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {

    if (!email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }

    const userExists = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email)
    });

    if (!userExists) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const passwordMatch = await bcrypt.compare(password, userExists?.password!);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Unauthorized, wrong password" });
    }

    if (userExists && passwordMatch) {

      const accessToken = jwt.sign({ userId: userExists.id }, process.env.JWT_SECRET as string, { expiresIn: "30min" });
      const refreshToken = jwt.sign({ userId: userExists.id }, process.env.JWT_SECRET as string, { expiresIn: "365days" });

      // res.cookie("accessToken", accessToken, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: "lax",
      //   maxAge: 30 * 60 * 1000,
      // });
      // res.cookie("refreshToken", refreshToken, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: "lax",
      //   maxAge: 365 * 24 * 60 * 60 * 1000,
      // });

      // return res.status(200).json({ token: accessToken, user: { userId: userExists.id, name: userExists.firstName, email: userExists.email } });
      return res.status(200).json({ message: "hello", token: accessToken });
    }

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unauthorized,", error });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {

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
      return res.status(201).json({ message: "new user created" });
    }
  } catch (error) {
    return res.status(400).json({ message: "could not create new user", error: error });
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  let newToken = false
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized", token: "No refresh token" });
  } else {
    jwt.verify(refreshToken, process.env.JWT_SECRET as string,
      async (err: any, decoded: any) => {
        if (err) {
          return res.status(403).json({ message: "Forbiden" });
        } else {
          const accessToken = jwt.sign({ userId: decoded.id }, process.env.JWT_SECRET as string, { expiresIn: "30min" });
          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 60 * 1000,
          });
          newToken = true;
        }
      }
    )
  }
  return newToken;
}



export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("accessToken")
  res.clearCookie("refreshToken")
  return res.status(200).json({ message: "Logout user" })
}

export const getUserProfile = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "User profile" });
}