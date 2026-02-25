import Review from "../models/reviewModel.js";

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public
export const createReview = async (req, res) => {
    const { reviewer_name, rating, review_text, location } = req.body;

    try {
        const review = await Review.create({
            reviewer_name,
            rating,
            review_text,
            location,
        });

        if (review) {
            res.status(201).json(review);
        } else {
            res.status(400).json({ message: "Invalid review data" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ published: true }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
