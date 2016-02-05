'use strict'

const debug = require('debug')('uploads:controllers')


/**
 * An Express.js route handler that reports the urls of files uploaded to s3.
 * @param {object} req
 * @param {object} res
 */
exports.upload = (req, res) => {
  let urls = req.uploadedUrls
  debug(`Sending back file urls ${urls}`)

  return res.status(200).send(urls)
}
