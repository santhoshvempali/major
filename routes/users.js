const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication, usersConrtoller.profile);
// router.get('/',passport.checkAuthentication, usersConrtoller.profile);
//For signup
router.post('/update/:id',passport.checkAuthentication,usersConrtoller.update)
router.get('/sign-up',usersConrtoller.signUp);
//For sign in
router.get('/sign-in',usersConrtoller.signIn);

router.post('/create',usersConrtoller.create);
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect: "/users/sign-in"}
),usersConrtoller.createSession);

router.get('/sign-out', usersConrtoller.destroySession);

router.get("/auth/google",passport.authenticate("google",{scope: ["profile","email"]}))
router.get("/auth/google/callback",passport.authenticate("google",{failureRedirect: "users/sign-in"}),usersConrtoller.createSession)


module.exports = router;