import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        reviewer_name: {
            type: String,
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

const Review = mongoose.model("Review", reviewSchema);
export default Review;
