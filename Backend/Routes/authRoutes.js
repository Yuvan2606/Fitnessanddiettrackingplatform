const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = "super_secret_key";

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash });
    await user.save();

    res.json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ msg: "Invalid password" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user });
});

module.exports = router;
