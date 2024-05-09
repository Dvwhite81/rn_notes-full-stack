import express from 'express';
import cors from 'cors';
require('dotenv').config();

import notesRouter from './routes/notesRouter';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/notes', notesRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
