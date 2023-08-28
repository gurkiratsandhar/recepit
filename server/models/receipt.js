const mongoose = require("mongoose");
const { Schema } = mongoose;

const receiptSchema = new Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  storeName: String,
  storeAddress: String,
  storeWebsite: String,
  orderNumber: String,
  date: String,
  products: [
    {
      quantity: Number,
      product: String,
      total: String,
    },
  ],
  gst: Number,
  totalNogst: Number,
  totalWithgst: Number,
  amountReceived: Number,
  amountReturned: Number,
});

const ReceiptModel = mongoose.model("Receipt", receiptSchema);

module.exports = ReceiptModel;
