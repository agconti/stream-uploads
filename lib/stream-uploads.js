var AWS = require('./aws')
  , uuid = require('node-uuid').v4
  , s3Stream = require('s3-upload-stream')(new AWS.S3())
  , streamifier = require('streamifier')
  , debug = require('debug')('uploads:lib:stream-uploads')


/**
 * Allows uploading to s3 via a stream. 
 * @return {object} -- s3Stream with unique key name
 */
var upload = exports.upload = function(){
  return s3Stream.upload({
    Bucket: process.env.S3_BUCKET_NAME || 'test-bucket-name'
  , Key:  uuid() 
  })
  .on('uploaded', function(data){
    debug('Finished uploading file %j', data)
  })
  .on('error', function (error) {
    debug('Error when uploading file %j', error)
  })
}


/**
 * Handles streamed uploads to s3. 
 * @param {object} file -- expects a req.files file from multer or busboy 
 * @param {function} callback
 * @return {array} -- an array of objects of sucessful or errored files
 */
exports.uploadHandler = function(file, callback){
  debug('Processing file: ', file)
  var uploadingFile = upload()
  uploadingFile
    .on('uploaded', function(data){
      callback(null, { url: data.location })
    })
    .on('error', function (err) {
      callback(err)
    })

  // stream file to s3  
  streamifier.createReadStream(file.buffer).pipe(uploadingFile)
}
