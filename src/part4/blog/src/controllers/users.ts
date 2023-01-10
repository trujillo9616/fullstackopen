import * as argon2 from 'argon2';
import { passwordStrength } from 'check-password-strength';
import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';

const usersRouter = express.Router();

usersRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({}).populate('posts', { title: 1, author: 1, url: 1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).populate('posts', { title: 1, author: 1, url: 1 });
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    return next(error);
  }
});

usersRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, name, password } = req.body;

    const existingUser = await User.findOne({
      username,
    });
    if (existingUser) {
      return res.status(400).json({
        error: 'username must be unique',
      });
    }

    if (passwordStrength(password).id < 2) {
      return res.status(400).json({
        error: 'password is too weak',
      });
    }

    const passwordHash = await argon2.hash(password);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return next(error);
  }
});


export default usersRouter;
