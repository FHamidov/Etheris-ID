const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { device_id, full_name, password, profile_picture, phone_number } = req.body;

    // Check if device_id already exists
    const existingUser = await User.findOne({ device_id });
    if (existingUser) {
      return res.status(400).json({
        message: 'Device ID already registered',
        status: 'error'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      device_id,
      full_name,
      password_hash,
      profile_picture,
      phone_number
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, device_id: user.device_id },
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      status: 'success',
      token,
      user: {
        device_id: user.device_id,
        full_name: user.full_name,
        profile_picture: user.profile_picture,
        verified: user.verified,
        created_at: user.created_at
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      message: 'Registration failed',
      status: 'error',
      error: error.message
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { device_id, password } = req.body;

    // Find user by device_id
    const user = await User.findOne({ device_id });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid device ID or password',
        status: 'error'
      });
    }

    // Verify password using bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Invalid device ID or password',
        status: 'error'
      });
    }

    // Update last login
    user.last_login = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, device_id: user.device_id },
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Login successful',
      status: 'success',
      token,
      user: {
        device_id: user.device_id,
        full_name: user.full_name,
        profile_picture: user.profile_picture,
        verified: user.verified,
        last_login: user.last_login
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Login failed',
      status: 'error',
      error: error.message
    });
  }
});

module.exports = router; 