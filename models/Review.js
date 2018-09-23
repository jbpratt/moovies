const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    ref: "users"
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
    type: String,
    required: true
  },
  date: {
    type: Date,
    defualt: Date.now
  },
  review: {
    type: String,
    required: true
  },
  upvotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  rating: {
    type: Number,
    required: true
  }
});

module.exports = Review = mongoose.model("review", ReviewSchema);
