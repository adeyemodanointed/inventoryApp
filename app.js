require('dotenv').config();
require('./config/database').connect();
const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;


// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port);