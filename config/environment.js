const fs=require("fs");
const rfs = require('rotating-file-stream');
const path=require("path");
const logDirectory=path.join(__dirname,"../production_logs")
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});
const development={
    name: "development",
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_Cookie_Key: "secret",
    database: "codeial",
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'getias8595@gmail.com',
            pass: '8500436311'
        }
    },
    clientID:"1339260165-tp26ble41f0ffp10nv952m68e5a1glhp.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwtSecret: "codeial",
    morgan:{
        mode:"dev",
        options: {stream: accessLogStream}
    }
}
const production={
    name: "production",
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_Cookie_Key: process.env.SESSION_COOKIE_SECRET,
    database: process.env.DATABASE,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'getias8595@gmail.com',
            pass: '8500436311'
        }
    },
    clientID:process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwtSecret: process.env.JWT_SECRET,
    morgan:{
        mode:"combined",
        options: {stream: accessLogStream}
    }
}


module.exports=eval(process.env.CODEIAL_ENVIRONEMNT)==undefined? development: eval(process.env.CODEIAL_ENVIRONEMNT);