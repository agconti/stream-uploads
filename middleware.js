'use strict'

const debug = require('debug')('uploads:middleware')
const async = require('async')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = require('./lib/stream-uploads').upload
const setUploadedUrls = require('./lib/setUploadedUrls')


/**
 * An Express middleware tat allows uploading to s3 via a stream.
 * @param {object} reqs
 * @param {object} res
 * @return {function} next
 */
exports.uploadMiddleware = (req, res, next) => {
	debug(`Files to be processed: ${req.files}`)

	async.map(req.files, upload, (err, urls) => {
    if (err) {
      debug(`Error processing files ${err}`)
      return next(err)
    }
    debug(`Uploaded urls: ${urls}`)

		req.body = setUploadedUrls(req.body, urls)
		next()
  })
}


/**
 * An Express.js route middleware that reports errors of attempted uploads to s3
 * to the client.
 * @param {object} err -- uploading file error
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
exports.uploadErrorHandler = (err, req, res, next) => {
	if (err) {
		debug(`Sending error processing files to client ${err}`)
		return res.status(400).send(err)
	}

	next()
}


exports.multiPartFormDataParser = multer({storage}).array()

/**
 * The grouped middleware nessesary to upload files
 */
exports.uploadHandler = [ exports.multiPartFormDataParser
												, exports.uploadMiddleware
												, exports.uploadErrorHandler
												]