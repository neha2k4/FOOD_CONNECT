const mongoose = require('mongoose');

const mainpageSubscriberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
}, {collection:'subscriber'});

const MainpageSubscriber = mongoose.model('MainpageSubscriber', mainpageSubscriberSchema);

module.exports = MainpageSubscriber;
