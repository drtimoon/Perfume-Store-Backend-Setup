const express = require('express');
const router = express.Router();
const Perfume = require('../models/Perfume');

// Get all perfumes
router.get('/', async (req, res) => {
  const perfumes = await Perfume.find();
  res.json(perfumes);
});

// Add a new perfume
router.post('/', async (req, res) => {
  try {
    const newPerfume = new Perfume(req.body);
    await newPerfume.save();
    res.status(201).json(newPerfume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
