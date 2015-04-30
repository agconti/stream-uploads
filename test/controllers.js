var fs = require('fs')
  , httpMocks = require('node-mocks-http')
  , chai = require('chai')
  , should = chai.should()
  , upload = require('../controllers').upload
  , things = chai.use(require('chai-things'))
  , req
  , res

describe('POST /upload', function(){
  beforeEach(function(done){
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()

    req.files = [ { buffer: fs.readFileSync(__dirname + '/fixtures/cat.jpg') } 
                , { buffer: fs.readFileSync(__dirname + '/fixtures/dog.jpg') }
                ]
    done()
  })
  it('an unauthorized request should fail with a 403', function(done){
    upload(req, res)
    setTimeout(function(){
      var data = res._getData()
      console.log('Data', data)
      data.should.be.instanceof(Array)
      data.should.all.have.property('url', 'agconti.com')
      done()
    }, 100)
  })
})