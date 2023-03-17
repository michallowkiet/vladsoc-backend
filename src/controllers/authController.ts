import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ISignUpRequest } from '../types/ICustomRequest.js';

const signUp = async (req: ISignUpRequest, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      imagePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      imagePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();

    res.status(StatusCodes.OK).json({ user: savedUser });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export { signUp };
