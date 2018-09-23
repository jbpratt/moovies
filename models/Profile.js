const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  favorites: [{
    title: {
      type: String,
    },
    imdbid: {
      type: String,
    },
    externalid: {
      type: String
    }
  }],
  date: {
    type: Date,
    defualt: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);