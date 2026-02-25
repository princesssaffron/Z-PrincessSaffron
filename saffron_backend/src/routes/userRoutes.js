import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { getLikedProducts, toggleLikeProduct } from "../controllers/likedController.js";
import { getOrders, createOrder, cancelOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profiles, likes, and orders management
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

/**
 * @swagger
 * /api/users/liked:
 *   get:
 *     summary: Get liked products
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of liked products
 *   post:
 *     summary: Toggle like on product
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Like toggled
 */
router.route("/liked").get(protect, getLikedProducts).post(protect, toggleLikeProduct);

/**
 * @swagger
 * /api/users/orders:
 *   get:
 *     summary: Get user orders
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *   post:
 *     summary: Create new order
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *               totalPrice:
 *                 type: number
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created
 */
router.route("/orders").get(protect, getOrders).post(protect, createOrder);

/**
 * @swagger
 * /api/users/orders/{orderId}/cancel:
 *   put:
 *     summary: Cancel order
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled
 */
router.route("/orders/:orderId/cancel").put(protect, cancelOrder);

export default router;
