import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { IUserRequest } from '../types/ICustomRequest.js';

const getUser = async (req: IUserRequest, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    delete user.password;

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
  }
};

const getUserFriends = async (req: IUserRequest, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id)),
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, imagePath }) => {
        return { _id, firstName, lastName, occupation, location, imagePath };
      },
    );

    res.status(StatusCodes.OK).json(formattedFriends);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
  }
};

const addRemoveFriend = async (req: IUserRequest, res: Response) => {
  const { id: userId, friendId } = req.params;
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (user.friends.includes(friendId)) {
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((id) => id !== userId);
  } else {
    user.friends.push(friendId);
    friend.friends.push(userId);
  }

  await user.save();
  await friend.save();

  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id)),
  );

  const formattedFriends = friends.map(
    ({ _id, firstName, lastName, occupation, location, imagePath }) => {
      return { _id, firstName, lastName, occupation, location, imagePath };
    },
  );

  res.status(StatusCodes.OK).json(formattedFriends);
};

export { getUser, getUserFriends, addRemoveFriend };
