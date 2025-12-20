// server/routes/uploadRoutes.js

import express from "express";
const router = express.Router();
import { uploadImage } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js"; // To restrict uploads to logged-in users

// Upload route: must be protected by the JWT middleware
router.post("/", protect, uploadImage);

export default router;
