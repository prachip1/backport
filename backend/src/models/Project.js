const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of image URLs or paths
    required: true,
  },
  projlink: {
    type: String,
    required: true,
  },
  githublink:{
    type: String,
  },
  clerkUserId: {  // Add this field to link projects to a Clerk user
    type: String
   
  }
});

module.exports = mongoose.model('Project', projectSchema);
