import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// @desc    Get user orders
// @route   GET /api/users/orders
// @access  Private
export const getOrders = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json(user.orders);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new order with stock orchestration
// @route   POST /api/users/orders
// @access  Private
export const createOrder = async (req, res) => {
    try {
        const { checkoutData } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 1. Validate items against stock (Check stock again!)
        for (const item of checkoutData.items) {
            const product = await Product.findOne({ id: item.product_id });
            if (!product) {
                return res.status(404).json({ message: `Product ${item.product_name} not found` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
                });
            }
        }

        // 2. Reduce stock (Atomic update would be better, but we'll do sequential for now as per simple logic)
        for (const item of checkoutData.items) {
            const product = await Product.findOne({ id: item.product_id });
            product.stock -= item.quantity;
            await product.save(); // Model hook handles "Out of Stock" tag
        }

        // 3. Create order record
        const newOrder = {
            orderId: Math.random().toString(36).substring(2, 11).toUpperCase(),
            subtotal: checkoutData.subtotal,
            discount: checkoutData.discount,
            shipping: checkoutData.shipping,
            total: checkoutData.total,
            status: checkoutData.paymentMethod === "cod" ? "pending" : "paid",
            items: checkoutData.items,
            shippingDetails: checkoutData.shippingDetails,
            paymentMethod: checkoutData.paymentMethod,
            createdAt: new Date(),
        };

        user.orders.push(newOrder);
        await user.save();

        // 4. Clear user cart
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.items = [];
            await cart.save();
        }

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Cancel order and restore stock
// @route   PUT /api/users/orders/:orderId/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const requestedId = String(req.params.orderId).trim();

        const orderIndex = user.orders.findIndex((o) => {
            const currentOrderId = String(o.orderId || "").trim();
            return currentOrderId === requestedId;
        });

        if (orderIndex === -1) {
            return res.status(404).json({ message: "Order not found" });
        }

        const order = user.orders[orderIndex];

        if (order.status === "cancelled") {
            return res.status(400).json({ message: "Order is already cancelled" });
        }

        // Restore stock
        for (const item of order.items) {
            if (item.product_id) {
                const product = await Product.findOne({ id: item.product_id });
                if (product) {
                    product.stock += (Number(item.quantity) || 0);
                    await product.save();
                }
            }
        }

        order.status = "cancelled";
        user.markModified('orders');
        await user.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
