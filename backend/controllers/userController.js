

// @desc    Fetch all user
// @route   GET /api/users
// @access  Public

export const getAllUsers = (req, res) => {
    res.send({message: 'All Users'});
}