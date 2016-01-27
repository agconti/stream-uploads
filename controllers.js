'use strict'
const debug = require('debug')('stream-uploads:controllers')


/**
 * An Express.js route handler that reports the urls of files uploaded to s3.
 * @param {object} req
 * @param {object} res
 */
exports.upload = (req, res) => {
	let urls = req.body
	debug(`Sending back file urls`)

  return res.status(201).send(urls)
}
