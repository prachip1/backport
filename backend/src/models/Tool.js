const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  toolname: String,
  clerkUserId: String,
});

module.exports = mongoose.model('Tool', toolSchema);
