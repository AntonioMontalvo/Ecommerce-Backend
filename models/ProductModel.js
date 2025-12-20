// server/models/ProductModel.js

import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    // 1. Primary Fields
    name: {
      type: String,
      required: [true, "Please enter a product name"], // Validation check
      trim: true, // Removes whitespace from both ends
    },
    description: {
      type: String,
      required: [true, "Please enter a product description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter a product price"],
      default: 0,
    },

    // 2. Inventory and Classification
    image: {
      type: String, // Will store the URL from Cloudinary
      required: true,
      default: "/images/sample.jpg", // A fallback default image
    },
    category: {
      type: String,
      required: false,
    },
    countInStock: {
      type: Number,
      required: [true, "Please enter product stock count"],
      default: 0,
    },

    // 3. Optional Features (for future growth/mid-level demonstration)
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields to track changes
    timestamps: true,
  }
);

// 4. Export the Model
// The model name 'Product' will correspond to the 'products' collection in MongoDB
const Product = mongoose.model("Product", productSchema);

export default Product;
