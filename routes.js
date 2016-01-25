'use strict'

const uploadsRouter = require('express').Router()
const upload = require('./controllers').upload
const multer = require('multer')
const storage = multer.memoryStorage()
const uploadMiddleware = multer({storage})


uploadsRouter
    .use(multer({storage}).array())
    .post('/upload', upload)

module.exports = uploadsRouter
