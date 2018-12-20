const express = require('express');
const app = express();
const port = process.env.port || 9999;
const path = require('path');
app.set('view engine','jade');
const nodemailer = require('nodemailer');
var bodyparser = require("body-parser");


app.use(bodyparser.json())
// app.set('views',path.join(__dirname,'public'));
// app.use(express.static(path.join(__dirname,'public')));

app.set('views',path.join(__dirname,'abdullah'));
app.use(express.static(path.join(__dirname,'abdullah')))

// app.get('/',(req,res,next) => {
//     res.render('views/layout')
// });

app.get('/contact',function(req,res,next){
    res.render("views")
});
app.get('/contact',(req,res) => {
    res.sendFile(__dirname + '/public/contact.html')
})
app.post('/contact',(req,res,next) => {
    let transporter = nodemailer.createTransport({
        host: 'gains.arrowsupercloud.com',
        port: 587,
        secure: false,
        auth: {
            user: 'prashanth@abdullahking.me', // generated ethereal user
            pass:  '}BJA;HU*gEzA'// generated ethereal password
        }
    });

     // setup email data with unicode symbols
     let mailOptions = {
        from: '"Abdullah " <prashanth@abdullahking.me>', // sender address
        to: 'abdullahqb57@gmail.com', // list of receivers
        subject: 'HHello from Support Team', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello ?</b>' + req.body.name// html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        res.send("Success");

        
    });

})

app.listen(port,function(err){
    if(err){
        throw err;
    }
    else{
        console.log('Up and running on 9999');
    }
})