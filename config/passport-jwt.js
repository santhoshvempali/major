const passport=require("passport")
const JWTstrategy=require("passport-jwt").Strategy;
const ExtractJWT=require("passport-jwt").ExtractJwt;
const User=require("../models/user")
const environment=require("./environment");

let options={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: environment.jwtSecret
}

passport.use(new JWTstrategy(options,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log("error in getting user");
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}))