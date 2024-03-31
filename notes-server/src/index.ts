import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
require('dotenv').config();

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());

// Get All
app.get('/api/notes', async (req, res) => {
  console.log('get all');
  const notes = await prisma.note.findMany();
  res.json(notes);
});

// Add Note
app.post('/api/notes', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send('Title and content fields are required');
  }

  try {
    const note = await prisma.note.create({
      data: { title, content },
    });

    res.json(note);
  } catch (error) {
    res.status(500).send('Error creating new note');
  }
});

// Update note
app.put('/api/notes/:id', async (req, res) => {
  const { title, content } = req.body;
  const id = parseInt(req.params.id);

  if (!title || !content) {
    return res.status(400).send('Title and content fields are required');
  }

  if (!id || isNaN(id)) {
    return res.status(400).send('ID must be a valid number');
  }

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, content },
    });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).send('Error updating note');
  }
});

// Delete note
app.delete('/api/notes/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send('ID must be a valid number');
  }

  try {
    await prisma.note.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting note');
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
