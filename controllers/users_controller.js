const User = require("../models/user");
module.exports.profile = function (req, res) {
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title: " User profile",
                    user: user
                })
            }
        })
    }
    else{
        return res.redirect('/users/sign-in')
    }
};

module.exports.signUp = function (req, res) {
  res.render("user_sign_up", {
    title: "app | Sign up",
  });
};

module.exports.signIn = function (req, res) {
  res.render("user_sign_in", {
    title: "app |signIn",
  });
};
// get signupData
module.exports.create = function (req, res) {
  //
  if (req.body.password !== req.body.confirm_password) {
    console.log("Password and Confirm password doesnt match");
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("User id already registered");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in  registering");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};
// create signin session
module.exports.createSession = function (req, res) {
    console.log(req)
   User.findOne({email: req.body.email},function(err,user){
       //checking user is present
       if(err){
           console.log("User not found"); return
       }
       //checking password with req and db
       if(user){
           if(req.body.password!==user.password){
               res.redirect('back');
           }

           res.cookie("user_id",user.id);
           return res.redirect('/users/profile')

       }
       else{
           return res.redirect('back');
       }

   }) 
};
