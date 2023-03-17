import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ICreatePostRequest, IPostRequest } from '../types/ICustomRequest.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
  }
};

const getUserPosts = async (req: IPostRequest, res: Response) => {
  try {
    const { userId } = req.body;
    const posts = await Post.findById(userId);
    res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
  }
};

const likePost = async (req: IPostRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(postId);

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        likes: post.likes,
      },
      { new: true },
    );

    res.status(StatusCodes.OK).json(updatedPost);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
  }
};

const createPost = async (req: ICreatePostRequest, res: Response) => {
  try {
    const { userId, description, imagePath } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userImagePath: user.imagePath,
      imagePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const posts = await Post.find();

    res.status(StatusCodes.CREATED).json(posts);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: 'createPost' });
  }
};

export { getPosts, createPost, getUserPosts, likePost };
