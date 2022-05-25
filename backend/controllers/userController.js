import User from "../models/userModel.js";

// @desc    Fetch all user
// @route   GET /api/users
// @access  Public
export const getAllUsers = (req, res) => {
    res.send({message: 'All Users'});
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