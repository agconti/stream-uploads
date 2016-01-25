'use strict'

const debug = require('debug')('uploads:middleware')
const async = require('async')
const upload = require('./lib/stream-uploads').upload
const multer = require('multer')
const storage = multer.memoryStorage()


/**
 * An Express middleware tat allows uploading to s3 via a stream.
 * @param {object} reqs
 * @param {object} res
 * @return {function} next
 */
let uploadMiddleware = (req, res, next) => {
	debug(`Files to be processed: ${req.files}`)

	async.map(req.files, upload, (err, urls) => {
    if (err) {
      debug(`Error processing files ${err}`)
      return next(err)
    }
    debug(`Uploaded urls: ${urls}`)

		req.uploadedUrls = urls
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
let uploadErrorHandler = (err, req, res, next) => {
	if (err) {
		debug(`Sending error processing files to client ${err}`)
		return res.status(400).send(err)
	}

	next()
}

exports.uploadHandler = [ multer({storage}).array()
												, uploadMiddleware
												, uploadErrorHandler
												]
