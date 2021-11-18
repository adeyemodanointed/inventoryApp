require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');


exports.register = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation failed! Supplied data is incorrect');
    error.statusCode = 422;
    throw error;
  }
  
  const {name, email, password, userRole} = req.body;

  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = User.create({
        email: email,
        password: hashedPassword,
        name: name,
        userRole: userRole
      }).then(user => {
        res.status(201).json({message: "User successfully created", user});
      });
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}

exports.login = (req, res, next) => {
  const {email, password} = req.body;

  User.findOne({email: email})
    .then(user => {
      if(!user) {
        const error = new Error('User not found.');
        error.statusCode = 401;
        throw error;
      }

      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if(!isEqual) {
        const error = new Error('Incorrect password.');
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        process.env.TOKEN_KEY,
        {expiresIn: '1h'}
      );
      res.status(200).json({token: token, userId: loadedUser._id.toString()})
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}