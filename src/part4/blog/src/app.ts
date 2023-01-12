import config from './utils/config';
import express, { Request } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { postsRouter, usersRouter, loginRouter, testingRouter } from './controllers';

import middleware from './utils/middleware';
import logger from './utils/logger';

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI || 'mongodb://localhost/blog')
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('build'));
morgan.token('body', (req: Request) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// Add middleware
app.use(middleware.tokenExtractor);

// Add routes
app.use('/api/login', loginRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

console.log('NODE_ENV:', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

// Add error handler
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
