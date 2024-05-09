import express from 'express';
import cors from 'cors';
require('dotenv').config();

import config from './utils/config';
import notesRouter from './routes/notesRouter';
import usersRouter from './routes/usersRouter';
import logger from './utils/logger';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

const PORT = config.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
