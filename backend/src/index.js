require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes=require('./routes/api');
const app = express();

// Middleware
// Add CORS options to allow requests from your frontend
app.use(cors({
  origin: '*', // Allow all origins (for development)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add other methods if needed
  allowedHeaders: ['Content-Type', 'X-API-Key', 'Authorization'], // Include any other headers used in requests
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


  // Routes
app.use('/api', apiRoutes);

// Sample route (no longer protected by Clerk)
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));