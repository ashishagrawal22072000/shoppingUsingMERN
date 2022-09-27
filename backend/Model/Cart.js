const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  totalCharge: {
    type: Number,
    default: 0,
  },
  items: [
    {
      itemID: String,
      itemImg: String,
      itemPrice: Number,
      itemStock: Number,
      itemTitle: String,
      itemQty: Number,
      itemCharge: String,
    },
  ],
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
