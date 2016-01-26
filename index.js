exports.router = require('./routes')
exports.upload = require('./lib/stream-uploads').upload
exports.uploadHandler = require('./middleware').uploadHandler
