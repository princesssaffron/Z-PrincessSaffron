import User from "../models/userModel.js";

// @desc    Get liked products
// @route   GET /api/users/liked
// @access  Private
export const getLikedProducts = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json(user.likedProducts.map(id => ({ product_id: id })));
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

// @desc    Toggle like for a product
// @route   POST /api/users/liked
// @access  Private
export const toggleLikeProduct = async (req, res) => {
    const { product_id } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
        const isLiked = user.likedProducts.includes(product_id);

        if (isLiked) {
            user.likedProducts = user.likedProducts.filter(id => id !== product_id);
            await user.save();
            res.json({ message: "Product removed from wishlist", liked: false });
        } else {
            user.likedProducts.push(product_id);
            await user.save();
            res.json({ message: "Product added to wishlist", liked: true });
        }
    } else {
        res.status(404).json({ message: "User not found" });
    }
};
