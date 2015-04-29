var fs = require('fs')
  , httpMocks = require('node-mocks-http')
  , should = require('chai').should()
  , upload = require('../controllers').upload
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
    var data = res._getData()
    console.log('Data', data)
    should.exist(data.urls)
    done()
  })
})