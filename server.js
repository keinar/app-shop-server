const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

const productSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  category: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

// add product to DB
app.post("/products", (req, res) => {
  const { title, price, description, category, image } = req.body;

  if ((product = new Product())) {
    product.title = title ? title : product.title;
    product.price = price ? price : product.price;
    product.description = description ? description : product.description;
    product.category = category ? category : product.category;
    product.image = image ? image : product.image;
  }

  product.save();

  res.send("ok");
});

// update product to DB
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, description, category, image } = req.body;
  Product.findByIdAndUpdate(
    id,
    { title, price, description, category, image },
    (err, product) => {
      res.send(product);
    }
  );
});

mongoose.connect(
  "mongodb://localhost/gocode_shop",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => {
    app.listen(8080);
  }
);
