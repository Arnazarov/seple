import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

// @desc    Fetch all users
// @route   GET /api/users
// @access  Public
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create(req.body);

    if (user) {
      res.status(201).json(user);
    } else {
      res.status(400).json('Invalid user data');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    const matchPassword = await bcrypt.compare(password, userExists.password);

    if (userExists && matchPassword) {
      res.status(200).json({
        name: userExists.name,
        email: userExists.email,
        isAdmin: userExists.isAdmin,
        followers: userExists.followers,
        following: userExists.following,
      });
    } else {
      res.status(400).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch a user by id
// @route   GET /api/users?username?userID
// @access  Public

export const getUserById = async (req, res) => {
  try {
    const { username, userID } = req.query;

    const user = username
      ? await User.findOne({ name: username }).select('-password')
      : userID
      ? await User.findById(userID).select('-password')
      : null;

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private

export const updateUserById = async (req, res) => {
  try {
    const {
      params: { id },
      body: { userID },
    } = req;

    const user = await User.findById(id);

    if (user && userID === String(user._id)) {
      // copies all enumerable own properties from req.body to user
      const newUser = Object.assign(user, req.body);
      delete newUser.userID;

      const updatedUser = await newUser.save();
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a user by id
// @route   /api/users/:id
// @access  Private

export const deleteUserById = async (req, res) => {
  try {
    const {
      params: { id },
      body: { userID },
    } = req;

    const userExists = await User.findById(id);

    if (userExists && userID === userExists._id) {
      await userExists.remove();
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Follow a user
// @route   PUT /api/users/:id/follow
// @access  Private

export const followUser = async (req, res) => {
  try {
    const {
      params: { id },
      body: { userID },
    } = req;

    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(userID);

    // Check whether user wants to follow other than him/herself (currentUser)
    if (userID === id) {
      return res.status(403).json({ message: 'You cannot follow yourself!' });
    }

    // Check whether user he/she (currentUser) wants to follow exists
    if (userToFollow) {
      if (!userToFollow.followers.includes(userID)) {
        await userToFollow.updateOne({ $push: { followers: userID } });
        await currentUser.updateOne({ $push: { following: id } });
        res
          .status(200)
          .json({ message: 'You successfully followed this user!' });
      } else {
        res
          .status(403)
          .json({ message: 'You are already following this user!' });
      }
    } else {
      res
        .status(404)
        .json({ message: 'User you are trying to follow is not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Unfollow a user
// @route   PUT /api/users/:id/unfollow
// @access  Private

export const unfollowUser = async (req, res) => {
  try {
    const {
      params: { id },
      body: { userID },
    } = req;

    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(userID);

    // Check whether user wants to follow other than him/herself (currentUser)
    if (userID === id) {
      return res.status(403).json({ message: 'You cannot unfollow yourself!' });
    }

    // Check whether user he/she (currentUser) wants to follow exists
    if (userToFollow) {
      if (userToFollow.followers.includes(userID)) {
        await userToFollow.updateOne({ $pull: { followers: userID } });
        await currentUser.updateOne({ $pull: { following: id } });
        res
          .status(200)
          .json({ message: 'You have unsubscribed from the user!!' });
      } else {
        res.status(403).json({ message: 'You are not following this user!' });
      }
    } else {
      res.status(404).json({
        message: 'You are trying to unsubscribe from a non-existent user!',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
