import { NextFunction, Request, Response } from 'express';
import jwt, { type Secret } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import logger from './logger';
import { CustomJwtPayload } from './interfaces';

const prisma = new PrismaClient();

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log('logger');
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({
    error: 'unknown endpoint',
  });
};

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error.message);

  console.log('name:', error.name);

  if (error.name === 'CastError') {
    return res.send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.json({ error: error.message });
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return res.json({ error: 'expected `username` to be unique' });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' });
  }

  next(error);
};

const tokenExtractor = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get('authorization');
  console.log('authorization:', authorization);
  if (authorization && authorization.startsWith('Bearer ')) {
    console.log('yes');
    return authorization.replace('Bearer ', '');
  }
  console.log('no');

  next();
};

const userExtractor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = tokenExtractor(req, res, next);
  console.log('FIRST token:', token);
  if (!token) {
    return next();
  }

  console.log('userExtractor token:', token);

  const decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET as Secret
  ) as CustomJwtPayload;
  console.log('decodedToken:', decodedToken);

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'invalid token' });
  }

  const userId = decodedToken.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (user) {
    const requestUser = { ...user, id: user.id };
    req.user = requestUser;
  }

  next();
};

export default {
  errorHandler,
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  userExtractor,
};
