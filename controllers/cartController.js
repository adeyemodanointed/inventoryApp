require('dotenv').config();
const Product = require('../models/product');
const User = require('../models/user');
const {validationResult} = require('express-validator');


exports.addProductToCart = (req, res, next) => {
  const {userId, productId} = req.params;

  let userCart;
  let newCart;

  Product
    .findById(productId)
    .then(product => {
      if(!product) {
        throw new Error('Product does not exist.')
      }
      if(product < 1) {
        throw new Error('Product not available.');
      }
      product.quantity = product.quantity - 1;
      return product.save();
    })
    .then(product => {
      User.findById(userId)
        .then(user => {
          userCart = [...user.cart.items]
          newCart = {
            productId: product,
            purchaseQuantity: 1
          }
          const userCartIndex = userCart.findIndex(i => i.productId.toString() === product._id.toString());
          if(userCartIndex < 0) {
            userCart.push(newCart);
          } else {
            userCart[userCartIndex].productId = newCart.productId;
            userCart[userCartIndex].purchaseQuantity = userCart[userCartIndex].purchaseQuantity + 1;
          }
          user.cart.items = userCart;
          return user.save();
        })
        .then(user => {
          res.status(200).json({message: "Product added to cart successfully.", cart: user.cart})
        })
        .catch(err => {
          next(err);
        })   
    })
    .catch(err => {
      catchErrorHandler(err, next);
    });
}

exports.deleteFromCart = (req, res, next) => {
  const {userId, productId} = req.params;
  let extraQuantity;
  let userCart;
  User.findById(userId)
    .then(user => {
      userCart = [...user.cart.items];

      const userCartIndex = userCart.findIndex(i => i.productId.toString() === productId.toString());
      if(userCartIndex < 0) {
        throw new Error('Product does not exist in cart.');
      } else {
        extraQuantity = userCart[userCartIndex].purchaseQuantity;
        userCart.splice(userCartIndex, 1);
      }

      user.cart.items = userCart;
      return user.save();
    })
    .then(user => {
      Product.findById(productId)
        .then(product => {
          product.quantity = product.quantity + extraQuantity;
          product.save();
        }).then(() => {
          res.status(200).json({message: "Product deleted from cart successfully.", cart: user.cart})
        })
    })
    .catch(err => {
      catchErrorHandler(err, next);
    })
}

exports.getUserCart = (req, res, next) => {
  const {userId} = req.params;

  User.findById(userId)
    .then(user => {
      res.status(200).json({
        message: "Success",
        data: {...user.cart.items}
      })
    })
    .catch(err => {
      catchErrorHandler(err, next);
    })
}