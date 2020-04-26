const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/wagtag';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully...'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));


module.exports = {
  Dog: require('./Dog'),
};
