// server/routes/orderRoutes.js

import express from "express";
const router = express.Router();
import { addOrderItems, getOrderById } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

// Route for creating a new order
router.route("/").post(protect, addOrderItems);

// Route for fetching an order by ID (must be protected)
router.route("/:id").get(protect, getOrderById);

export default router;
