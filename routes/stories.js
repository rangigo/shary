const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Story = mongoose.model('stories')
const User = mongoose.model('users')

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

module.exports = router
