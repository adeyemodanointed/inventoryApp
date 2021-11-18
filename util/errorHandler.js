exports.catchErrorHandler = (err, next) => {
  if(!err.statusCode) {
    err.statusCode = 500
  }
  next(err);
}

exports.validationErrorHandler = (errors) => {
  if(!errors.isEmpty()) {
    console.log(errors.array())
    const error = new Error('Validation failed! Supplied data is incorrect');
    error.statusCode = 422;
    throw error;
  }
}