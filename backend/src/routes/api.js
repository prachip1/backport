const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const Project=require('../models/Project');
const router = express.Router();
const authenticateToken=require('../middlewares/authMiddleware')
// Generate API key
router.post('/generate-api-key', async (req, res) => {
  const { clerkUserId, website } = req.body;

  console.log('Received request:', req.body); // Log the request

  if (!clerkUserId || !website) {
    return res.status(400).json({ error: 'Missing clerkUserId or website' });
  }

  try {
    let user = await User.findOne({ clerkUserId });

    if (!user) {
      user = new User({ clerkUserId });
    }

    // Generate a new API key using crypto.randomUUID()
    const apiKey = crypto.randomUUID();
    user.apiKey = apiKey;
    user.website = website;
    await user.save();
    
    console.log('Generated API key:', apiKey); // Log the generated API key
    res.json({ apiKey });
  } catch (error) {
    console.error('Error generating API key:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get API keys and website for the user
router.get('/your-api-keys', authenticateToken, async (req, res) => {
  try {
    // Extract Clerk user ID from the Authorization header
    const clerkUserId = req.headers.authorization?.split(' ')[1];

    if (!clerkUserId) {
      return res.status(400).json({ message: 'clerkUserId not provided in request' });
    }

    // Find the user by their Clerk ID
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the API key and website
    res.json({
      apiKey: user.apiKey,
      website: user.website
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching API key', error });
  }
});


// Verify API key
router.get('/verify-api-key', async (req, res) => {
  const apiKey = req.header('X-API-Key');
  
  if (!apiKey) {
    return res.status(400).json({ error: 'No API key provided' });
  }

  try {
    const user = await User.findOne({ apiKey });
    if (!user) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    res.json({ valid: true, website: user.website });
  } catch (error) {
    console.error('Error verifying API key:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//adding projects

// Route to add a new project
router.post('/addproject', async (req, res) => {
  const { title, tags, desc, images, projlink, clerkUserId } = req.body;
  //const clerkUserId = req.clerkUserId; // Assuming you have a middleware that sets req.clerkUserId

  try {
    const newProject = new Project({
      title,
      tags,
      desc,
      images,
      projlink,
      clerkUserId  // Save the clerkUserId with the project
    });

    await newProject.save();
    res.status(201).json({ message: 'Project added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add project' });
  }
});



// Route to get projects
router.get('/showprojects', async (req, res) => {
  const { clerkUserId } = req.query; // Get clerkUserId from query params

  try {
    const projects = await Project.find({ clerkUserId }); // Find projects that belong to the user
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});



module.exports = router;
