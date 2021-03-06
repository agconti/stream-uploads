'use strict'

const AWS = require('./aws')
const s3 = new AWS.S3()
const uuid = require('uuid').v4
const debug = require('debug')('uploads:lib:stream-uploads')
const Bucket = process.env.S3_BUCKET_NAME || 'test-bucket-name'


/**
 * Allows uploading to s3 via a stream.
 * @param {object} file -- expects a req.files file from multer or busboy
 * @param {function} callback
 * @return {object} -- s3Stream with unique key name
 */
exports.upload = (file, callback) => {
  let ext = file.originalname.split('.').pop()
  let Key = `${uuid()}.${ext}`
  let Body = file.buffer
  let name = file.fieldname
  debug(`Processing file: ${name}`)

  s3.upload({Bucket, Key, Body}, (err, data) => {
    if (err) {
      return callback(err)
    }

    let returnedData = {}
    returnedData[name] = data.Location
    callback(null, returnedData)
  })
}
