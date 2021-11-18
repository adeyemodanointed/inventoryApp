require("dotenv").config();
const db = require("./config/database");
const express = require("express");

const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;

const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).send({ message: message, data: data });
});

// app.get('/', (req, res) => res.send('Hello World!'))
db.connect().then(() => {
  app.listen(port);
});
