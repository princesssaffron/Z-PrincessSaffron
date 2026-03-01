import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        product_id: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        review_text: {
            type: String,
            required: true,
        },
        location: {
            type: String,
        },
        published: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Ensure one review per user per product
reviewSchema.index({ user: 1, product_id: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
