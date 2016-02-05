'use strict'

const uploadsRouter = require('express').Router()
const upload = require('./controllers').upload
const uploadHandler = require('./middleware').uploadHandler


uploadsRouter
  .use(uploadHandler)
  .post('/upload', upload)

module.exports = uploadsRouter
