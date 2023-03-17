import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { ICustomRequest } from '../types/ICustomRequest.js';

export const verifyToken = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token = req.header('authorization');

    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json('Access Denied');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimStart();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;

    next();
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};
