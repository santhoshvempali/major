const User = require("../models/user");

module.exports.profile = function(req, res){
  User.findById(req.params.id,function(err,user){
    return res.render('user_profile', {
      
      title: 'User Profile',
      profile: user
  })
  })
}

module.exports.update=function(req,res){
  if(req.user.id==req.params.id){
    console.log(req.body)
    User.findOneAndUpdate(req.params.id,req.body,function(err,user){
      return res.redirect("back")
    });
  }else{
    return res.status(401).send("unAuthorized")
  }
}

module.exports.signUp = function (req, res) {
  if(req.isAuthenticated()){
   return res.redirect("/users/profile")
  }
  res.render("user_sign_up", {
    title: "app | Sign up",
  });
};

module.exports.signIn = function (req, res) {
  if(req.isAuthenticated()){
   return res.redirect("/users/profile")
  }
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
  return res.redirect("/");
};

module.exports.destroySession = function(req, res){
  req.logout();

  return res.redirect('/');
}
