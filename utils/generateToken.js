// server/utils/generateToken.js
import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // Sign the token with the user's ID and a secret key
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expires in 30 days
  });

  // Set the JWT as an HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure in production
    // In development we allow a more permissive sameSite so cookies are sent from localhost:5173 -> localhost:54321
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days (milliseconds)
  });
};

export default generateToken;
