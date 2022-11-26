const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name"],
  },
  brandId: {
    type: String,
    required: [true, "Please enter your product price"],
  },
  address: {
    type: String,
  },
  phone: {
    type: Number,
  },
});

module.exports = mongoose.model("Brand", brandSchema);
