const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')

const app = express()
// Load User Model
require('./models/User')

// Passport Config
require('./config/passport')(passport)

// Keys Config
const keys = require('./config/keys')


// Map Global Promises
mongoose.Promise = global.Promise

// Mongoose Connect
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

// Load Routes
const auth = require('./routes/auth')
const users = require('./routes/users')

// Cookie Session
app.use(cookieSession({
  name: 'session',
  keys: ['panigo']
}))

// Passport Middlewares
app.use(passport.initialize())
app.use(passport.session())

// Set global vars
// app.use((req, res , next) => {
//   res.locals.user = req.user || null
//   next()
// })

// Use Routes
app.use('/auth', auth)
app.use('/api/users', users)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})