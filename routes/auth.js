const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ error: 'All fields are required' });
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    // Make the first registered user an admin
    const isFirstUser = (await User.countDocuments({})) === 0;
    user = new User({ firstName, lastName, email, password: hashedPassword, isAdmin: isFirstUser });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '2d' });
    res.json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
