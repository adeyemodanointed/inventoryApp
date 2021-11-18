const User = require('../models/user');

module.exports = (req, res, next) => {
  User
    .findById(req.userId)
    .then(user => {
      if(user.userRole !== 2) {
        const error = new Error('Not authorized.');
        error.statusCode  = 403;
        throw error;
      }
      next();
    })
    .catch(err => {
      next(err);
    });
}