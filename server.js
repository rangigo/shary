const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')

const app = express()
// Load Models
require('./models/User')
require('./models/Story')

// Passport Config
require('./config/passport')(passport)

// Keys Config
const keys = require('./config/keys')

// Map Global Promises
mongoose.Promise = global.Promise

// Mongoose Connect
mongoose
  .connect(
    keys.mongoURI,
    {
      useNewUrlParser: true,
    },
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

// Load Routes
const auth = require('./routes/auth')
const users = require('./routes/users')
const stories = require('./routes/stories')

// Body Parser Middleware
app.use(bodyParser.json())

// Cookie Session
app.use(
  cookieSession({
    name: 'session',
    keys: ['panigo'],
  }),
)

// Passport Middlewares
app.use(passport.initialize())
app.use(passport.session())

// Set global vars
// app.use((req, res , next) => {
//   res.locals.user = req.user || null
//   next()
// })

// Production Configuration
if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  
  // Express serves production assets (main.js or main.css)
  app.use(express.static(path.join(__dirname, 'client/build')))

  // Use Routes
  app.use('/auth', auth)
  app.use('/api/users', users)

  // Express serve index.html if no routes recognized

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
} else {
  // Development Routes
  app.use('/auth', auth)
  app.use('/api/users', users)
  app.use('/api/stories', stories)
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
