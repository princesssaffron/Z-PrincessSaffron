import Product from "../models/productModel.js";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Admin (to be protected later)
export const createProduct = async (req, res) => {
    try {
        const { id, name, price, originalPrice, rating, reviews, image, tag, category, description } = req.body;

        const productExists = await Product.findOne({ id });
        if (productExists) {
            return res.status(400).json({ message: "Product with this ID already exists" });
        }

        const product = await Product.create({
            id,
            name,
            price,
            originalPrice,
            rating,
            reviews,
            image,
            tag,
            category,
            description,
        });

        if (product) {
            res.status(201).json(product);
        } else {
            res.status(400).json({ message: "Invalid product data" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
