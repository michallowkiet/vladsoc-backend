import { Request } from 'express';

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
