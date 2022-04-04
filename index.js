const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const passport=require("passport");
const passportLocal=require('./config/passport-local');
const passportJWT=require("./config/passport-jwt")
const MongoStore=require('connect-mongo');
const saasMiddleWare=require('node-sass-middleware')
const flash=require("connect-flash");
const customMware=require("./config/middleware")
const pasportGoogle=require("./config/passport-google");
const environment=require("./config/environment");
const logger=require("morgan");
const path=require("path");
if(environment.name=="development"){
app.use(saasMiddleWare({
    src: path.join(__dirname,environment.asset_path,"/scss"),
    dest: path.join(__dirname,environment.asset_path,"/css"),
    debug: true,
    outputStyle: "extended",
    prefix: "/css"
}))
}
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(environment.asset_path));
app.use(logger(environment.morgan.mode,environment.morgan.options));
app.use(expressLayouts);
app.use("/uploads",express.static(__dirname+"'/uploads"));
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'major',
    secret: environment.session_Cookie_Key,
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
        mongoUrl: 'mongodb://localhost/codeial',
        autoRemove: 'disabled'
    },function(err){
        console.log(err || "connect to db ok")
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
app.use(flash())
app.use(customMware.setFlash);
app.use('/', require('./routes'));



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
