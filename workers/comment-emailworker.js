const queue=require("../config/kue")

const commentsMailer=require("../mailer/comment-mailer")

queue.process("emails",function(job,done){
    console.log("email job is running",job.data)

    commentsMailer.newComment(job.data);

    done();
})