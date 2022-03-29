const developement={
    name: "production",
    asset_path: "/assets",
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
    jwtSecret: "codeial"
}
const production={
    name: "production"
}

module.exports=developement