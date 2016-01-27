var AWS = require('aws-sdk')


// Mock aws for local testing
if (process.env.NODE_ENV === 'test'){
    AWS = require('../test/fixtures/awsMock')
}
// Credentials are automatically loaded from env variables if they exist by the
// aws-sdk so there is no additional configuration needed for production

module.exports = AWS
