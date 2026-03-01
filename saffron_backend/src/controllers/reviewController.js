import Review from "../models/reviewModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
    const { product_id, rating, review_text, location } = req.body;
    const userId = req.user._id;

    try {
        // 1. Check if user has purchased the product
        const user = await User.findById(userId);
        const hasPurchased = user.orders.some(order =>
            (order.status === "paid" || order.status === "shipped" || order.status === "delivered") &&
            order.items.some(item => item.product_id === product_id)
        );

        if (!hasPurchased) {
            return res.status(403).json({ message: "You can only review products you have purchased" });
        }

        // 2. Check for existing review (Unique index also handles this, but we provide a nice message)
        const alreadyReviewed = await Review.findOne({ user: userId, product_id });
        if (alreadyReviewed) {
            return res.status(400).json({ message: "You have already reviewed this product" });
        }

        // 3. Create the review
        const review = await Review.create({
            user: userId,
            product_id,
            rating,
            review_text,
            location,
        });

        if (review) {
            // 4. Update Product average rating and count
            const reviews = await Review.find({ product_id, published: true });
            const reviewCount = reviews.length;
            const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviewCount;

            await Product.findOneAndUpdate(
                { id: product_id },
                {
                    rating: parseFloat(avgRating.toFixed(1)),
                    reviews: reviewCount
                }
            );

            res.status(201).json(review);
        } else {
            res.status(400).json({ message: "Invalid review data" });
        }
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "You have already reviewed this product" });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all reviews or reviews for a product
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req, res) => {
    const { product_id } = req.query;
    try {
        const filter = { published: true };
        if (product_id) filter.product_id = product_id;

        const reviews = await Review.find(filter)
            .populate("user", "fullName avatar_url")
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
