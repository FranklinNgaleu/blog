const express = require('express')
const router = express.Router()
const checkTagExist = require('../middlewares/checkTagExist')
const Tags = require('../models/Tags')

module.exports = router