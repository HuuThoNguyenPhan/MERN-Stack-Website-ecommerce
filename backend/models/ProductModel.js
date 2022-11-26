const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name of a product"],
    trim: true,
    maxLength: [50, "Tên gồm 50 ký tự"],
  },
  description: {
    type: String,
    required: [true, "Please add a description of your product"],
    maxlength: [4000, "Description is can not exceed than 4000 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please add a price for your product"],
    maxLength: [7, "Giá không được nhập lớn hơn 7 ký tự"],
  },
  offerPrice: {
    type: Number,
    maxLength: [7, "Giá không được nhập lớn hơn 7 ký tự"],
    default: 0,
  },
  color: {
    type: String,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  Stock: {
    type: Number,
    required: [true, "Please add some stoke for your product"],
    maxLength: [3, "Stock can not exceed than 3 characters"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    //   required: true
  },
  catId: {
    type: String,
    required: [true, "Please add a category of your product"],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
