import express, { Request, Response } from 'express';
import Post from '../models/post';
import User from '../models/user';

const testingRouter = express.Router();

testingRouter.post('/reset', async (_req: Request, res: Response) => {
  await Post.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

export default testingRouter;
