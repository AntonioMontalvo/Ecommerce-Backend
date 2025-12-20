// server/routes/userRoutes.js

import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
} from "../controllers/userController.js";

// Register User route (POST /api/users)
router.route("/").post(registerUser);

// Login route (POST /api/users/login)
router.post("/login", authUser);

// Logout route (POST /api/users/logout)
router.post("/logout", logoutUser);

export default router;
