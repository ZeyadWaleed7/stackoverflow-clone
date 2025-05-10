const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const { name, email, googleId, image, bio } = req.body;

    // Validate input
    if (!name || !email || !googleId) {
      return res.status(400).json({ error: 'Name, email, and googleId are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { googleId: googleId }
      ]
    });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    // Create new user with all fields
    const user = new User({
      name,
      email: email.toLowerCase(),
      googleId,
      image,
      bio,
      reputation: 0,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error in createUser:", error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'User with this email or Google ID already exists' });
    }
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, bio, image } = req.body;
    const updates = {};

    // Validate updates
    if (name) {
      if (name.length < 2) {
        return res.status(400).json({ error: 'Name must be at least 2 characters long' });
      }
      updates.name = name;
    }

    if (email) {
      updates.email = email.toLowerCase();
    }

    if (bio !== undefined) {
      updates.bio = bio;
    }

    if (image !== undefined) {
      updates.image = image;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in updateUser:", error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    res.status(500).json({ error: 'Failed to update user' });
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
    console.error("Error in deleteUser:", error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      userId: user._id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
