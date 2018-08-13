const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Story = mongoose.model('stories')
const User = mongoose.model('users')

// Get public stories
router.get('/', (req, res) => {
  Story.find({privacy: 'public'})
    .populate('user')
    .then(stories => {
      res.send(stories)
    })
})

// Get stories from current user
router.get('/watashi', (req, res) => {
  Story.find({user: req.user.id})
    .then(stories => res.send(stories))
})

// Get single story
router.get('/:id', (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
  .populate('user')
  .then(story => res.send(story))
})

// Post Story Form
router.post('/', (req, res) => {
  const { title, body, privacy, allowComments } = req.body

  const newStory = {
    title,
    body,
    privacy,
    allowComments,
    user: req.user.id
  }

  // Create story
  new Story(newStory)
    .save()
    .then(story => {
      res.send(story)
    })
})

// Edit Story Form
router.put('/:id', (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
  .then(story => {
    const { title, body, privacy, allowComments } = req.body
  
    // Update new values
    story.title = title
    story.body = body
    story.privacy = privacy
    story.allowComments = allowComments

    story.save()
      .then(story => res.send(story))
  })
})

// Delete story
router.delete('/:id', (req, res) => {
  Story.remove({
    _id: req.params.id
  })
    .then(() => res.send('deleted'))
})

module.exports = router
