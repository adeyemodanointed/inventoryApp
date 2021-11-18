const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

// GET products
router.get('/products')