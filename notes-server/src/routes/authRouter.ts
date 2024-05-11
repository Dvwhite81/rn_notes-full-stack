import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from '../utils/config';

const router = Router();
const prisma = new PrismaClient();

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { username: username },
  });

  if (existingUser) {
    return res.json({
      success: false,
      message: 'Username is taken',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    if (user) {
      return res.status(201).json({
        success: true,
        message: 'Registered successfully!',
      });
    } else {
      return res.json({
        success: false,
        message: 'Could not register user',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating new user',
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log('reqBody:', req.body);
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    console.log('login user:', user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({
        success: false,
        message: 'Invalid credentials',
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
    return res.json({
      success: false,
      message: 'Error logging in',
    });
  }
});

router.get('/token/:token', async (req, res) => {
  console.log('backend getbytoken');
  try {
    const { token } = req.params;
    const decoded = jwt.verify(
      token,
      config.JWT_SECRET as string
    ) as JwtPayload;

    const { id } = decoded;
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.log('Token exists but is expired');
      return res.json({
        success: false,
        message: 'Expired token',
      });
    }
    console.log('catch after if');
    return res.json({
      success: false,
      message: 'User could not be found',
    });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  return res.send('logout');
});

export default router;
