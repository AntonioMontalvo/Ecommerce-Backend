// server/controllers/cartController.js

import asyncHandler from "express-async-handler";
import Cart from "../models/CartModel.js";

// @desc    Get the logged-in user's cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    res.json(cart);
  } else {
    // No cart yet — return an empty one (don't save it to DB yet)
    res.json({ items: [] });
  }
});

// @desc    Save (overwrite) the logged-in user's cart
// @route   PUT /api/cart
// @access  Private
const saveCart = asyncHandler(async (req, res) => {
  const { items } = req.body;

  // findOneAndUpdate with upsert:true → creates the doc if it doesn't exist yet,
  // updates it if it does. { new: true } returns the updated document.
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { items },
    { new: true, upsert: true },
  );

  res.json(cart);
});

// @desc    Clear the logged-in user's cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.json({ message: "Cart cleared" });
});

export { getCart, saveCart, clearCart };
