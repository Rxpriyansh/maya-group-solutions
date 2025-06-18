const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ error: 'Name, email, and message are required' });
    const contact = new Contact({ name, email, phone, service, message });
    await contact.save();
    res.json({ message: 'Contact form submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
