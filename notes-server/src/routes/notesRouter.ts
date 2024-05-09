import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get All
router.get('/', async (req, res) => {
  console.log('GET');
  const notes = await prisma.note.findMany();
  const goodNotes = notes.filter(
    (note) => note.content.length > 0 && note.title.length > 0
  );
  res.json(goodNotes);
});

// Add Note
router.post('/', async (req, res) => {
  const { title, content, userId } = req.body;

  try {
    const username = localStorage.getItem('user');

    if (!username) {
      return res.json({
        error: 'Not Authorized',
      });
    }
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    const note = await prisma.note.create({
      data: { title, content, userId },
    });

    res.json(note);
  } catch (error) {
    res.status(500).send('Error creating new note');
  }
});

// Update note
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  const id = parseInt(req.params.id);

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
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send('ID must be a valid number');
  }

  try {
    await prisma.note.delete({
      where: { id },
    });

    const notes = await prisma.note.findMany();
    res.status(204).json(notes);
  } catch (error) {
    res.status(500).send('Error deleting note');
  }
});

export default router;
