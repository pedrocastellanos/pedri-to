const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/User')
const { isAuthenticated } = require("../helpers/auth");

router.get('/', (req, res)=>{
    res.render('index')
})

router.get('/about', (req, res)=>{
    res.render('about')
})

router.get('/login', (req, res)=>{
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/myurls',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/register', (req, res)=>{
    res.render('register')
})

router.post('/register', async (req, res)=>{
    const {name, email, password, confirm_password} = req.body
    console.log('Request Received', '/register')
    //Validar las contraseñas
    const errors=[]
    if (name.length == 0) {
        errors.push({text: "Please Insert Your Name"})
    }
    if (email.length == 0) {
        errors.push({text: "Please Insert Your Email"})
    }
    if (password.length == 0) {
        errors.push({text: "Please Insert Your Password"})
    }
    
    if (confirm_password.length == 0) {
        errors.push({text: "Please Confirm Your Password"})
    }
    if (password != confirm_password) {
        errors.push({text: "Password don't match"})
    } 
    if(password == confirm_password) {
        const passwordRegex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/
        if(passwordRegex.test(password)) {}
        else errors.push({text: 'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long'})
    }

    if (errors.length > 0) {
        res.render('register', {errors, name, email, password, confirm_password})
    } else {
        console.log('Was Here', 'line 60')
        const emailUser = await User.findOne({email: email}).exec((err)=>{
            if (err) return console.error(err)
        })

        // const emailUser = (email, done)=>{
        //     User.findOne({email: email}, (err, data)=>{
        //         if(err) return done(err);
        //         return done(null, data)
        //     })
        // }
        // const emailUser = (email, done) =>{
        //     User.findOne({{email: email}}, function(err, data) {
        //       console.log(data);
        //       if(err) return done(err);
        //       return done(null, data)
        //     })
        //   };
        
        console.log('Was Here', 'line 67')
        if (emailUser) {
            console.log('Was Here', 'line 69')
            req.flash('success_msg', 'This email already in use')
            console.log('Was Here', 'line 69')
            // console.log(req.flash())
            res.redirect('/register')
            // console.log('Was Here', 'line 69')
        } 
            // console.log('Was Here', 'line 73')
            const newUser = new User({name, email, password})
            // console.log('Was Here', 'line 75')
            newUser.password = await newUser.encryptPassword(password)
            // console.log('Was Here', 'line 77')
            await newUser.save((err)=>{
                if (err) return console.error(err);
            })
            // console.log('Was Here', 'line 81')
            req.flash('success_msg', 'You are registered')
            res.redirect('/login')
    }
})

router.get('/logout', (req, res)=>{
    req.logout()
    res.redirect('/')
})

module.exports= router