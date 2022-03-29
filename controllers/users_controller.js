const User = require("../models/user");
const fs=require("fs");
const path=require("path")

module.exports.profile = function(req, res){
  User.findById(req.params.id,function(err,user){
    return res.render('user_profile', {
      
      title: 'User Profile',
      profile: user
  })
  })
}

module.exports.update= async  function(req,res){
  // if(req.user.id==req.params.id){
  //   console.log(req.body)
  //   User.findOneAndUpdate(req.params.id,req.body,function(err,user){
  //     return res.redirect("back")
  //   });
  // }else{
  //   return res.status(401).send("unAuthorized")
  // }
    if(req.user.id==req.params.id){
      try{
        let user=await User.findById(req.params.id);
        User.uploadAvatar(req,res,function(err){
          if(err){
            console.log("************erorr",err);
          }
          console.log(req.body)
          user.name=req.body.name;
          user.email=req.body.email;
          if(req.file){
            // if(user.avatar){
            //   fs.unlinkSync(path.join(__dirname,"..",user.avatar))
            // }
            user.avatar=User.avatarPath+"/"+req.file.filename;

          }
          console.log("user**",user)
          user.save();
          res.redirect('back');
        })
      }catch(e){
        req.flash("error",err)
        res.redirect("back");
      }

    }else{
      req.flash("error","Unauthorised")
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
  req.flash("success", "logged in")
  return res.redirect("/");
};

module.exports.destroySession = function(req, res){
  req.logout();
  req.flash("success","logged out....")
  return res.redirect('/');
}
