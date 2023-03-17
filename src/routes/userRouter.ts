import { Router } from 'express';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from '../controllers/userController.js';

const userRouter = Router();

userRouter.route('/:id').get(getUser);
userRouter.route('/:id/friends').get(getUserFriends);

userRouter.route('/:id/:friendId').patch(addRemoveFriend);

export default userRouter;
