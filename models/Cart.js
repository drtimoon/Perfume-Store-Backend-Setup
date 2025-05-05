const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    perfumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Perfume' },
    quantity: Number
  }]
});

module.exports = mongoose.model('Cart', cartSchema);