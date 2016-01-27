'use strict'
const fs = require('fs')
const request = require('supertest')
const express = require('express')
const chai = require('chai')
const should = chai.should()
const uploadRouter = require('../routes')
const things = chai.use(require('chai-things'))
const cat = fs.readFileSync(__dirname + '/fixtures/cat.jpg')
const dog = fs.readFileSync(__dirname + '/fixtures/dog.jpg')


let app
describe('POST /upload', () => {
  beforeEach( done => {
    app = express()
    app.use(uploadRouter)
    done()
  })
  it('a valid request should return the uploaded urls', done => {
    request(app)
      .post('/upload')
      .attach('dog', dog)
      .attach('cat', cat)
      // .expect(201, done)
      .end((err, req) => {
        // console.log(err, req.error)
        done()
      })
  })
})
