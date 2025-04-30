const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const { name, email, googleId } = req.body;

    // Check if user already exists with this googleId
    let user = await User.findOne({ googleId: googleId });

    if (user) {
      // User found, return existing user
      return res.status(200).json(user);
    } else {
      // User not found, create a new one
      user = new User({ name, email, googleId });
      await user.save();
      // Return the newly created user
      return res.status(201).json(user);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in createUser:", error);
    // Return a generic error message
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
