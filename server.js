const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const dotenv = require("dotenv").config();

app.use(cors());
app.use(express.json());

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

//get products
app.get("/products", (req, res) => {
  const { min, max, category, title } = req.query;

  Product.find(
    {
      $or: [
        { min: min },
        { max: max },
        { category: category },
        { title: title },
      ],
    },
    (err, products) => {
      if (min) {
        products = products.filter((p) => p.price > min);
      }

      if (max) {
        products = products.filter((p) => p.price < max);
      }

      if (category) {
        products = products.filter((p) =>
          p.category.toLowerCase().includes(category.toLowerCase())
        );
      }

      if (title) {
        products = products.filter((p) =>
          p.title.toLowerCase().includes(title.toLowerCase())
        );
      }

      if (products.length > 0) {
        res.send(products);
      } else {
        res.send("There are no matching products!");
      }
    }
  );
});

//get one product
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id, (err, product) => {
    res.send(product);
  });
});

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
      res.send(`${title} as been updated`);
    }
  );
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id, (err, product) => {
    res.send(`${product} was deleted`);
  });
});

//initialize DB
function initProducts() {
  Product.findOne((err, data) => {
    if (!data) {
      fs.readFile("./products.json", "utf8", (err, data) => {
        if (!err) {
          let initProducts = JSON.parse(data);
          //console.log("Initialization");
          Product.insertMany(initProducts, (err, data) => {});
        }
      });
    }
  });
}
initProducts();
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => {
    app.listen(8080);
  }
);
