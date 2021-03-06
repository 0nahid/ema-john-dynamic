require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { productsModel } = require("./model");

const port = process.env.PORT || 5000;
const mongoDbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@products.6aa06.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function connectMongo() {
  try {
    await mongoose.connect(mongoDbUri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
//get all products
app.get("/products", async (req, res) => {
  try {
    const query = productsModel.find();
    if (req.query.page && req.query.size) {
      const page = Number(req.query.page.toString());
      const size = Number(req.query.size.toString());
      query.skip(page < 2 ? 0 * size : (page - 1) * size);
      query.limit(size);
    }
    const products = await query.exec();
    res.status(200).json({
      message: "success",
      data_count: products.length,
      products,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//   get specific products
app.get("/products/:id", async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "success", product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/", (_req, res) =>
  res.status(200).json({
    message: "Hello World!",
  })
);

app.listen(port, () => {
  connectMongo();
  console.log(`Example app listening on port ${port}!`); // do not return inside listen
});
