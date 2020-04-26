require('dotenv').config();
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = {
  index: function (req, res) {
      res.render('pages/index');
  },
  new: function (req, res) {
      res.render('new');
  },
  create: function (req, res) {
      cloudinary.uploader.upload(req.files.image.path, function(result) {
        console.log(result);
        res.render('new', {
        image: result.secure_url,
        })
      }
  )}
}
