const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const Product = require("../models/product");
const productController = require("../controllers/productController");
const auth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");

// GET all products
router.get("/", auth, productController.getAllProducts);

// GET a single product
router.get("/:productId", auth, productController.getProduct);

// Create a new product
router.post(
  "/create-product",
  [
    body("name").trim().isLength({ min: 3 }),
    body("price").isFloat(),
    body("quantity").isNumeric(),
  ],
  auth,
  isAdmin,
  productController.createProduct
);

//PUT a product
router.put(
  "/update-product/:productId",
  [
    body("name").trim().isLength({ min: 3 }),
    body("price").isFloat(),
    body("quantity").isNumeric(),
  ],
  auth,
  isAdmin,
  productController.updateProduct
);

// DELETE a Product
router.delete(
  "/delete-product/:productId",
  auth,
  isAdmin,
  productController.deleteProduct
);

module.exports = router;
