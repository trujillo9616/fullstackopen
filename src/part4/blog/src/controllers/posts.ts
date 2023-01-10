/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Post from '../models/post';

interface JwtPayload {
  id: string;
}

const postsRouter = express.Router();

postsRouter.get('/', async (_req: Request, res: Response) => {
  const posts = await Post.find({}).populate('user', { username: 1, name: 1 });
  res.json(posts);
});

postsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      return res.json(post);
    } else {
      return res.status(404).end();
    }
  } catch (e) {
    return next(e);
  }
});

postsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const token = req.token;

    if (!token) {
      return res.status(401).json({
        error: 'token missing',
      });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET!) as JwtPayload;
    if (!decodedToken) {
      return res.status(401).json({
        error: 'token missing or invalid',
      });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(400).json({
        error: 'user not found',
      });
    }

    const post = new Post({
      title: body.title,
      author: user.name,
      url: body.url,
      user: user._id,
    });

    const savedPost = await post.save();
    user.posts = user.posts.concat(savedPost.id);
    await user.save();
    return res.status(201).json(savedPost);
  } catch (e) {
    return next(e);
  }
});

postsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  const post = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, { new: true, runValidators: true, context: 'query' });
    return res.json(updatedPost);
  } catch (e) {
    return next(e);
  }
});

postsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.token;

    if (!token) {
      return res.status(401).json({
        error: 'token missing',
      });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET!) as JwtPayload;
    if (!decodedToken) {
      return res.status(401).json({
        error: 'token is invalid',
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        error: 'post not found',
      });
    }

    if (post.user.toString() !== decodedToken.id) {
      return res.status(401).json({
        error: 'user not authorized',
      });
    }

    await Post.findByIdAndRemove(req.params.id);
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});

export default postsRouter;