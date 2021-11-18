const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  return mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((err) => {
      console.error(err);
    });
};
