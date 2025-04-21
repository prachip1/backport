const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
title:{
    type: String,
    required: true,
  
},
  image: {
    type: String, // Array of image URLs or paths
    required: true,
  },
  clerkUserId: {  // Add this field to link sliders to a Clerk user
    type: String
  }
});

module.exports = mongoose.model('Slider', sliderSchema);
// const mongoose = require('mongoose');