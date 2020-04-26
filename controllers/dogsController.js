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

// DELETE Dogs Destroy
router.delete('/:id', (req, res) => {
  db.Dog.findByIdAndDelete(req.params.id, (err, deletedDog) => {
    if (err) {
      return res.send(err);
    }

    console.log('Deleted Dog = ', deletedDog);

    res.redirect('/dogs');
  });
});

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



// PUT Dogs Update
router.put('/:id', async (req, res) => {
  try{

    // ADDED Section for Ratings
    //console.log(req.body)
    //console.log(req.body.ratings)
    if (!req.body.ratings) { // new check for what kind of update
    const updatedDog = await db.Dog.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    )
    } else { // This is the new case to push another rating
      const updateDog = await db.Dog.findByIdAndUpdate(
        req.params.id,
        {$push: {ratings: req.body.ratings}},
        {new: true}
      )
    }
    // changed to put back to the dogs show page
    res.redirect(`/dogs/${req.params.id}`);
  } catch (err) {
    return res.send(err);
  }
});


module.exports = router;
