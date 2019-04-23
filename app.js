const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router/routes.js');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.get('/', cors(), function (req, res) { res.redirect('/api') })
app.use('/api', cors(), router);

module.exports = app;
