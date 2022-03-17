const { Schema, model } = require("mongoose");

const productsSchema = new Schema({
  key: { type: String, uniquer: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  seller: { type: String, required: true },
  wholePrice: { type: String, required: true },
  priceFraction: { type: String, required: true },
  stock: { type: Number, default: 0 },
  star: { type: Number, default: 0 },
  starCount: { type: Number, default: 0 },
  img: { type: String },
  url: { type: String },
  features: {
    type: [
      {
        description: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
  },
  price: { type: String, required: true },
  shipping: { type: String, required: true },
});

module.exports.productsModel = model("products", productsSchema);
