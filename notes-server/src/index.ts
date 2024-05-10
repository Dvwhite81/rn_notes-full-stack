import express from 'express';
import cors from 'cors';
require('dotenv').config();

import config from './utils/config';
import logger from './utils/logger';
import authRouter from './routes/authRouter';
import notesRouter from './routes/notesRouter';
import usersRouter from './routes/usersRouter';
import middleware from './utils/middleware';

const app = express();

app.use(express.json());
app.use(cors());

app.use(middleware.requestLogger);

app.use('/api', authRouter);
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const PORT = config.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
