const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// Register
// Example: backend routes/auth.js or authentication.js
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // ✅ Make sure this does NOT block consumers:
    if (!['farmer', 'consumer'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

     // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        error: 'User already registered'
      });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role });
    await user.save();
        res.status(201).json({
      message: 'User registered successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Server error'
    });
  }
});




// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

//forgot password
router.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'FarmCart Password Reset OTP',
      text: `Your OTP is ${otp}`
    });

    res.json({
      message: 'OTP sent successfully'
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: 'Server error'
    });
  }
});

// forgot password 
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      user.otp !== otp ||
      user.otpExpiry < Date.now()
    ) {
      return res.status(400).json({
        error: 'Invalid OTP'
      });
    }

    res.json({
      message: 'OTP verified'
    });

  } catch (err) {
    res.status(500).json({
      error: 'Server error'
    });
  }
});

module.exports = router;
