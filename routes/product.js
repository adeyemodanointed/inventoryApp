const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const Product = require('../models/product');
const productController = require('../controllers/productController');

// GET all products
router.get('/', productController.getAllProducts);

// GET a single product
router.get('/:productId', productController.getProduct);

// Create a new product
router.post('/create-product',
  [
    body('name')
      .trim()
      .isLength({min: 3}),
    body('price')
      .isFloat(),
    body('quantity')
      .isNumeric()
  ],
  productController.createProduct
);

//PUT a product
router.put('/update-product/:productId',
  [
    body('name')
      .trim()
      .isLength({min: 3}),
    body('price')
      .isFloat(),
    body('quantity')
      .isNumeric()
  ],
  productController.updateProduct
);

// DELETE a Product
router.delete('/delete-product/:productId', productController.deleteProduct);

module.exports = router;