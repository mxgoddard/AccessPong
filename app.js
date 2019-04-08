const app = require('express')();
const bodyParser = require('body-parser');
const router = require('./router/routes.js');

app.use(bodyParser.json());
app.get('/', function (req, res) { res.redirect('/api') })
app.use('/api', router);

module.exports = app;
