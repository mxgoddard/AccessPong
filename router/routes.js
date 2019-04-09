const router = require('express').Router();
const { home } = require('../controllers/home.js');
const { register, login, profile } = require('../controllers/user.js');
const { registerLeague, viewLeague } = require('../controllers/league.js');

router
    .route('')
    .get(home)

router
    .route('/user/profile/:user_id')
    .get(profile)

router
    .route('/user/register')
    .post(register)

router
    .route('/user/login')
    .post(login)

router
    .route('/league/:league_id')
    .get(viewLeague)

router
    .route('/league/register')
    .post(registerLeague)

module.exports = router;