const express = require('express')
const router = express.Router()

const Url = require('../models/Url')
const { isAuthenticated } = require("../helpers/auth");
const { Authenticated } = require("../helpers/authentication");

router.post('/create-url', isAuthenticated, async (req, res)=>{
    const {oldurl} = req.body
    var userId;
    if (req.user) {
        userId = req.user.id
    } else{
       userId = null
    }
    
    const validateUrl = (url) => {
        const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/
        if(urlRegex.test(url)) return true
        return false
    }

    const generate = async ()=>{
        let maxLett = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let minLett = 'abcdefghijklmnopqrstuvwxyz'
        
        let length = Math.floor(Math.random() * (8-4) + 4)
        
        let urlShort = req.headers.host + '/' 
        
        for (let i = 0; i <= length; i++) {
            let array = Math.floor(Math.random() * (3-1) + 1)
            let letterToUSe = Math.floor(Math.random() * (25- 0) + 0)
    
            if (array==1){
                urlShort +=  maxLett[letterToUSe]
            } else {
                urlShort +=  minLett[letterToUSe]
            }
        }
        const exist = await Url.find({url: urlShort})
        if (exist) {
            generate()
        }
        return urlShort
    }

    const errors = []
    if(validateUrl(oldurl)) {
        var newurl = await generate()
        console.log('User:',req.user)
        const url = new Url({oldurl, newurl, userId})
        await url.save()
        res.render('index', {
            newurl
        })
    } else {
        errors.push({text: "Please Write a valid URL"})
    }
    
    if (errors.length > 0) {
        res.redirect('index', {
            errors,
            newurl
        })
    }
})

router.get('/myurls', Authenticated ,async (req, res)=>{
    if (req.user) {
        const urls = await Url.find({userId: req.user.id}).sort({date: 'desc'})
        res.render('myurls', { urls })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const newurl = `${req.headers.host}/${id}` 
    try {
        const redirect = await Url.findOne({ newurl })
        await Url.updateOne({newurl}, {$inc: {"clicks": 1}});
        if (redirect) {
          return res.redirect(redirect.oldurl);
        } 
        res.send('Something is not ok')
    } catch (error) {
        return res.status(404).sendFile(notFoundPath);
    }
  });

module.exports= router