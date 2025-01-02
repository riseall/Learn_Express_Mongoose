const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

/** Models */
const Product = require("./models/product");

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1/shop_db")
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});

app.listen(3000, () => {
  console.log("Server is running on http://127.0.0.1:3000");
});
