const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
require('dotenv').config();

router.post('/signup', (req, res) => {
    let user = req.body;
    query = "select email, password, role, status from user where email =?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into user(name, contactNumber, email, password, status, role) values(?,?,?,?,'false','user')";
                connection.query(query, [user.name, user.contactNumber, user.email, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "User created successfully" });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Email already exists" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.post('/login', (req, res) => {
    const user = req.body;
    query = "SELECT email, password, role, status FROM user WHERE email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Incorrect Username or Password" });
            }
            else if (results[0].status === 'false') {
                return res.status(401).json({ message: "Wait for Admin Approval" });
            }
            else if (results[0].password === user.password) {
                const response = { email: results[0].email, role: results[0].role };
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                res.status(200).json({ token: accessToken});
            }
            else {
                return res.status(400).json({ massege: "Something went wrong, try again later" })
            }
        }
        else {
            return res.status(500).json(err);
        }
    })

})

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass:  process.env.PASSWORD
    }
})

router.post('/forgotPassword', (req, res) => {
    const user = req.body;
    query = "SELECT email, password FROM user WHERE email =?";
    connection.query(query, [user.email], (err, results) => {
        if(!err) {
            if(results.length <= 0){
                return res.status(401).json({message: "Incorrect Username or Password"});
            }
            else{
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Password by Kevao`s Cafe System',
                    html: '<p><b>Your Login details for Kevao`s Cafe System <b/><br><b>Email: <b/>'+results[0].email+'<br><b>Password: <b/>'+results[0].password+'<br><a href="http://localhost:4200">Click here to login<a/><p/>'
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                    }
                    else{
                        console.log('Email sent: '+info.response)
                    }
                })
                return res.status(200).json({message: "Password sent successfully to your email"});
            }

        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/get', (req,res) => {
    var query = "SELECT id, name, contactNumber, status FROM user WHERE role = 'user'";
    connection.query(query,)
})

module.exports = router;
