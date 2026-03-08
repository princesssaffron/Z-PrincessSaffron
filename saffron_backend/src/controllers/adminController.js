import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

// @desc    Get dashboard overview stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});

        // Direct aggregation on Order collection
        const orderStats = await Order.aggregate([
            { $match: { status: { $nin: ["cancelled", "pending"] } } },
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: "$total" },
                },
            },
        ]);

        const totalOrders = orderStats.length > 0 ? orderStats[0].totalOrders : 0;
        const totalRevenue = orderStats.length > 0 ? orderStats[0].totalRevenue : 0;

        // Low stock products (stock < 5)
        const lowStockProducts = await Product.find({ stock: { $lt: 5 } });

        res.json({
            totalUsers,
            totalOrders,
            totalRevenue,
            lowStockCount: lowStockProducts.length,
            lowStockProducts,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get sales report (daily/monthly)
// @route   GET /api/admin/sales-report
// @access  Private/Admin
export const getSalesReport = async (req, res) => {
    try {
        const dailySales = await Order.aggregate([
            { $match: { status: { $nin: ["cancelled", "pending"] } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    revenue: { $sum: "$total" },
                    orders: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
            { $limit: 30 }, // Last 30 days
        ]);

        const monthlySales = await Order.aggregate([
            { $match: { status: { $nin: ["cancelled", "pending"] } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    revenue: { $sum: "$total" },
                    orders: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        res.json({
            daily: dailySales.map(item => ({ date: item._id, revenue: item.revenue, orders: item.orders })),
            monthly: monthlySales.map(item => ({ month: item._id, revenue: item.revenue, orders: item.orders })),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
