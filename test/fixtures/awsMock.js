'use strict'
const chai = require('chai')
const should = chai.should()
const debug = require('debug')('stream-uploads:test:aws-mock')


class S3 {
  upload(config, callback) {
    debug('Using mocked S3 client')

    config.should.have.property('Bucket')
    config.Bucket.should.be.a('string')

    config.should.have.property('Key')
    config.Key.should.be.a('string')

    config.should.have.property('Body')
    config.Body.should.be.a('buffer')

    if (config.Key == 'create-fail') {
      // Trigger a simulated error when a magic file name is used.
      return callback(new Error('Simulated failure from mocked API'))
    }

    callback(null, { Location: `http://example.com/${config.Key}` })
  }
}


module.exports = { S3 }
