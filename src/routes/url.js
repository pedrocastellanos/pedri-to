const express = require('express')
const router = express.Router()

const Url = require('../models/Url')
const { isAuthenticated } = require("../helpers/auth");

router.post('/myurls', async (req, res)=>{
    const {oldurl} = req.body
    
    const validateUrl = (url) => {
        const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/
        if(urlRegex.test(url)) return true
        return false
    }

    const generate = async ()=>{
        let maxLett = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let minLett = 'abcdefghijklmnopqrstuvwxyz'
        
        let length = Math.floor(Math.random() * (8-4) + 4)
        
        let urlShort = 'p' 
        // let urlShort = req.headers.host + '/' 
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
        console.log(req)
        console.log('User:',req.user)
        // const user = req.user.id || null
        const url = new Url({oldurl, newurl})
        await url.save()
        if (!isAuthenticated) {
            res.render('index', {
                newurl
            })
        } else{
            res.redirect('/myurls')
        }
    } else {
        errors.push({text: "Please Write a valid URL"})
    }
    
    if (errors.length > 0) {
        res.redirect('index', {
            errors,
            newurl
        })
        // res.render('index', {
        //     errors,
        //     newurl
        // })
    }
})


router.get('/:id', async (req, res, next) => {
    const { id: newurl } = req.params;
    try {
      const url = await Url.findOne({ newurl });
      if (url) {
        return res.redirect(url.oldurl);
      }
      return res.send('It´s not ok');
    } catch (error) {
      return res.status(404).sendFile(notFoundPath);
    }
  });












// router.get('/notes', isAuthenticated, async (req, res)=>{
//     try {
//         const notes = await Note.find({user: req.user.id}).sort({date: 'desc'})
//         res.render('notes/all-notes', { notes })
//     } catch (error) {
//         console.log(error)
//     }
// })

// router.get('/notes/edit/:id', isAuthenticated ,async (req, res)=>{
//     const note = await Note.findById(req.params.id)
//     res.render('notes/edit-notes', { note })
// })

// router.put('/notes/edit-note/:id', isAuthenticated,async (req, res)=>{
//     const {title, description} = req.body
//     await Note.findByIdAndUpdate(req.params.id, {title, description})
//     req.flash('success_msg', 'Note Updated Succesfuly')
//     res.redirect('/notes')
// })

// router.delete('/notes/delete/:id', isAuthenticated,async (req, res)=>{
//     await Note.findByIdAndDelete(req.params.id)
//     req.flash('success_msg', 'Note Deleted Succesfuly')
//     res.redirect('/notes')
// })

module.exports= router