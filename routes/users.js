const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication, usersConrtoller.profile);
//For signup
router.get('/sign-up',usersConrtoller.signUp);
//For sign in
router.get('/sign-in',usersConrtoller.signIn);

router.post('/create',usersConrtoller.create);
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect: "/users/sign-in"}
),usersConrtoller.createSession);

router.get('/sign-out', usersConrtoller.destroySession);

module.exports = router;