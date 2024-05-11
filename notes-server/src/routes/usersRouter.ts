import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get All
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();

  try {
    if (users) {
      return res.status(200).json({
        success: true,
        users,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Users could not be found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error getting users',
    });
  }
});

// Get One By Id
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.json({
      success: false,
      message: 'ID must be a valid number',
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (user) {
      return res.status(200).json({
        success: true,
        user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User could not be found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error getting user',
    });
  }
});

// Edit User (change username)
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { newUsername } = req.body;
  const { user } = req;

  if (!id || isNaN(id)) {
    return res.json({
      success: false,
      message: 'ID must be a valid number',
    });
  }

  if (!newUsername) {
    return res.json({
      success: false,
      message: 'New username is required',
    });
  }

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'You cannot change this user',
    });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { username: newUsername },
    });

    if (updatedUser) {
      return res.status(200).json({
        success: true,
        user: updatedUser,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User could not be found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating user',
    });
  }
});

// Delete User
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { user } = req;

  if (!id || isNaN(id)) {
    return res.json({
      success: false,
      message: 'ID must be a valid number',
    });
  }

  if (!user || user.id !== id) {
    return res.status(401).json({
      success: false,
      message: 'You cannot delete this user',
    });
  }

  try {
    const response = await prisma.user.delete({
      where: { id: id },
    });

    if (!response) {
      return res.json({
        success: false,
        message: 'User could not be found or deleted',
      });
    }

    const users = await prisma.user.findMany();

    if (users) {
      return res.status(200).json({
        success: true,
        users,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Users could not be found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting user',
    });
  }
});

export default router;
