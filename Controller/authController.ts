import type { Request, Response } from "express";
import type { HydratedDocument } from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { IUser, PublicUser } from "../types/models.js";
import { getErrorMessage } from "../utils/errors.js";
import { env } from "../config/env.js";

interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

const publicUser = (user: HydratedDocument<IUser>): PublicUser => ({
  _id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
});

export const signUp = async (
  req: Request<{}, {}, SignUpBody>,
  res: Response,
) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(publicUser(user));
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) });
  }
};

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "User not Found",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "invalid credentails",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },

      env.JWT_SECRET,

      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({
      message: "login successful",
      user: publicUser(user),
      token,
    });
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) });
  }
};
