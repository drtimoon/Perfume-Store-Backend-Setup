const mongoose = require('mongoose');

const perfumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String
});

module.exports = mongoose.model('Perfume', perfumeSchema);
