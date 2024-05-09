import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../utils/config';

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
      where: { id },
    });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).send('Error updating note');
  }
});

// Register
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await prisma.user.findFirst({
    where: { username },
  });

  if (existingUser) {
    return res.json({
      error: 'Username is taken',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    res.json(user);
  } catch (error) {
    res.status(500).send('Error creating new user');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    console.log('login user:', user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({
        error: 'Invalid credentials',
      });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, config.JWT_SECRET as string, {
      expiresIn: 60 * 60,
    });

    return res.status(201).json({
      token,
      success: true,
      message: 'Logged in successfully',
      user,
    });
  } catch (error) {
    console.log('login error:', error);
    res.status(500).send('Error logging in');
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
      where: { id },
    });

    const users = await prisma.user.findMany();
    res.status(204).json(users);
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
});

export default router;
