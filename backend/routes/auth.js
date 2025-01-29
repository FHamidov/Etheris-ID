const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, phone, password, full_name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or phone already exists',
        mesaj: 'Bu e-posta veya telefon numarası ile kayıtlı kullanıcı mevcut',
        mesaj_az: 'Bu email və ya telefon nömrəsi ilə istifadəçi artıq mövcuddur'
      });
    }

    // Create new user
    const user = new User({
      email,
      phone,
      password_hash: password,
      full_name
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      mesaj: 'Kullanıcı başarıyla kaydedildi',
      mesaj_az: 'İstifadəçi uğurla qeydiyyatdan keçdi',
      token,
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      message: 'Registration failed',
      mesaj: 'Kayıt işlemi başarısız',
      mesaj_az: 'Qeydiyyat uğursuz oldu'
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
        mesaj: 'Geçersiz e-posta veya şifre',
        mesaj_az: 'Yanlış email və ya şifrə'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
        mesaj: 'Geçersiz e-posta veya şifre',
        mesaj_az: 'Yanlış email və ya şifrə'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      mesaj: 'Giriş başarılı',
      mesaj_az: 'Giriş uğurlu oldu',
      token,
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Login failed',
      mesaj: 'Giriş başarısız',
      mesaj_az: 'Giriş uğursuz oldu'
    });
  }
});

module.exports = router; 