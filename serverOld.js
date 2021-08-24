const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

// get all products
app.get("/products", (req, res) => {
  fs.readFile("./products.json", "utf8", (err, data) => {
    if (err) {
      res.sendStatus("500");
    } else {
      res.send(JSON.parse(data));
    }
  });
});

// spesific product
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("./products.json", "utf8", (err, data) => {
    if (err) {
      res.sendStatus("500");
    } else {
      const products = JSON.parse(data);
      const product = products.find((product) => product.id === +id);
      res.send(product);
      console.log("product: " + id);
    }
  });
});

// add product
app.post("/products", (req, res) => {
  const { title, price, description, category, image } = req.body;

  fs.readFile("./products.json", "utf8", (err, data) => {
    const products = JSON.parse(data);
    const newProduct = {
      id: products.length + 1,
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
    };
    products.push(newProduct);
    fs.writeFile("./products.json", JSON.stringify(products), (err) => {
      if (err) {
        res.send("can't be added");
      } else {
        res.send("product added");
      }
    });
  });
});

// update product
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, description, category, image } = req.body;
  fs.readFile("./products.json", "utf8", (err, data) => {
    const products = JSON.parse(data);
    const product = products.find((product) => product.id === +id);

    if (product) {
      product.title = title ? title : product.title;
      product.price = price ? price : product.price;
      product.description = description ? description : product.description;
      product.category = category ? category : product.category;
      product.image = image ? image : product.image;

      fs.writeFile("./products.json", JSON.stringify(products), (err) => {
        res.send("The product has been updated");
      });
    } else {
      res.send("not found");
    }
  });
});

// delete product
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("./products.json", "utf8", (err, data) => {
    const products = JSON.parse(data);
    const productIndex = products.findIndex((product) => product.id === +id);
    console.log(productIndex);
    products.splice(productIndex, 1);
    fs.writeFile("./products.json", JSON.stringify(products), (err) => {
      res.send(`product with ${id} was deleted`);
    });
  });
});

// filter by slider
app.get("/products", (req, res) => {
  fs.readFile("./products.json", "utf8", (err, data) => {
    const products = JSON.parse(data);
    const { min, max } = req.query;
    const product = products.filter(
      (item) => item.price > min && item.price <= max
    );
    if (product) {
      res.send(product);
    } else {
      res.status(404);
      res.send();
    }
  });
});

app.listen(8080);
