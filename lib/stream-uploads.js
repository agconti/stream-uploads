'use strict'

const AWS = require('./aws')
const uuid = require('node-uuid').v4
const s3Stream = require('s3-upload-stream')(new AWS.S3())
const streamifier = require('streamifier')
const debug = require('debug')('uploads:lib:stream-uploads')


/**
 * Allows uploading to s3 via a stream.
 * @return {object} -- s3Stream with unique key name
 */
let upload = exports.upload = () => {
  return s3Stream.upload({
    Bucket: process.env.S3_BUCKET_NAME || 'test-bucket-name'
  , Key:  uuid()
  })
  .on('uploaded', data => debug('Finished uploading file %j', data))
  .on('error', error => debug('Error when uploading file %j', error))
}


/**
 * Handles streamed uploads to s3.
 * @param {object} file -- expects a req.files file from multer or busboy
 * @param {function} callback
 * @return {array} -- an array of objects of successful or erred files
 */
exports.uploadHandler = (file, callback) => {
	let uploadingFile = upload()
  debug('Processing file: ', file)

  uploadingFile
    .on('uploaded', data => callback(null, { url: data.location }))
    .on('error',  err => callback(err))

  // stream file to s3
  streamifier.createReadStream(file.buffer).pipe(uploadingFile)
}
