const express = require('express');
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const router = express.Router();

// Admin check middleware
function adminOnly(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied: Admins only' });
  }
  next();
}

// Get all users
router.get('/users', auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all contacts
router.get('/contacts', auth, adminOnly, async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete all users
router.delete('/users', auth, adminOnly, async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: 'All users deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete all contacts
router.delete('/contacts', auth, adminOnly, async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: 'All contacts deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
