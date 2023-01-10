import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
import User from '../models/user';

const loginRouter = express.Router();

loginRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const passwordCorrect = user === null ? false : await argon2.verify(user.passwordHash!, password);
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password',
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(
      userForToken,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.SECRET!, {
      expiresIn: 60 * 60,
    });

    return res.status(200).send({ token, username: user.username, name: user.name });
  } catch (error) {
    return next(error);
  }
});




export default loginRouter;