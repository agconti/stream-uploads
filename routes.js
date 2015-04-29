var uploadsRouter = require('express').Router()
  , upload = require('./controllers').upload
  , multer = require('multer')

uploadsRouter
    .use(multer({
      inMemory: true
    , putSingleFilesInArray: true
    })
    .post('/upload', upload)

module.exports = uploadsRouter