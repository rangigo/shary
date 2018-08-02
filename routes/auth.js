const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
)

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard')
  },
)

router.get('/verify', (req, res) => {
  res.send(req.user)
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
