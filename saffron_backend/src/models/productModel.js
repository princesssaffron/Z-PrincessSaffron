import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        originalPrice: {
            type: Number,
        },
        rating: {
            type: Number,
            default: 5.0,
        },
        reviews: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
