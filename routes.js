var uploadsRouter = require('express').Router()
  , upload = require('./controllers').upload
  , multer = require('multer')
  , multerConfig = {
      inMemory: true
    , putSingleFilesInArray: true
    }

    
uploadsRouter
    .use(multer(multerConfig))
    .post('/upload', upload)

module.exports = uploadsRouter