// server/middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

// Protects routes by verifying the JWT
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Get token from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // 2. Verify token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Attach the user object (excluding the password) to the request
      // We use the userId stored in the token payload to find the user in DB
      req.user = await User.findById(decoded.userId).select("-password");

      // 4. Move on to the next function (the controller)
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401); // Unauthorized
    throw new Error("Not authorized, no token");
  }
});
// Checks if the logged-in user is an administrator
const admin = (req, res, next) => {
  // The req.user object was attached by the protect middleware
  if (req.user && req.user.isAdmin) {
    next(); // User is Admin, continue
  } else {
    res.status(403); // Forbidden
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
