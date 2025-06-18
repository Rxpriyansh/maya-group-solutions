const express = require('express');
const Newsletter = require('../models/Newsletter');
const router = express.Router();

// Subscribe to newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    // Prevent duplicate subscriptions
    const exists = await Newsletter.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already subscribed' });
    const subscription = new Newsletter({ email });
    await subscription.save();
    res.json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
