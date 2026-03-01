import express from "express";
import { getDashboardStats, getSalesReport } from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, admin, getDashboardStats);
router.get("/sales-report", protect, admin, getSalesReport);

export default router;
