import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

// @desc    Fetch all users
// @route   GET /api/users
// @access  Public
export const getAllUsers = async (req, res) => {
    try {
        
        const users = await User.find().select("-password");
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


// @desc    Register a user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res) => {
    try {

        const {name, email, password } = req.body;

        const userExists = await User.findOne({email});

        if (userExists) {
            return res.status(400).json({message: 'User already exists'});
        }

        const user = await User.create({
            name,
            password,
            email,
        });
    
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(400).json('Invalid user data')
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const userExists = await User.findOne({email});
        const matchPassword = await bcrypt.compare(password, userExists.password)
        
        if (userExists && matchPassword) {
            res.status(200).json({
                name: userExists.name,
                email: userExists.email,
                isAdmin: userExists.isAdmin,
                followers: userExists.followers,
                following: userExists.following
            })
        } else {
            res.status(400).json({message: 'Invalid username or password'});
        }


    } catch (error) {
        res.status(500).json({message: error.message});
    }
}