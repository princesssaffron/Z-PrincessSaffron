import User from "../models/userModel.js";

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            isAdmin: user.isAdmin,
            avatar_url: user.avatar_url,
            phone: user.phone,
            alternate_phone: user.alternate_phone,
            shipping_address: user.shipping_address,
            shipping_area: user.shipping_area,
            shipping_city: user.shipping_city,
            shipping_state: user.shipping_state,
            shipping_pincode: user.shipping_pincode,
            shipping_country: user.shipping_country,
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.fullName = req.body.fullName || user.fullName;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        user.avatar_url = req.body.avatar_url || user.avatar_url;
        user.phone = req.body.phone || user.phone;
        user.alternate_phone = req.body.alternate_phone || user.alternate_phone;
        user.shipping_address = req.body.shipping_address || user.shipping_address;
        user.shipping_area = req.body.shipping_area || user.shipping_area;
        user.shipping_city = req.body.shipping_city || user.shipping_city;
        user.shipping_state = req.body.shipping_state || user.shipping_state;
        user.shipping_pincode = req.body.shipping_pincode || user.shipping_pincode;
        user.shipping_country = req.body.shipping_country || user.shipping_country;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            avatar_url: updatedUser.avatar_url,
            phone: updatedUser.phone,
            alternate_phone: updatedUser.alternate_phone,
            shipping_address: updatedUser.shipping_address,
            shipping_area: updatedUser.shipping_area,
            shipping_city: updatedUser.shipping_city,
            shipping_state: updatedUser.shipping_state,
            shipping_pincode: updatedUser.shipping_pincode,
            shipping_country: updatedUser.shipping_country,
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
};
