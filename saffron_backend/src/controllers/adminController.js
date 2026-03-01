import User from "../models/userModel.js";
import Product from "../models/productModel.js";

// @desc    Get dashboard overview stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});

        // Aggregate orders and revenue from nested user orders (filtering out cancelled/pending)
        const orderStats = await User.aggregate([
            { $unwind: "$orders" },
            { $match: { "orders.status": { $nin: ["cancelled", "pending"] } } },
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: "$orders.total" },
                },
            },
        ]);

        const totalOrders = orderStats.length > 0 ? orderStats[0].totalOrders : 0;
        const totalRevenue = orderStats.length > 0 ? orderStats[0].totalRevenue : 0;

        // Low stock products (stock < 5)
        const lowStockProducts = await Product.find({ stock: { $lt: 5 } }).select("name stock id image");

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
        const dailySales = await User.aggregate([
            { $unwind: "$orders" },
            { $match: { "orders.status": { $nin: ["cancelled", "pending"] } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$orders.createdAt" } },
                    revenue: { $sum: "$orders.total" },
                    orders: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
            { $limit: 30 }, // Last 30 days
        ]);

        const monthlySales = await User.aggregate([
            { $unwind: "$orders" },
            { $match: { "orders.status": { $nin: ["cancelled", "pending"] } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$orders.createdAt" } },
                    revenue: { $sum: "$orders.total" },
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
