/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from './logger';


const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token',
    });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired',
    });
  }
  return next(error);
};

const tokenExtractor = (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req['token'] = authorization.substring(7);
  }
  next();
}

const userExtractor = (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.get('authorizartion');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET!);
    if (decodedToken) {
      req['user'] = decodedToken;
    } else {
      req['user'] = null;
    }
  }
  next();
}

export default {
  unknownEndpoint,
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor,
};
