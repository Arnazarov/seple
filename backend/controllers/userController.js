

// @desc    Fetch all user
// @route   GET /api/users
// @access  Public

export const getAllUsers = (req, res) => {
    res.send({message: 'All Users'});
}


// @desc    Register a user
// @route   POST /api/users
// @access  Public

export const registerUser = (req, res) => {
    res.send({message: 'User Registered'});
}