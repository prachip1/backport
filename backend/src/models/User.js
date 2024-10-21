// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkUserId: String,
  apiKey: String,
  website: String
});

module.exports = mongoose.model('User', userSchema);