"use strict";
const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('./public'))

app.post('/uploads', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            res.render('index', {
                msg: err
            })
        }else{
           if(req.file === undefined) {
               res.render('index', {
                   msg: 'Error: No file selected'
               })
           } else {
               res.render('index', {
                   msg: 'File uploaded!',
                   file: `uploads/${req.file.filename}`
               })
           }
        }
    })
})

//Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//init upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 3000000},
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
}).single('myImg')

function checkFileType(file, cb) {
    const fileType = /jpeg|jpg|png/
    const extname = fileType.test(file.path.extname(file.originalname).toLowerCase())
    const mimetype = fileType.test(file.mimetype)

    if(mimetype && extname) {
        return cb(null, true)
    }else{
        cb('Error: Images only!!')
    }
}