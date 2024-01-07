const User = require('../models/userModel');


exports.getUser = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.lookupById(userId);

        return res.status(200).json({ user: user});

    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
}