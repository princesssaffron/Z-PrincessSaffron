import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { getLikedProducts, toggleLikeProduct } from "../controllers/likedController.js";
import { getOrders, createOrder, cancelOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.route("/liked").get(protect, getLikedProducts).post(protect, toggleLikeProduct);
router.route("/orders").get(protect, getOrders).post(protect, createOrder);
router.route("/orders/:orderId/cancel").put(protect, cancelOrder);

export default router;
