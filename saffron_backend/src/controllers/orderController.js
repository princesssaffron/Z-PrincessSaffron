import User from "../models/userModel.js";

// @desc    Get user orders
// @route   GET /api/users/orders
// @access  Private
export const getOrders = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json(user.orders);
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

// @desc    Create new order
// @route   POST /api/users/orders
// @access  Private
export const createOrder = async (req, res) => {
    const { checkoutData } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
        const newOrder = {
            orderId: Math.random().toString(36).substring(2, 11).toUpperCase(),
            subtotal: checkoutData.subtotal,
            discount: checkoutData.discount,
            shipping: checkoutData.shipping,
            total: checkoutData.total,
            status: "pending",
            items: checkoutData.items,
            shippingDetails: checkoutData.shippingDetails,
            paymentMethod: checkoutData.paymentMethod,
            createdAt: new Date(),
        };

        user.orders.push(newOrder);
        await user.save();
        res.status(201).json(newOrder);
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

// @desc    Cancel order
// @route   PUT /api/users/orders/:orderId/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const orderIndex = user.orders.findIndex(
            (order) => order.orderId === req.params.orderId
        );

        if (orderIndex > -1) {
            user.orders[orderIndex].status = "cancelled";
            await user.save();
            res.json(user.orders[orderIndex]);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } else {
        res.status(404).json({ message: "User not found" });
    }
};
