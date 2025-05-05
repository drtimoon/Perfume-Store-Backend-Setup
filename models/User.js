const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' }, // 'admin' or 'user'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);