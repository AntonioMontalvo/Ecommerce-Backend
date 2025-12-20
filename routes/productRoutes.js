// server/routes/productRoutes.js
// server/routes/productRoutes.js (Updated)

import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct, // <-- NEW IMPORTS
} from "../controllers/productController.js";

// Route for ALL products (GET, POST)
router.route("/").get(getProducts).post(protect, createProduct); // middleware to protect the route injected

// Route for a SINGLE product (GET, PUT, DELETE)
router
  .route("/:id")
  .get(getProductById)
  .put(protect, updateProduct) // <-- ADDED PUT ROUTE
  // 🛑 Admin Restriction: Must be logged in (protect) AND an admin (admin)
  .delete(protect, admin, deleteProduct); // <-- ADDED DELETE ROUTE

export default router;
