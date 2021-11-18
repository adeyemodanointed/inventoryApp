const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    allowNull: false
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    allowNull: false
  },
  userRole: {
    type: Number,
    required: true,
    allowNull: false
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        purchaseQuantity: { type: Number, required: true }
      }
    ]
  }
})

module.exports = ('User', userSchema);