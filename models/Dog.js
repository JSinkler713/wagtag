const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image_url: String,
  ratings: [Number], //adds ratings
}, {timestamps: true});


// adds virtual for avg rating

DogSchema.virtual('avgRating')
  .get(function() {
    let avgRating = 0;
    let sum = 0
    this.ratings.forEach((rating)=> {
      sum+=rating;
    })
    if(sum>0) {
      avgRating = (sum/this.ratings.length).toFixed(1)
    }
    return avgRating;
  })

// end of virtual

module.exports = mongoose.model('Dog', DogSchema);
