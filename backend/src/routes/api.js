const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const Project=require('../models/Project');
const Tool=require('../models/Tool');
const Slider=require('../models/Slider');

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
  const { title, tags, desc, images, projlink, githublink, clerkUserId } = req.body;
  //const clerkUserId = req.clerkUserId; // Assuming you have a middleware that sets req.clerkUserId

  try {
    const newProject = new Project({
      title,
      tags,
      desc,
      images,
      projlink,
      githublink,
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
    const projects = await Project.find(); // Find projects that belong to the user
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});


// Route to add a new tools
router.post('/addtool', async (req, res) => {
  const { tools } = req.body; // Array of tools

  try {
    const addedTools = await Tool.insertMany(tools);
    res.status(200).json({ success: true, addedTools });
  } catch (error) {
    console.error('Error saving tools:', error);
    res.status(500).json({ success: false, message: 'Error adding tools' });
  }
});


router.get('/gettools', async (req, res) => {
  const { clerkUserId } = req.query; // Get clerkUserId from query parameter

  try {
    const tools = await Tool.find(); // Fetch tools for this user
    res.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    res.status(500).json({ message: 'Failed to fetch tools.' });
  }
});




router.delete('/deletetool', async (req, res) => {
  const { toolId } = req.body; // Get tool ID from the request body

  try {
    // Find and delete the tool by ID
    const deletedTool = await Tool.findByIdAndDelete(toolId);

    if (!deletedTool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    res.status(200).json({ message: 'Tool deleted successfully' });
  } catch (error) {
    console.error('Error deleting tool:', error);
    res.status(500).json({ message: 'Error deleting tool' });
  }
});


// Delete project by ID
router.delete('/deleteproject', async (req, res) => {
  const { projectId } = req.body; // Get project ID from the request body

  try {
    // Find and delete the project by ID
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project' });
  }
});
// Route to get a single project by ID
router.get('/showprojects/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId); // Fetch project by ID
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//update project

router.put('/showprojects/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const updatedData = req.body;

    const project = await Project.findByIdAndUpdate(projectId, updatedData, {
      new: true, // Return the updated project
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//route to add slider image

router.post('/addsliderimage', async (req, res) => {
  const { title, image, clerkUserId } = req.body;

  try {
    const newSlide = new Slider({
      title,
      image,
      clerkUserId
    });

    await newSlide.save();
    res.status(201).json({ success: true, message: 'Slider image added successfully', slider: newSlide });
  } catch (err) {
    console.error('Error saving slider image:', err);
    res.status(500).json({ success: false, error: 'Failed to add slider image' });
  }
});



//route to get slider images
// Get all slider images (no user filtering needed)
router.get('/getsliderimage', async (req, res) => {
  try {
    const sliderImages = await Slider.find(); // Get all sliders
    res.status(200).json({ 
      success: true, 
      sliders: sliderImages 
    });
  } catch (error) {
    console.error('Error fetching slider images:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch slider images.' 
    });
  }
});



//route to delete slider image

// Delete a slider image by ID (with user validation)
router.delete('/deletesliderimage', async (req, res) => {
  const { sliderId, clerkUserId } = req.body; // Require both sliderId and clerkUserId

  if (!sliderId || !clerkUserId) {
    return res.status(400).json({ 
      success: false, 
      error: 'Both sliderId and clerkUserId are required.' 
    });
  }

  try {
    // Find and delete only if the slider belongs to the user
    const deletedSlider = await Slider.findOneAndDelete({ 
      _id: sliderId, 
      clerkUserId: clerkUserId 
    });

    if (!deletedSlider) {
      return res.status(404).json({ 
        success: false, 
        error: 'Slider not found or unauthorized.' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Slider deleted successfully.' 
    });
  } catch (error) {
    console.error('Error deleting slider:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete slider.' 
    });
  }
});


module.exports = router;
