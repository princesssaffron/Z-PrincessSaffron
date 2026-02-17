import Cart from "../models/cartModel.js";

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        res.json(cart.items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add item to cart or update quantity
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [{ product_id, quantity }],
            });
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.product_id === product_id
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product_id, quantity });
            }
            await cart.save();
        }

        res.status(201).json(cart.items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update item quantity
// @route   PUT /api/cart/:productId
// @access  Private
export const updateCartItem = async (req, res) => {
    const { quantity } = req.body;
    const product_id = parseInt(req.params.productId);

    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            const itemIndex = cart.items.findIndex(
                (item) => item.product_id === product_id
            );

            if (itemIndex > -1) {
                if (quantity <= 0) {
                    cart.items.splice(itemIndex, 1);
                } else {
                    cart.items[itemIndex].quantity = quantity;
                }
                await cart.save();
                res.json(cart.items);
            } else {
                res.status(404).json({ message: "Item not found in cart" });
            }
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = async (req, res) => {
    const product_id = parseInt(req.params.productId);

    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            cart.items = cart.items.filter((item) => item.product_id !== product_id);
            await cart.save();
            res.json(cart.items);
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            cart.items = [];
            await cart.save();
            res.json({ message: "Cart cleared" });
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
