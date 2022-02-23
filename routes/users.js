const express = require('express');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controller');

router.get('/profile', usersConrtoller.profile);
//For signup
router.get('/sign-up',usersConrtoller.signUp);
//For sign in
router.get('/sign-in',usersConrtoller.signIn);

router.post('/create',usersConrtoller.create);
router.post('/createSession',usersConrtoller.createSession);

module.exports = router;