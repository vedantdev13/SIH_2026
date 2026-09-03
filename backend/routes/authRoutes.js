import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { verifyToken } from '../middleware/authMiddleware.js';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'kaamsetu_super_secret_jwt_key_2026';

// Helper to generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      name: user.name, 
      phone: user.phone, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role, cooperativeName, tradeSkill, registrationNo } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'Name, phone number, and password are required.' });
    }

    // Check if phone or email already exists
    const existingUser = await User.findOne({ 
      $or: [
        { phone },
        ...(email ? [{ email }] : [])
      ] 
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this phone number or email already exists.' });
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email: email || `${phone}@kaamsetu.org`,
      phone,
      password: hashedPassword,
      role: role || 'customer',
      cooperativeName,
      tradeSkill,
      registrationNo
    });

    const savedUser = await newUser.save();
    const token = generateToken(savedUser);

    const userProfile = {
      id: savedUser._id,
      name: savedUser.name,
      phone: savedUser.phone,
      email: savedUser.email,
      role: savedUser.role,
      cooperativeName: savedUser.cooperativeName,
      tradeSkill: savedUser.tradeSkill
    };

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userProfile
    });

  } catch (err) {
    res.status(500).json({ message: err.message || 'Server registration error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { identifier, phone, email, password, role } = req.body;
    const loginId = identifier || phone || email;

    if (!loginId || !password) {
      return res.status(400).json({ message: 'Please provide phone number/email and password.' });
    }

    // Find user by phone or email
    const user = await User.findOne({
      $or: [
        { phone: loginId },
        { email: loginId }
      ]
    });

    if (!user) {
      return res.status(400).json({ message: 'Account not found. Please check your details or register.' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password. Please try again.' });
    }

    // If role parameter is passed, allow role matching or override if requested role matches user's role
    const effectiveRole = role || user.role;

    const token = generateToken(user);
    const userProfile = {
      id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role || effectiveRole,
      cooperativeName: user.cooperativeName,
      tradeSkill: user.tradeSkill
    };

    res.json({
      message: 'Logged in successfully',
      token,
      user: userProfile
    });

  } catch (err) {
    res.status(500).json({ message: err.message || 'Server login error' });
  }
});

// GET /api/auth/me (Protected Route)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
