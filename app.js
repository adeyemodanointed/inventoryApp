require('dotenv').config();
require('./config/database').connect();
const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;

const productRoutes = require('./routes/product')
const userRoutes = require('./routes/user')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use('/product', productRoutes);
app.use('/user', userRoutes);


// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port);