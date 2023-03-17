import { Router } from 'express';
import {
  getPosts,
  getUserPosts,
  likePost,
} from '../controllers/postController.js';
import { verifyToken } from '../middleware/authHandler.js';

const PostRouter = Router();

PostRouter.route('/').get(verifyToken, getPosts);
PostRouter.route('/:userId/posts').get(verifyToken, getUserPosts);

PostRouter.route('/:postId/posts').patch(verifyToken, likePost);

export default PostRouter;
