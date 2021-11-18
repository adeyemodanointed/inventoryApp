const User = require("../models/user");

const express = require("express");
const router = express.Router();
const { body, check } = require("express-validator");

const userController = require("../controllers/userController");
const isAuth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");

// Register a user
router.post(
  "/register",
  [
    body("email").trim().isEmail().normalizeEmail(),
    body("password").trim().isString().isLength({ min: 8 }),
    body("name").trim().isString(),
  ],
  userController.register
);

// Login a user
router.post(
  "/login",
  [
    body("email").trim().isEmail(),
    body("password").trim().isEmpty().isLength({ min: 8 }),
  ],
  userController.login
);

// Admin view all user
router.get("/", isAuth, isAdmin, userController.getAllUsers);

// Admin delete user
router.delete("/delete/:userId", isAuth, isAdmin, userController.deleteUser);

module.exports = router;
