// server/controllers/uploadController.js

import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  // Check if file was sent
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400);
    throw new Error("No files were uploaded.");
  }

  const file = req.files.image; // 'image' is the name we'll use in the front-end form
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "mern-ecomm-products", // Creates a folder in your Cloudinary account
  });

  // Delete the temporary file created by express-fileupload
  // (Not strictly necessary but good practice to clean up /tmp/)
  // fs.unlinkSync(file.tempFilePath);

  // Return the secure URL and public ID
  res.json({
    imageUrl: result.secure_url,
    publicId: result.public_id,
  });
});

export { uploadImage };
