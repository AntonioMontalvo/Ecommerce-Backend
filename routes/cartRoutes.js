// server/routes/cartRoutes.js

import express from "express";
const router = express.Router();
import { getCart, saveCart, clearCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, getCart) // GET  /api/cart  → fetch cart
  .put(protect, saveCart) // PUT  /api/cart  → save/overwrite cart
  .delete(protect, clearCart); // DELETE /api/cart → clear cart

export default router;
