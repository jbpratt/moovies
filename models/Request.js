const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  externalid: {
    type: String,
    required: true
  },
  posterpath: {
    type: String
  },
  type: {
    type: String
  },
  upvotes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  date: {
    type: Date,
    defualt: Date.now
  }
});

module.exports = Request = mongoose.model('request', RequestSchema);