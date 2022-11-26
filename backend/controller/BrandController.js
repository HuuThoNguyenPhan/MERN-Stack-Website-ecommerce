const Brand = require("../models/BrandModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

// Get Brand Product
exports.getAllBrands = catchAsyncErrors(async (req, res, next) => {
  const brands = await Brand.find();
  res.status(200).json({
    success: true,
    brands,
  });
});
