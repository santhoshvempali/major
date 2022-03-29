const passport = require("passport");

const googleOauth = require("passport-google-oauth").OAuth2Strategy;

const crypto = require("crypto");

const User = require("../models/user");
const environment=require("./environment")

passport.use(
  new googleOauth(
    {
      clientID: environment.clientID,
      clientSecret: environment.clientSecret,
      callbackURL: environment.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }, function (err, user) {
        if (err) {
          console.log("ero in google strategy");
          return;
        }
        console.log(profile, "********profile");
        if (user) {
          return done(null, user);
        }
        else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString("hex")
            },function(err,user){
                if(err){
                    console.log("error in creating user");
                    return ;
                }
                return done(null,user);
            })
        }
      });
    }
  )
);
