const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const auth = require('../middleware/is-auth')

// ADD product to cart
router.post('/add/:userId/product/:productId', auth, cartController.addProductToCart);

// DELETE product from cart
router.delete('/delete/:userId/product/:productId', auth, cartController.deleteFromCart);

// GET user cart
router.get('/:userId', auth, cartController.getUserCart);


module.exports = router;