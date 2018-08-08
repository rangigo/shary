const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const StorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  privacy: {
    type: String,
    default: 'public'
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  comments: [{
    commentBody: {
      type: String,
      required: true
    },
    commentUser: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
    commentDate: {
      type: Date,
      default: Date.now()
    },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

// Create collection
mongoose.model('stories', StorySchema, 'stories')