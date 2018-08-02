const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Load User Model
require('../models/User')
const User = mongoose.model('users')

module.exports = router