// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_super';

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    // Cek apakah user sudah ada
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah digunakan.' });
    }

    // Buat dan simpan user baru (password akan di-hash otomatis oleh pre save hook)
    const newUser = new User({ nama, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Registrasi berhasil!' });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan.' });

    console.log('Password yang dimasukkan:', password);
    console.log('Password yang tersimpan di database:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Perbandingan password result:', isMatch);
    if (!isMatch) return res.status(400).json({ message: 'Password salah.' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login berhasil!',
      token,
      user: { nama: user.nama, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout berhasil.' });
});

module.exports = router;
