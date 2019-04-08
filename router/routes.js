const router = require('express').Router();
const { home } = require('../controllers/home.js')
const { test } = require('../controllers/test.js')

router
    .route('')
    .get(home)

router
    .route('/test')
    .get(test)

module.exports = router;