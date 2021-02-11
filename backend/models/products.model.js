const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    id: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    img: {
      url: String,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("Product", productsSchema);

module.exports = product;
