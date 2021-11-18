require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;

const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/product", productRoutes);
app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).send({ message: message, data: data });
});

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port);
