//C:\Program Files\MongoDB\Server\8.0\bin
//cd Users/corji/OneDrive - Villanova University/Documents/ServiceSwitch/Profiles 
// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json());  // Parse JSON request body

// MongoDB connection
const connectToDB = require('./db');  // Make sure the MongoDB connection logic is in db.js
connectToDB();

const Profile = mongoose.model('Profile', new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  bio: String,
}));

// Profile creation endpoint
app.post('/create-profile', async (req, res) => {
    const { name, username, email, password, bio } = req.body;
    // Check if a profile with the email already exists
    const existingProfile = await Profile.findOne({email});
    if (existingProfile) {
      return res.status(400).json({ error: 'Profile with email already exists' });
    }
    // Check if a profile with the username already exists
    const existingUsername = await Profile.findOne({username});
    if (existingUsername) {
      return res.status(400).json({ error: 'Profile with username already exists' });
    }
  try {

    // Hash the password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new profile document
    const profile = new Profile({ name, username, email, password: hashedPassword, bio });
    //save Profile to database
    await profile.save();

    res.status(201).json({ message: 'Profile created successfully!' });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error creating profile' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});