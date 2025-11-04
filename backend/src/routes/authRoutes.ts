import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Register
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { username, password: hashed, role } });
  res.json(user);
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, role: user.role });
});

export default router;
