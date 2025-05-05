const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.post('/add', async (req, res) => {
  const { userId, perfumeId, quantity } = req.body;
  
  let cart = await Cart.findOne({ userId });
  if (!cart) cart = new Cart({ userId, items: [] });
  
  cart.items.push({ perfumeId, quantity });
  await cart.save();
  
  res.send(cart);
});

module.exports = router;
