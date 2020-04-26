require('dotenv').config();
const express = require('express')
const router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const cloudinary = require('cloudinary');

// Databse
const db = require('../models')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get('/', (req, res)=> {
  res.render('index');
})

router.get('/new', (req, res) => {
  res.render('new');
})

router.post('/create', multipartMiddleware,  (req, res)=> {
  let body = (req.body);
  cloudinary.uploader.upload(req.files.image.path, function(result) {
    body = {
      ...body, 
      image_url: result.secure_url
    }
    console.log(body);
    db.Dog.create(body, (err, newDog)=> {
      if (err) {
        return console.log(err);
      } 
      res.render('show', {
        dog: newDog
      }); 
    })
  })
})


// GET Dogs Show
router.get('/:id', async (req, res) => {
    try {
      const foundDog = await db.Dog.findById(req.params.id);
      res.render('show.ejs', {
        dog: foundDog,
      });
    } catch (err) {
      res.send(err);
    }
});

module.exports = router;
