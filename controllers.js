const debug = require('debug')('uploads:controllers')
const async = require('async')
const uploadHandler = require('./lib/stream-uploads').uploadHandler


/**
 * An Express.js route handler that uploads multipart files to s3.
 * @param {object} req
 * @param {object} res
 */
exports.upload = (req, res) => {
  debug(`Files to be processed: ${req.files}`)

  async.map(req.files, uploadHandler, (err, urls) => {
    if (err) {
      debug(`Error processing files ${err}`)
      return res.status(400).send(err)
    }
    debug(`Uploaded urls: ${urls}`)
    return res.status(200).send(urls)
  })
}
