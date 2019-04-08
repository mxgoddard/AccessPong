const router = require('express').Router();
const { home } = require('../controllers/home.js')
const { test } = require('../controllers/test.js')
const { register } = require('../controllers/user.js')

router
    .route('')
    .get(home)

router
    .route('/test')
    .get(test)

router
    .route('/user/register')
    .post(register)

module.exports = router;