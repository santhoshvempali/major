const nodeMailer = require('../config/node-mailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);
    let htmlMailer=nodeMailer.renderTemplate({comment: comment},"/comments/comment-mailer.ejs")

    nodeMailer.transporter.sendMail({
       from: 'vepalisantosh@gmail.com',
       to: comment.user.email,
       subject: "New Comment Published!",
       html: htmlMailer
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}