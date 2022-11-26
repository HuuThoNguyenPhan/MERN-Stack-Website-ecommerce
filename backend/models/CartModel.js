const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name"],
  },
  price: {
    type: Number,
    required: [true, "Please enter your product price"],
  },
  image: {
    type: String,
    required: [true, "Please enter your product image"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter your product quantity"],
  },
  userId: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  product: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter your product stock"],
  }
});

module.exports = mongoose.model("Cart", cartSchema);
