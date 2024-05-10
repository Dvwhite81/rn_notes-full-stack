import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get All
router.get('/', async (req, res) => {
  console.log('GET');
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get One By Id
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send('ID must be a valid number');
  }

  try {
    const updatedNote = await prisma.user.findUnique({
      where: { id: id },
    });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).send('Error updating note');
  }
});

// Delete User
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send('ID must be a valid number');
  }

  try {
    await prisma.user.delete({
      where: { id: id },
    });

    const users = await prisma.user.findMany();
    res.status(204).json(users);
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
});

export default router;
