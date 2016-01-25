'use strict'

const AWS = require('./aws')
const s3 = new AWS.S3()
const uuid = require('node-uuid').v4
const debug = require('debug')('uploads:lib:stream-uploads')
const Bucket = process.env.S3_BUCKET_NAME || 'test-bucket-name'


/**
 * Allows uploading to s3 via a stream.
 * @param {object} file -- expects a req.files file from multer or busboy
 * @param {function} callback
 * @return {object} -- s3Stream with unique key name
 */
let upload = exports.uploadHandler = (file, callback) => {
	let Key = uuid()
	let Body = file.buffer
	debug(`Processing file: ${file.originalname}`)

  s3.upload({Bucket, Key, Body},(err, data) => {
		if (err) { callback(err) }

		callback(null, { url: data.location })
	})
}
