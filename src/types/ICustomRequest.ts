import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ISignUpRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    imagePath: string;
    friends: string[];
    location: string;
    occupation: string;
  };
}

export interface ICreatePostRequest extends Request {
  body: {
    userId: string;
    imagePath?: string;
    description?: string;
  };
}

export interface ISignInRequest extends Request {
  body: { email: string; password: string };
}

export interface ICustomRequest extends Request {
  user: string | JwtPayload;
}

export interface IUserRequest extends Request {
  params: { id?: string; friendId?: string };
}

export interface IPostRequest extends Request {
  params: { userId?: string; postId?: string };
  body: { userId: string };
}
