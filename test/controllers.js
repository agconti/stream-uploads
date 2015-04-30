var fs = require('fs')
  , request = require('supertest')
  , express = require('express')
  , chai = require('chai')
  , should = chai.should()
  , uploadRouter = require('../routes')
  , things = chai.use(require('chai-things'))
  , cat = fs.readFileSync(__dirname + '/fixtures/cat.jpg')
  , dog = fs.readFileSync(__dirname + '/fixtures/dog.jpg')
  , app


describe('POST /upload', function(){
  beforeEach(function(done){
    app = express()
    app.use('/', uploadRouter)
    done()
  })
  it('a valid request should return the uploaded urls', function(done){
    request(app)
      .post('/upload')
      .attach('dog', dog)
      .attach('cat', cat)
      .expect(200, done)
  })
})