require('dotenv').config();
const express = require('express')
const router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const cloudinary = require('cloudinary');

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

router.post('/create', multipartMiddleware, (req, res)=> {
  let body = (req.body);
  cloudinary.uploader.upload(req.files.image.path, function(result) {
    body = {
      ...body, 
      image_url: result.secure_url
    }
    // prep body for mongo
    console.log(body);

    res.render('new', {
    image: result.secure_url,
    })
  })
})

module.exports = router;