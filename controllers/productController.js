require("dotenv").config();
const Product = require("../models/product");
const User = require("../models/user");
const { validationResult } = require("express-validator");

const {
  catchErrorHandler,
  validationErrorHandler,
} = require("../util/errorHandler");

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      catchErrorHandler(err, next);
    });
};

exports.getProduct = (req, res, next) => {
  const errors = validationResult(req);
  validationErrorHandler(errors);

  const productId = req.params.productId;

  Product.findOne({ productId })
    .then((product) => {
      if (!product) {
        res.status(204).json({
          message: "No record found",
        });
      }
      res.status(200).json(product);
    })
    .catch((err) => {
      catchErrorHandler(err, next);
    });
};

exports.createProduct = (req, res, next) => {
  const errors = validationResult(req);
  validationErrorHandler(errors);

  const { name, price, quantity } = req.body;

  Product.create({
    name: name,
    price: price,
    quantity: quantity,
  })
    .then((product) => {
      res.status(201).json({
        message: "Product successfully created",
        product,
      });
    })
    .catch((err) => {
      catchErrorHandler(err, next);
    });
};

exports.updateProduct = (req, res, next) => {
  const errors = validationResult(req);
  validationErrorHandler(errors);

  const { name, price, quantity } = req.body;
  const productId = req.params.productId;

  Product.findOne({ productId })
    .then((product) => {
      product.name = name;
      product.price = price;
      product.quantity = quantity;

      return product.save();
    })
    .then((product) => {
      res.status(200).json({
        message: "Product updated successfully",
        product,
      });
    })
    .catch((err) => {
      catchErrorHandler(err, next);
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        throw new Error("Product does not exist.");
      }
      return product.remove();
    })
    .then((result) => {
      res.status(200).json({ message: "Product deleted successfully." });
    })
    .catch((err) => {
      catchErrorHandler(err, next);
    });
};
