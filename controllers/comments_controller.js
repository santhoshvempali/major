const { redirect } = require("express/lib/response");
const Comment=require("../models/comment");
const Post=require("../models/post");
// const { post } = require("../routes/posts");
module.exports.create=function(req,res){
      Post.findById(req.body.post,function(err,post){
          if(post){
              Comment.create({
                  content: req.body.content,
                  post: req.body.post,
                  user: req.user._id
              },function(err,comment){
                  post.comments.push(comment);
                  post.save();
                  res.redirect("/")
              })
          }
      }
      )}
module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
            let postId=comment.post
            comment.remove()

            Post.findByIdAndUpdate(postId,{$pull:{comment: req.params.id}},function(err,post){
                return res.redirect("back")
            }) 
        }else{
            return res.redirect("back")
        }
    })
}