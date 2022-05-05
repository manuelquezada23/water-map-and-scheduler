const express = require('express');
const app = express();
const creds = require('./config');

const nodemailer = require('nodemailer');
const { getMaxListeners } = require('process');

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.static('public'));
app.use(express.json())

app.get('/express_backend', (req, res)=>{
    res.send({express: "your backend is connected"});
})

app.post('/send', (req, res)=>{
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: creds.USER,
            pass: creds.PASS
        }
    })

    const mailOptionsFeedback = {
        from: email,
        to: creds.USER,
        subject: 'Water feedback email from ' + name,
        text: message
    }

    const mailOptionsConfirmation = {
        from: creds.USER,
        to: email,
        subject: 'Confirmation email from Water',
        text: 'Your email has been sent to Water.  Thank you for your feedback.'
    }

    transporter.sendMail(mailOptionsConfirmation, (error, info)=>{
        if (error) {
            console.log(error)
            res.send('error')
        } else {
            console.log("email send: "+info)
            res.send('success')
        }
    })

    transporter.sendMail(mailOptionsFeedback, (error, info)=>{
        if (error) {
            console.log(error)
            res.send('error')
        } else {
            console.log("email sent: "+info)
            res.send('success')
        }
    })
})

app.listen(PORT, ()=>{
    console.log('Server running on port', PORT)
})