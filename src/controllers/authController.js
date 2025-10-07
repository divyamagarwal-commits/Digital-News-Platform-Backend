import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, findUserByEmail } from '../models/user.js';

dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, interests } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const existing = findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = createUser({ name, email, passwordHash, phone, interests });

    const token = generateToken(newUser);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: newUser.id,
      token
    });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = findUserByEmail(email);
    if (!user) return res.status(400).json({ success: false, message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid email or password' });

    const token = generateToken(user);
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isPremium: user.subscription_status === 'premium'
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const socialLogin = async (req, res) => {
  try {
    const { provider, token } = req.body;
    // Normally verify with Google/Facebook/etc.
    res.json({
      success: true,
      message: `Social login with ${provider} successful`,
      token: 'mock_social_jwt_token'
    });
  } catch (err) {
    console.error('Social Login Error:', err);
    res.status(500).json({ success: false, message: 'Social login failed' });
  }
};
